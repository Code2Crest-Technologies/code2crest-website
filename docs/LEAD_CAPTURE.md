# Code2Crest Lead Capture

This document describes the Phase 3 public website lead capture foundation and secure server-to-server LeadFlow CRM integration.

## Current Behavior

The primary Get Quote form posts to:

```txt
POST /api/public/leads
```

Server flow:

```txt
www.code2crest.com
-> POST /api/public/leads
-> LeadFlow internal intake
-> Code2Crest tenant
-> Contact upsert
-> Deal
-> PROSPECT
```

The Contact section remains a short general enquiry path using email and WhatsApp CTAs. It is intentionally separate from the qualified Get Quote form and is not integrated in Phase 3.

## Lead Sources

```txt
CODE2CREST_GET_QUOTE
CODE2CREST_CONTACT
WHATSAPP
LINKEDIN
GOOGLE_BUSINESS
REFERRAL
META_ADS
MANUAL
```

The public Get Quote form uses `CODE2CREST_GET_QUOTE`. `CODE2CREST_CONTACT` is reserved for a future short contact form or contact CTA tracking.

## Get Quote Contract

```ts
{
  source: "CODE2CREST_GET_QUOTE";
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  service:
    | "WEBSITE_DEVELOPMENT"
    | "WEB_APPLICATION_DEVELOPMENT"
    | "ECOMMERCE"
    | "MOBILE_APP_DEVELOPMENT"
    | "CUSTOM_SOFTWARE"
    | "MAINTENANCE_SUPPORT"
    | "SAAS_PRODUCT_DEVELOPMENT"
    | "OTHER";
  budget?:
    | "UNDER_25000"
    | "25000_50000"
    | "50000_100000"
    | "100000_300000"
    | "300000_PLUS"
    | "NOT_SURE";
  timeline?:
    | "URGENT_ASAP"
    | "WITHIN_1_MONTH"
    | "ONE_TO_THREE_MONTHS"
    | "THREE_TO_SIX_MONTHS"
    | "SIX_PLUS_MONTHS"
    | "FLEXIBLE_NOT_SURE";
  projectDescription: string;
  heardAboutUs?:
    | "GOOGLE_SEARCH"
    | "GOOGLE_BUSINESS_PROFILE"
    | "LINKEDIN"
    | "INSTAGRAM"
    | "FACEBOOK"
    | "WHATSAPP"
    | "REFERRAL"
    | "EXISTING_CLIENT"
    | "EVENT_NETWORKING"
    | "OTHER";
  attribution?: LeadAttribution;
  website?: string;
}
```

## Contact Contract

The future short Contact form should use:

```ts
{
  source: "CODE2CREST_CONTACT";
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  attribution?: LeadAttribution;
  website?: string;
}
```

Do not force general contact users through the full Get Quote flow.

## Attribution Fields

The public form captures these non-visible fields where available:

```ts
{
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPage?: string;
  currentPage?: string;
}
```

Attribution fields are never used for authorization or security decisions.

## Spam Protection

The public endpoint uses:

- IP-based rate limiting through the shared rate-limit utility.
- Server-side field validation and length limits.
- A hidden honeypot field named `website`.
- Safe generic responses for honeypot submissions.

Cloudflare Turnstile can be added later without changing the lead service boundary.

## LeadFlow Integration

The website uses a server-only integration client:

```txt
lib/leads/leadflow-client.ts
```

Website/Vercel environment variables:

```txt
LEADFLOW_INTERNAL_API_URL=https://<leadflow-backend>
CODE2CREST_LEADFLOW_INTEGRATION_SECRET=<shared-server-secret>
```

LeadFlow/Railway environment variables:

```txt
CODE2CREST_LEADFLOW_INTEGRATION_SECRET=<same-shared-server-secret>
CODE2CREST_LEADFLOW_COMPANY_ID=<code2crest-company-id-inside-leadflow>
```

`LEADFLOW_INTERNAL_API_URL` should point to the LeadFlow backend origin. The server-only website client appends `/api/internal/leads/intake`. A full intake URL is accepted for compatibility, but do not configure `/api` suffixes that produce `/api/api/internal/leads/intake`.

## Tenant Isolation

The browser never sends a company ID or tenant ID.

LeadFlow resolves the Code2Crest tenant server-side:

```txt
Authorization: Bearer <secret>
-> validate secret
-> read CODE2CREST_LEADFLOW_COMPANY_ID
-> verify company exists
-> process lead only inside that company
```

Contact lookup and deal creation are scoped to this configured company only.

## Duplicate Suppression

LeadFlow reuses a recent open deal when the same contact submits the same service within 30 minutes.

Matching rule:

- Same Code2Crest LeadFlow company.
- Contact matched by normalized email or phone.
- Deal source is `CODE2CREST_GET_QUOTE`.
- Deal stage is not `WON` or `LOST`.
- Deal was created within the previous 30 minutes.
- Deal description contains the same stable service value.

The intake response includes:

```ts
{
  success: true;
  data: {
    contactId: string;
    dealId: string;
    duplicateReused: boolean;
  };
}
```

These IDs are used for server logs only and are not exposed to the public browser response.

## Activity Event

LeadFlow creates an activity log:

```txt
WEBSITE_LEAD_CAPTURED
```

Safe metadata:

- source
- service
- budget
- timeline
- utmSource
- utmCampaign
- duplicateReused

The full project description is stored on the deal description, not duplicated in activity metadata.

## Fallback Delivery

Validated Get Quote submissions also send a server-side email notification through the existing Resend email client.

Recipient:

```txt
hello@code2crest.com
```

If `RESEND_API_KEY` is not configured, the existing email client logs safe preview information in development. It does not expose raw tokens or secrets.

Reliability behavior:

- LeadFlow success + email success -> success.
- LeadFlow success + email failure -> success and log email failure.
- LeadFlow failure + email success -> success and log CRM failure.
- LeadFlow failure + email failure -> safe public failure response.

The customer never sees internal failure details such as LeadFlow errors.

## Analytics

The form sends only non-sensitive Google Analytics events if `window.gtag` exists:

```txt
get_quote_started
get_quote_submitted
get_quote_success
get_quote_error
```

Only the selected service category may be included. Names, emails, phone numbers, company names, and project descriptions must not be sent to analytics.

## Future Contact Flow

Contact CTA/form integration is reserved for a later phase:

```txt
CODE2CREST_CONTACT
-> Code2Crest LeadFlow tenant
-> Contact/lead handling based on future rules
```

## Manual Test Procedure

```txt
1. Submit Get Quote on www.code2crest.com.
2. Verify Resend email arrives at hello@code2crest.com.
3. Login to Code2Crest Hub.
4. Launch LeadFlow via SSO.
5. Open Contacts and confirm the contact exists.
6. Open Pipeline and confirm the deal exists.
7. Confirm stage = PROSPECT.
8. Confirm source = CODE2CREST_GET_QUOTE.
9. Confirm budget/timeline/project details are in the deal.
10. Submit the same lead again within 30 minutes.
11. Confirm duplicate handling reuses the recent open deal.
12. Confirm another LeadFlow company cannot see the contact/deal.
```

## Client Onboarding Separation

Get Quote remains a lightweight lead capture form.

Future client journey:

```txt
Visitor
-> Get Quote
-> LeadFlow Lead
-> Contact + Deal
-> Qualification
-> Quotation
-> Negotiation
-> WON
-> Client Onboarding Form
```
