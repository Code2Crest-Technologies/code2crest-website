# Project Structure

This project is one Next.js App Router platform. Routes stay in `app/`, while reusable UI, feature logic, shared helpers, Prisma files, and documentation are organized into focused folders.

## Core Folders

- `app/` - Next.js App Router pages, layouts, route groups, API route handlers, and global CSS.
- `modules/` - Feature and product modules grouped by domain.
- `lib/` - Shared platform utilities used across routes and modules.
- `prisma/` - Prisma schema and seed script.
- `docs/` - Deployment, changelog, and structure documentation.
- `public/` - Static assets, fonts, icons, and images.

## App Routes

- `app/(public)/` - Public marketing website routes.
- `app/(auth)/` - Portal login and registration routes.
- `app/(portal)/` - Protected unified portal routes.
- `app/api/` - API route handlers.
- `app/connect/` - Public connect page route.
- `app/globals.css` - Tailwind entrypoint and global styles.

## Modules

- `modules/website/components/` - Public marketing website UI components.
- `modules/website/data/` - Public website data, when needed.
- `modules/portal/components/` - Portal UI such as shell, forms, product grid, team manager, and subscription panel.
- `modules/portal/data/` - Portal navigation, product, and account data.
- `modules/portal/hooks/` - Portal-facing React hooks.
- `modules/leadflow/` - LeadFlow permission map and guarded API helper functions.
- `modules/products/` - Product catalog and company product access helpers.
- `modules/subscription/` - Plan limits, subscription lookup, active subscription checks, and usage helpers.
- `modules/team/` - Membership, invite, role update, and member removal logic.
- `modules/auth/` and `modules/company/` - Reserved for future domain expansion.

## Shared Lib

- `lib/auth/` - Session, password hashing, and auth/company context helpers.
- `lib/db/prisma.ts` - Prisma Client singleton.
- `lib/config/env.ts` - Production environment validation.
- `lib/http/api.ts` - API error response helpers.
- `lib/company/slug.ts` - Company slug generation.
- `lib/security/` and `lib/utils/` - Reserved shared utility locations.

## Route Handler Rule

API routes in `app/api/**` should stay thin:

1. Parse request input.
2. Call a `lib/` or `modules/` helper.
3. Return a response.

Business logic should live in `modules/` or `lib/`, not inside route handlers.
