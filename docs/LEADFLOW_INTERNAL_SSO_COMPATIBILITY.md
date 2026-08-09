# LeadFlow Internal SSO Compatibility

Code2Crest Hub now sends explicit internal admin claims when a trusted platform admin launches LeadFlow:

```json
{
  "platformRole": "PLATFORM_ADMIN",
  "internalAccess": true
}
```

For compatibility with the current LeadFlow callback, Hub sends effective active values for internal launches:

```json
{
  "subscriptionStatus": "ACTIVE",
  "productAccess": "ACTIVE"
}
```

Normal customer launches still use the real subscription and company product status and are blocked before SSO when access is expired, suspended, cancelled, unavailable, or outside the active period.

## Recommended LeadFlow-side hardening

LeadFlow should explicitly recognize `internalAccess === true` only when the JWT is valid, `iss` and `aud` are trusted, and `platformRole === "PLATFORM_ADMIN"`.

In `apps/backend/src/controllers/authController.ts`, update SSO validation so internal access bypasses subscription/product status rejection:

```ts
const isInternalAccess =
  payload.internalAccess === true &&
  payload.platformRole === "PLATFORM_ADMIN";

if (!isInternalAccess) {
  assertSsoAccess(payload);
}
```

Also extend the SSO payload schema to accept:

```ts
platformRole: z.string().optional(),
internalAccess: z.boolean().optional(),
```

Do not bypass JWT signature, issuer, audience, expiry, company resolution, or user provisioning checks.
