import { createHash, randomBytes } from "crypto";

export function createSecureToken() {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export const PASSWORD_RESET_TOKEN_TTL_MS = 30 * 60 * 1000;
export const EMAIL_VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

