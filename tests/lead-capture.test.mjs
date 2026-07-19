import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const validation = readFileSync("lib/leads/validation.ts", "utf8");
const route = readFileSync("app/api/public/leads/route.ts", "utf8");
const types = readFileSync("lib/leads/types.ts", "utf8");
const submit = readFileSync("lib/leads/submit-public-lead.ts", "utf8");
const client = readFileSync("lib/leads/leadflow-client.ts", "utf8");
const form = readFileSync("modules/website/components/get-quote.tsx", "utf8");

test("valid get quote submissions use stable enum values and centralized service", () => {
  assert.match(types, /WEBSITE_DEVELOPMENT/);
  assert.match(types, /SAAS_PRODUCT_DEVELOPMENT/);
  assert.match(route, /validatePublicLeadPayload/);
  assert.match(route, /submitPublicLead/);
  assert.match(form, /source: "CODE2CREST_GET_QUOTE"/);
});

test("required fields, invalid email, invalid service, and oversized descriptions are validated", () => {
  assert.match(validation, /Enter your full name/);
  assert.match(validation, /emailPattern\.test/);
  assert.match(validation, /validServices/);
  assert.match(validation, /rawProjectDescription\.length > 1600/);
  assert.match(validation, /Add at least 20 characters/);
});

test("honeypot and rate limiting are enforced by the public endpoint", () => {
  assert.match(route, /checkRateLimit/);
  assert.match(route, /limit: 5/);
  assert.match(validation, /isHoneypot: website\.length > 0/);
  assert.match(route, /honeypot blocked/);
});

test("attribution is normalized and forwarded through the server-only LeadFlow client", () => {
  assert.match(types, /utmSource/);
  assert.match(types, /landingPage/);
  assert.match(form, /collectAttribution/);
  assert.match(client, /LEADFLOW_INTERNAL_API_URL/);
  assert.match(client, /CODE2CREST_LEADFLOW_INTEGRATION_SECRET/);
  assert.match(client, /Authorization: `Bearer \$\{secret\}`/);
  assert.match(client, /\/api\/api\//);
});

test("lead reliability matrix succeeds when either LeadFlow or email delivery succeeds", () => {
  assert.match(submit, /forwardLeadToLeadFlow/);
  assert.match(submit, /sendEmail/);
  assert.match(submit, /LEADFLOW_INTAKE_SUCCESS/);
  assert.match(submit, /LEAD_NOTIFICATION_EMAIL_FAILED/);
  assert.match(submit, /ok: leadFlow\.ok \|\| notification\.ok/);
});
