# Code2Crest Platform Deployment

This project contains the public Code2Crest website, the unified portal, and the shared SaaS foundation for LeadFlow-ready product access.

## Required Environment Variables

Create production environment variables in the hosting provider:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/code2crest?schema=public"
AUTH_SECRET="use-a-random-32-plus-character-secret"
SSO_SECRET="use-a-random-32-plus-character-sso-secret"
NEXT_PUBLIC_APP_URL="https://app.code2crest.com"
NEXT_PUBLIC_MARKETING_URL="https://www.code2crest.com"
NEXT_PUBLIC_LEADFLOW_URL="https://leadflow.code2crest.com"
```

`AUTH_SECRET` signs the httpOnly portal session cookie. Use a strong random value and rotate carefully.
`SSO_SECRET` signs short-lived LeadFlow launch tokens and must match the verifier configured in LeadFlow.

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

Push schema during early MVP environments:

```bash
npx prisma db push
```

For production migration workflows, prefer Prisma migrations:

```bash
npx prisma migrate deploy
```

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
