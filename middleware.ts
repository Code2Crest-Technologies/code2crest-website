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

const protectedPortalRoutes = [
  "/dashboard",
  "/company",
  "/team",
  "/subscription",
  "/settings",
  "/admin",
];

const portalVisibleRoutes = [
  ...protectedPortalRoutes,
  "/products",
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

function isMarketingHostname(hostname: string) {
  return hostname === "www.code2crest.com" || hostname === "code2crest.com";
}

function isPortalHostname(hostname: string) {
  return hostname === "app.code2crest.com";
}

function getPortalBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "https://app.code2crest.com";
}

function getSafeNextPath(request: NextRequest) {
  return `${request.nextUrl.pathname}${request.nextUrl.search}`;
}

function getPortalUrl(request: NextRequest, pathname: string, search = "") {
  const url = isLocalHostname(getHostname(request))
    ? new URL(pathname, request.url)
    : new URL(pathname, getPortalBaseUrl());
  url.search = search;

  return url;
}

function getPortalLoginUrl(request: NextRequest, nextPath: string) {
  const loginUrl = getPortalUrl(request, "/login");
  loginUrl.searchParams.set("next", nextPath);
  return loginUrl;
}

function isPortalAuthRoute(pathname: string) {
  return pathname === "/login" || pathname === "/register";
}

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isInternalPortalRoute(pathname: string) {
  return pathname === "/hub" || pathname.startsWith("/hub/");
}

function isPortalProductsRoute(pathname: string) {
  return pathname === "/products" || pathname.startsWith("/products/");
}

function getInternalPortalPath(pathname: string) {
  if (!isPortalProductsRoute(pathname)) {
    return pathname;
  }

  return pathname.replace(/^\/products/, "/hub/products");
}

function isProtectedRoute(pathname: string, hostname: string) {
  if (isInternalPortalRoute(pathname)) {
    return true;
  }

  if (isPortalHostname(hostname) || hostname === "leadflow.code2crest.com") {
    return matchesRoute(pathname, portalVisibleRoutes);
  }

  return matchesRoute(pathname, protectedPortalRoutes);
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

  const isAppHost = isPortalHostname(hostname);
  const isLeadFlowHost = hostname === "leadflow.code2crest.com";
  const isMarketingHost = isMarketingHostname(hostname);

  if ((isAppHost || isLeadFlowHost) && pathname === "/") {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    dashboardUrl.search = "";
    return finalize(request, NextResponse.redirect(dashboardUrl));
  }

  if (isMarketingHost && isPortalAuthRoute(pathname)) {
    return finalize(
      request,
      NextResponse.redirect(getPortalUrl(request, pathname, request.nextUrl.search)),
    );
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

  if (!isProtectedRoute(pathname, hostname)) {
    const response = finalize(request, NextResponse.next());
    response.headers.set("Server-Timing", `app;dur=${Date.now() - startedAt}`);
    return response;
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (session) {
    if (isMarketingHost) {
      return finalize(
        request,
        NextResponse.redirect(getPortalUrl(request, pathname, request.nextUrl.search)),
      );
    }

    // On the Hub domain, keep /products visible in the browser but render the
    // internal protected Hub products route. Public hosts and localhost keep the
    // real marketing /products page.
    if (isAppHost && isPortalProductsRoute(pathname)) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = getInternalPortalPath(pathname);
      return finalize(request, NextResponse.rewrite(rewriteUrl));
    }

    const response = finalize(request, NextResponse.next());
    response.headers.set("Server-Timing", `app;dur=${Date.now() - startedAt}`);
    return response;
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", getSafeNextPath(request));

  return finalize(
    request,
    NextResponse.redirect(
      isLeadFlowHost || isMarketingHost
        ? getPortalLoginUrl(request, getSafeNextPath(request))
        : loginUrl,
    ),
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
