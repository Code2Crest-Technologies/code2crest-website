import { createHmac } from "crypto";

const DEFAULT_DEV_SSO_SECRET = "code2crest-dev-sso-secret-change-in-production";

export type LeadFlowSsoPayload = {
  portalUserId: string;
  portalCompanyId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  productKey: "leadflow";
  subscriptionStatus: string;
  productAccess: string;
  companyName: string;
  companySlug: string;
  subscriptionPlan: string;
  iss: string;
  aud: string;
  jti: string;
  userId: string;
  companyId: string;
  product: "leadflow";
};

function getSsoSecret() {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.SSO_SECRET) {
      throw new Error("SSO_SECRET is required in production.");
    }

    if (process.env.SSO_SECRET.length < 32) {
      throw new Error("SSO_SECRET must be at least 32 characters in production.");
    }
  }

  return process.env.SSO_SECRET ?? DEFAULT_DEV_SSO_SECRET;
}

function toBase64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function createLeadFlowSsoToken(payload: LeadFlowSsoPayload) {
  const now = Math.floor(Date.now() / 1000);
  const header = toBase64Url(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    }),
  );
  const body = toBase64Url(
    JSON.stringify({
      ...payload,
      iat: now,
      exp: now + 2 * 60,
    }),
  );
  const unsignedToken = `${header}.${body}`;
  const signature = toBase64Url(
    createHmac("sha256", getSsoSecret()).update(unsignedToken).digest(),
  );

  return `${unsignedToken}.${signature}`;
}
