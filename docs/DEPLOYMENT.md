# Code2Crest Platform Deployment

This project contains the public Code2Crest website, the unified portal, and the shared SaaS foundation for LeadFlow-ready product access.

## Required Environment Variables

Create production environment variables in the hosting provider:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/code2crest?schema=public"
SHADOW_DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/code2crest_shadow?schema=public"
AUTH_SECRET="use-a-random-32-plus-character-secret"
SSO_SECRET="use-a-random-32-plus-character-sso-secret"
NEXT_PUBLIC_APP_URL="https://app.code2crest.com"
NEXT_PUBLIC_MARKETING_URL="https://www.code2crest.com"
NEXT_PUBLIC_LEADFLOW_URL="https://leadflow.code2crest.com"
APP_URL="https://app.code2crest.com"
EMAIL_FROM="Code2Crest Hub <hello@code2crest.com>"
RESEND_API_KEY="re_..."
PLATFORM_ADMIN_EMAILS="founder@code2crest.com,admin@code2crest.com"
LEADFLOW_INTERNAL_API_URL="https://leadflow-backend.example.com"
CODE2CREST_LEADFLOW_INTEGRATION_SECRET="use-the-shared-server-only-secret"
```

`AUTH_SECRET` signs the httpOnly portal session cookie. Use a strong random value and rotate carefully.
`SSO_SECRET` signs short-lived LeadFlow launch tokens and must match the verifier configured in LeadFlow.
`SHADOW_DATABASE_URL` must point to a separate disposable database used only for Prisma migration verification. Do not point it at production data.
`LEADFLOW_INTERNAL_API_URL` should point to the LeadFlow backend origin. The server-only website client appends `/api/internal/leads/intake`. A full intake URL is accepted for compatibility, but avoid `/api` suffixes that would produce `/api/api/internal/leads/intake`.
`CODE2CREST_LEADFLOW_INTEGRATION_SECRET` is a server-only shared secret used by the website to forward validated Get Quote leads to LeadFlow.

## Razorpay Billing Foundation

Online checkout is intentionally disabled for beta unless all Razorpay keys and server-side plan IDs are configured:

```bash
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
RAZORPAY_WEBHOOK_SECRET=""
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
RAZORPAY_PLAN_STARTER=""
RAZORPAY_PLAN_GROWTH=""
RAZORPAY_PLAN_BUSINESS=""
```

Billing routes exist under:

- `POST /api/billing/checkout`
- `POST /api/billing/verify`
- `POST /api/billing/webhook`
- `GET /api/billing/history`
- `POST /api/billing/cancel`

Keep Razorpay secrets server-side only. Webhooks verify the raw request body with `RAZORPAY_WEBHOOK_SECRET`; subscription state must not be activated from browser callback data alone.

## Vercel Frontend Deployment

1. Connect the Git repository to Vercel.
2. Set the production domain for the public site, for example `www.code2crest.com`.
3. Add the required environment variables in Vercel Project Settings.
4. Use the default build command:

```bash
npm run build
```

5. Use the default output handled by Next.js.

The app routes are built as a Next.js App Router application. Portal routes such as `/dashboard`, `/team`, and `/subscription` are protected by middleware.

## Backend Deployment

The API is implemented with Next.js route handlers under `app/api`.

Production hardening included:

- Secure httpOnly cookies
- Signed session token
- CORS whitelist for:
  - `https://www.code2crest.com`
  - `https://app.code2crest.com`
  - `https://leadflow.code2crest.com`
  - localhost development URLs
- Helmet-style security headers via middleware
- Auth route and general API rate limiting
- Safe production error page and API error helper
- Request logging in middleware
- Health check at `GET /api/health`

## PostgreSQL Production Setup

Provision a managed PostgreSQL database from Vercel Postgres, Neon, Supabase, Railway, Render, or another production provider.

Recommended basics:

- Use SSL when required by the provider.
- Keep database credentials out of source control.
- Use one database per environment.
- Back up production data before migrations.
- Run migrations from a trusted CI/CD step or admin machine.

## Prisma Commands

Generate Prisma Client:

```bash
npx prisma generate
```

Apply production migrations:

```bash
npx prisma migrate deploy
```

Do not use `npx prisma db push` for production. The production database should be changed only through reviewed Prisma migrations.

Verify the committed migration chain in CI or a staging environment before production:

```bash
npx prisma migrate diff --from-empty --to-migrations prisma/migrations --script
```

This verification requires `SHADOW_DATABASE_URL` so Prisma can replay migrations safely without touching production data.

## Deployment Verification

After deployment:

1. Run `npx prisma migrate deploy` in the deployment environment.
2. Run `npx prisma generate` during build/install.
3. Open `GET /api/health` and confirm environment validation is healthy.
4. Confirm `https://app.code2crest.com/login` loads.
5. Confirm forgot password sends a safe generic response.
6. Confirm `PLATFORM_ADMIN_EMAILS` users can access `/admin`.
7. Confirm non-platform-admin users are redirected away from `/admin`.
8. Confirm `https://www.code2crest.com/products` remains public.
9. Confirm `https://app.code2crest.com/products` requires auth and then renders Hub products.
10. Confirm LeadFlow launch still redirects through `/api/products/leadflow/launch`.
11. Submit a public Get Quote enquiry and confirm it is delivered by email and, when LeadFlow env vars are configured, appears in the Code2Crest LeadFlow tenant as a PROSPECT deal.

Seed default product catalog:

```bash
npm run seed
```

## Health Check

Use:

```bash
GET /api/health
```

The health route reports environment validation status and returns `500` when required production variables are missing or weak.

## Security Notes

- Do not use the development fallback `AUTH_SECRET` in production.
- Do not use the development fallback `SSO_SECRET` in production.
- Do not expose `DATABASE_URL` to the browser.
- Keep `NODE_ENV=production` in production.
- Cookies are marked `secure` in production route handlers.
- CORS allows only Code2Crest production domains and localhost development origins.
- Rate limits are in-memory and suitable as a baseline; use an external store such as Redis for multi-region or high-scale deployments.
