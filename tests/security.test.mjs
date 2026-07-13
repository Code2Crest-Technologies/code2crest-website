import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const schema = readFileSync("prisma/schema.prisma", "utf8");
const middleware = readFileSync("middleware.ts", "utf8");
const teamServer = readFileSync("modules/team/server.ts", "utf8");
const audit = readFileSync("lib/audit/log.ts", "utf8");

assert.match(schema, /model PasswordResetToken[\s\S]*tokenHash String\s+@unique/);
assert.match(schema, /expiresAt DateTime/);
assert.match(schema, /usedAt\s+DateTime\?/);
assert.match(schema, /model AuditLog/);
assert.match(schema, /enum PlatformRole[\s\S]*PLATFORM_ADMIN/);
assert.match(middleware, /"\/admin"/);
assert.match(middleware, /isInternalPortalRoute/);
assert.match(teamServer, /resendInvite/);
assert.match(teamServer, /token: createInviteToken\(\)/);
assert.match(audit, /createAuditLog/);

console.log("Security readiness static checks passed.");
