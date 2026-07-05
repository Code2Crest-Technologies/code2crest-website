import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

const allowedOrigins = new Set([
  "https://www.code2crest.com",
  "https://app.code2crest.com",
  "https://leadflow.code2crest.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5173",
]);

const protectedRoutes = [
  "/dashboard",
  "/products",
  "/company",
  "/team",
  "/subscription",
  "/settings",
];

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const authWindowMs = 60 * 1000;
const apiWindowMs = 60 * 1000;
const authLimit = 10;
const apiLimit = 120;

function getHostname(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host
  )
    .split(":")[0]
    .toLowerCase();
}

function isLocalHostname(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function getPortalLoginUrl(pathname: string) {
  const loginUrl = new URL("https://app.code2crest.com/login");
  loginUrl.searchParams.set("next", pathname);
  return loginUrl;
}

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://leadflow.code2crest.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
  }

  return response;
}

function applyCorsHeaders(request: NextRequest, response: NextResponse) {
  const origin = request.headers.get("origin");

  if (origin && allowedOrigins.has(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS",
    );
  }

  return response;
}

function isRateLimited(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/api/")) {
    return false;
  }

  const isAuthRoute = pathname.startsWith("/api/auth/");
  const limit = isAuthRoute ? authLimit : apiLimit;
  const windowMs = isAuthRoute ? authWindowMs : apiWindowMs;
  const key = `${isAuthRoute ? "auth" : "api"}:${getClientIp(request)}`;
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;

  return current.count > limit;
}

function finalize(request: NextRequest, response: NextResponse) {
  return applyCorsHeaders(request, applySecurityHeaders(response));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = getHostname(request);
  const startedAt = Date.now();

  console.log(
    `[request] ${request.method} ${pathname} ip=${getClientIp(request)}`,
  );

  if (!isLocalHostname(hostname) && hostname === "code2crest.com") {
    const redirectUrl = new URL(request.nextUrl.pathname, "https://www.code2crest.com");
    redirectUrl.search = request.nextUrl.search;
    return finalize(request, NextResponse.redirect(redirectUrl, 308));
  }

  const isAppHost = hostname === "app.code2crest.com";
  const isLeadFlowHost = hostname === "leadflow.code2crest.com";

  if ((isAppHost || isLeadFlowHost) && pathname === "/") {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    dashboardUrl.search = "";
    return finalize(request, NextResponse.redirect(dashboardUrl));
  }

  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");

    if (origin && !allowedOrigins.has(origin)) {
      return finalize(
        request,
        NextResponse.json({ message: "CORS origin is not allowed." }, { status: 403 }),
      );
    }

    if (request.method === "OPTIONS") {
      return finalize(request, new NextResponse(null, { status: 204 }));
    }

    if (isRateLimited(request)) {
      return finalize(
        request,
        NextResponse.json(
          { message: "Too many requests. Please try again shortly." },
          { status: 429 },
        ),
      );
    }
  }

  if (!isProtectedRoute(pathname)) {
    const response = finalize(request, NextResponse.next());
    response.headers.set("Server-Timing", `app;dur=${Date.now() - startedAt}`);
    return response;
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (session) {
    const response = finalize(request, NextResponse.next());
    response.headers.set("Server-Timing", `app;dur=${Date.now() - startedAt}`);
    return response;
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);

  return finalize(
    request,
    NextResponse.redirect(
      isLeadFlowHost ? getPortalLoginUrl(pathname) : loginUrl,
    ),
  );
}

export const config = {
  matcher: [
    "/",
    "/api/:path*",
    "/login",
    "/register",
    "/dashboard/:path*",
    "/products/:path*",
    "/company/:path*",
    "/team/:path*",
    "/subscription/:path*",
    "/settings/:path*",
  ],
};
