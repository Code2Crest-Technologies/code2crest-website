# Code2Crest Technologies Website

Official Code2Crest Technologies website and unified SaaS portal, built with Next.js, React, TypeScript, and Tailwind CSS.

## Overview

Code2Crest Technologies helps startups and businesses build:

- Modern websites
- Web applications
- E-commerce platforms
- Custom software solutions
- Mobile applications

The project currently runs as one Next.js App Router application containing the public marketing website, auth pages, unified portal, and API routes.

## Technology Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma
- PostgreSQL
- React Icons

## Features

- Public marketing website
- Unified portal dashboard
- Authentication-ready login and registration
- Company/workspace architecture
- Product access system
- Team invite foundation
- Subscription foundation
- Razorpay-ready billing foundation with beta-safe disabled checkout
- Editable company profile and account profile settings
- LeadFlow permission layer
- SEO metadata, sitemap, robots, Open Graph, and web manifest

## Project Structure

```text
app/
+- (public)/       # Public marketing routes
+- (auth)/         # Login and registration routes
+- (portal)/       # Protected unified portal routes
+- api/            # API route handlers
+- connect/
+- layout.tsx
+- globals.css

modules/
+- website/        # Marketing website UI and data
+- portal/         # Portal UI, data, and hooks
+- leadflow/       # LeadFlow API helpers and permissions
+- products/
+- subscription/
+- team/
+- auth/
+- company/

lib/
+- auth/
+- db/
+- company/
+- config/
+- http/
+- security/
+- utils/

prisma/
docs/
public/
```

## Installation

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Generate Prisma client:

```bash
npx prisma generate
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Documentation

- Deployment: `docs/DEPLOYMENT.md`
- Project structure: `docs/PROJECT_STRUCTURE.md`
- Changelog: `docs/CHANGELOG.md`

## Contact

Code2Crest Technologies

Email: [hello@code2crest.com](mailto:hello@code2crest.com)

Website: https://www.code2crest.com

Location: Erode, Tamil Nadu, India

Founder: Barath Rahav

## License

Copyright (c) Code2Crest Technologies. All rights reserved.
