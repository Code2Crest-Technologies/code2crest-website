import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("password reset tokens expire and used tokens are rejected by route logic", () => {
  const resetRoute = read("app/api/auth/reset-password/route.ts");
  const tokens = read("lib/auth/tokens.ts");

  assert.match(tokens, /PASSWORD_RESET_TOKEN_TTL_MS\s*=\s*30\s*\*\s*60\s*\*\s*1000/);
  assert.match(resetRoute, /resetToken\.usedAt/);
  assert.match(resetRoute, /resetToken\.expiresAt\s*<\s*new Date\(\)/);
  assert.match(resetRoute, /sessionVersion:\s*\{\s*increment:\s*1\s*\}/);
});

test("admin route protection requires platform admin role", () => {
  const adminPage = read("app/(portal)/admin/page.tsx");
  const adminAction = read("app/api/admin/companies/[companyId]/action/route.ts");
  const serverAuth = read("lib/auth/server.ts");

  assert.match(adminPage, /requirePlatformAdmin/);
  assert.match(adminAction, /platformRole\s*!==\s*"PLATFORM_ADMIN"/);
  assert.match(serverAuth, /context\.user\.platformRole\s*!==\s*"PLATFORM_ADMIN"/);
});

test("team invite resend invalidates the previous token by replacing it", () => {
  const teamServer = read("modules/team/server.ts");

  assert.match(teamServer, /export async function resendInvite/);
  assert.match(teamServer, /token:\s*createInviteToken\(\)/);
  assert.match(teamServer, /expiresAt:\s*new Date/);
});

test("audit log creation exists for required security events", () => {
  const sources = [
    "app/api/auth/login/route.ts",
    "app/api/auth/forgot-password/route.ts",
    "app/api/auth/reset-password/route.ts",
    "app/api/auth/change-password/route.ts",
    "app/api/company/route.ts",
    "app/api/team/invite/route.ts",
    "app/api/team/[membershipId]/role/route.ts",
    "app/api/team/[membershipId]/route.ts",
    "app/api/products/leadflow/launch/route.ts",
    "modules/admin/server.ts",
  ].map(read).join("\n");

  for (const action of [
    "LOGIN_SUCCESS",
    "LOGIN_FAILED",
    "PASSWORD_RESET_REQUESTED",
    "PASSWORD_CHANGED",
    "COMPANY_UPDATED",
    "MEMBER_INVITED",
    "MEMBER_ROLE_CHANGED",
    "MEMBER_REMOVED",
    "PRODUCT_LAUNCHED",
    "SUBSCRIPTION_CHANGED",
    "ADMIN_ACTION",
  ]) {
    assert.match(sources, new RegExp(action));
  }
});

test("LeadFlow launch uses browser redirects and explicit internal admin claims", () => {
  const launchRoute = read("app/api/products/leadflow/launch/route.ts");
  const sso = read("lib/auth/sso.ts");
  const productGrid = read("modules/portal/components/product-grid.tsx");
  const subscriptionPanel = read("modules/portal/components/subscription-panel.tsx");

  assert.match(launchRoute, /PlatformRole\.PLATFORM_ADMIN/);
  assert.match(launchRoute, /internalAccess:\s*isInternalPlatformAdmin/);
  assert.match(launchRoute, /platformRole:\s*isInternalPlatformAdmin/);
  assert.match(launchRoute, /leadflow_trial_expired/);
  assert.match(launchRoute, /subscription_suspended/);
  assert.match(launchRoute, /product_unavailable/);
  assert.match(launchRoute, /isBrowserRequest/);
  assert.match(sso, /internalAccess\?: boolean/);
  assert.match(sso, /platformRole\?: string/);
  assert.match(productGrid, /Internal Access/);
  assert.match(productGrid, /Trial Expired/);
  assert.match(subscriptionPanel, /Your LeadFlow trial has ended/);
});
