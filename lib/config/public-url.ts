const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function getPortalHref(path: string) {
  const normalizedPath = normalizePath(path);

  if (process.env.NODE_ENV !== "production" || !configuredAppUrl) {
    return normalizedPath;
  }

  return `${configuredAppUrl}${normalizedPath}`;
}
