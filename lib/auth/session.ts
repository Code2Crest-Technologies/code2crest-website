export const SESSION_COOKIE_NAME = "c2c_portal_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthCompany = {
  id: string;
  name: string;
  slug: string;
  workspace: string;
  plan: string;
  members: number;
  status?: string;
  website?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  gstin?: string | null;
  timezone?: string | null;
  logoUrl?: string | null;
  createdAt?: string;
  owner?: {
    name: string;
    email: string;
  };
};

export type AuthSession = {
  userId: string;
  activeCompanyId: string;
  membershipRole: string;
  issuedAt: number;
  expiresAt: number;
};

const DEFAULT_DEV_SECRET = "code2crest-dev-auth-secret-change-in-production";

function getAuthSecret() {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.AUTH_SECRET) {
      throw new Error("AUTH_SECRET is required in production.");
    }

    if (process.env.AUTH_SECRET.length < 32) {
      throw new Error("AUTH_SECRET must be at least 32 characters in production.");
    }
  }

  return process.env.AUTH_SECRET ?? DEFAULT_DEV_SECRET;
}

function toBase64Url(value: string) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");

  return atob(padded);
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getAuthSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  const bytes = Array.from(new Uint8Array(signature));

  return toBase64Url(String.fromCharCode(...bytes));
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

export async function createSessionToken(session: AuthSession) {
  const payload = toBase64Url(JSON.stringify(session));
  const signature = await sign(payload);

  return `${payload}.${signature}`;
}

export async function verifySessionToken(token?: string): Promise<AuthSession | null> {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = await sign(payload);

  if (!constantTimeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(fromBase64Url(payload)) as AuthSession;

    if (!session.expiresAt || session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function buildPortalSession(input: {
  userId: string;
  activeCompanyId: string;
  membershipRole: string;
}) {
  const now = Date.now();

  return {
    userId: input.userId,
    activeCompanyId: input.activeCompanyId,
    membershipRole: input.membershipRole,
    issuedAt: now,
    expiresAt: now + SESSION_MAX_AGE_SECONDS * 1000,
  } satisfies AuthSession;
}
