export function getRequestMeta(request: Request) {
  return {
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null,
    userAgent: request.headers.get("user-agent"),
  };
}

export function getRequestOrigin(request: Request) {
  return process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
}

