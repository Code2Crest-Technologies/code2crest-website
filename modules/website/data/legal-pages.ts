import {
  BRAND_NAME,
  COMPANY_NAME,
  HUB_URL,
  LEADFLOW_URL,
  LEGAL_CONTACT_EMAIL,
  LEGAL_LOCATION,
  WEBSITE_URL,
} from "@/lib/legal/constants";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type LegalPageContent = {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalPageContent = {
  title: "Privacy Policy",
  description:
    "How Code2Crest Technologies collects, uses, protects, and shares personal information across its website, Hub, and SaaS products.",
  intro:
    `${COMPANY_NAME} respects your privacy. This policy explains how we handle information collected through ${WEBSITE_URL}, ${HUB_URL}, ${LEADFLOW_URL}, website forms, email conversations, and Code2Crest product experiences.`,
  sections: [
    {
      id: "information-collected",
      title: "Information We Collect",
      items: [
        "Name, email address, phone number, WhatsApp number, and other contact details you provide.",
        "Company, business, billing, project, quotation, and service requirement information.",
        "Account information used for Code2Crest Hub and product access.",
        "Usage, analytics, browser, device, IP address, referral, and technical log data.",
        "Payment-related metadata if a payment provider such as Razorpay is enabled. We do not ask you to send full card or banking details through website forms.",
      ],
    },
    {
      id: "sources",
      title: "Sources of Information",
      items: [
        "Website contact and get quote forms.",
        "Code2Crest Hub registration, login, workspace, and team workflows.",
        "LeadFlow and other Code2Crest product interactions.",
        "Email, phone, WhatsApp, proposal, invoice, and support communication.",
        "Analytics and hosting logs from tools used to operate and secure the website.",
      ],
    },
    {
      id: "purposes",
      title: "How We Use Information",
      items: [
        "Respond to enquiries and prepare quotations or proposals.",
        "Provide website, web application, e-commerce, mobile app, custom software, and maintenance services.",
        "Operate Code2Crest Hub, LeadFlow, and future SaaS products.",
        "Manage accounts, company workspaces, team invitations, subscriptions, billing, and support.",
        "Protect accounts, prevent misuse, investigate security events, and comply with legal obligations.",
        "Understand website performance and improve our services using analytics.",
      ],
    },
    {
      id: "third-parties",
      title: "Third-Party Services",
      paragraphs: [
        "We may use trusted providers to host, deliver, secure, analyze, and support our services. Depending on the feature being used, these may include Vercel, Neon, Railway, Resend, Google Analytics, and Razorpay when payments are enabled.",
        "These providers process information only as needed to provide their services to us, subject to their own terms and privacy practices.",
      ],
    },
    {
      id: "retention",
      title: "Data Retention",
      paragraphs: [
        "We keep information only for as long as needed for the purpose it was collected, to provide services, maintain records, resolve disputes, secure the platform, or meet legal and accounting requirements.",
        "Retention periods may vary by record type, contract, invoice, product usage, support history, and applicable law.",
      ],
    },
    {
      id: "security",
      title: "Data Security",
      paragraphs: [
        "We use reasonable technical and organizational measures to protect information, including secure password hashing, session cookies, access controls, audit logs, and production environment safeguards. No internet service can guarantee absolute security.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Analytics",
      paragraphs: [
        "Our website and Hub may use cookies and similar technologies for essential functionality, authentication, session security, preferences, and analytics such as Google Analytics. See our Cookie Policy for more detail.",
      ],
    },
    {
      id: "rights",
      title: "Your Choices and Rights",
      paragraphs: [
        "You may contact us to request access, correction, deletion, or restriction of your personal information, subject to identity verification, contractual duties, technical limits, and applicable law.",
      ],
    },
    {
      id: "international-processing",
      title: "International Processing",
      paragraphs: [
        `Code2Crest is based in ${LEGAL_LOCATION}. Some service providers may process or store information in other regions depending on their infrastructure and service configuration.`,
      ],
    },
    {
      id: "children",
      title: "Children's Privacy",
      paragraphs: [
        "Our website, Hub, and SaaS products are intended for business use and are not directed to children. If you believe a child has provided personal information, contact us so we can review it.",
      ],
    },
    {
      id: "changes-contact",
      title: "Changes and Contact",
      paragraphs: [
        `We may update this Privacy Policy as our services, products, or legal requirements change. Contact us at ${LEGAL_CONTACT_EMAIL} for privacy questions or requests.`,
      ],
    },
  ],
};

export const termsAndConditions: LegalPageContent = {
  title: "Terms & Conditions",
  description:
    "General terms for using the Code2Crest Technologies website, services, Code2Crest Hub, and SaaS products.",
  intro:
    `These Terms & Conditions govern general use of ${COMPANY_NAME} websites, services, Code2Crest Hub, LeadFlow, and future ${BRAND_NAME} products. Specific quotations, proposals, service agreements, statements of work, NDAs, invoices, and product-specific terms may override these general terms where applicable.`,
  sections: [
    {
      id: "website-use",
      title: "Website Use",
      paragraphs: [
        "You may use the public website to learn about Code2Crest, request information, submit enquiries, and access public content. You must not misuse the website, attempt unauthorized access, scrape excessively, or interfere with security and availability.",
      ],
    },
    {
      id: "services-products",
      title: "Services and Product Access",
      items: [
        "We provide website development, web application development, e-commerce solutions, mobile app development, custom software development, and maintenance and support.",
        "Code2Crest Hub and SaaS products such as LeadFlow may require registration, authentication, company workspace access, subscriptions, or product-specific permissions.",
        "Access may be suspended or limited if there is misuse, non-payment, security risk, or violation of applicable terms.",
      ],
    },
    {
      id: "accounts",
      title: "Account Responsibilities",
      paragraphs: [
        "You are responsible for keeping login credentials secure, using accurate account and company information, managing team access carefully, and notifying us of suspected unauthorized use.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      paragraphs: [
        "You must not use Code2Crest services or products for illegal activity, abuse, spam, malware, unauthorized data access, infringement, harassment, or activity that harms our systems, customers, providers, or reputation.",
      ],
    },
    {
      id: "ip-client-content",
      title: "Intellectual Property and Client Content",
      paragraphs: [
        "Code2Crest retains ownership of its brand, website, product platforms, reusable tools, templates, code libraries, know-how, and pre-existing intellectual property. Client-provided content remains the client's responsibility.",
        "Project deliverable ownership, license terms, source-code handover, and third-party asset rights should be stated in the relevant quotation, proposal, invoice, or agreement.",
      ],
    },
    {
      id: "projects",
      title: "Quotations, Scope, and Timelines",
      paragraphs: [
        "Estimates, quotations, and timelines depend on the information available at the time they are prepared. Scope changes, delayed approvals, missing content, third-party delays, or new requirements may affect delivery dates and pricing.",
      ],
    },
    {
      id: "payments",
      title: "Payments and Taxes",
      paragraphs: [
        "Payment amounts, milestones, due dates, taxes, and late-payment consequences are defined in the applicable quotation, invoice, subscription plan, or agreement. Billing/payment integration is planned for SaaS products and may use Razorpay when enabled.",
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      paragraphs: [
        "Projects and products may rely on third-party hosting, databases, APIs, payment gateways, analytics, email, plugins, libraries, and marketplaces. Their availability, pricing, terms, and policies are outside our direct control.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      paragraphs: [
        "Where we receive non-public business or project information, we aim to handle it responsibly. Detailed confidentiality duties should be covered in a signed NDA, SOW, or service agreement when required.",
      ],
    },
    {
      id: "disclaimers-liability",
      title: "Disclaimers and Limitation of Liability",
      paragraphs: [
        "The public website is provided for general information. Services and SaaS products are provided subject to applicable agreements and availability. To the extent permitted by law, Code2Crest is not liable for indirect, incidental, special, consequential, or punitive damages.",
      ],
    },
    {
      id: "termination-law",
      title: "Termination, Governing Law, and Contact",
      paragraphs: [
        `We may suspend or terminate access for violation of these terms, security risk, or non-payment. These terms should be interpreted under applicable laws of India, with jurisdiction to be confirmed in the relevant contract or by legal counsel. Contact ${LEGAL_CONTACT_EMAIL} for questions.`,
      ],
    },
  ],
};

export const cookiePolicy: LegalPageContent = {
  title: "Cookie Policy",
  description:
    "How Code2Crest Technologies uses essential, authentication, analytics, preference, and third-party cookies.",
  intro:
    `This Cookie Policy explains how ${COMPANY_NAME} uses cookies and similar technologies on ${WEBSITE_URL}, Code2Crest Hub, LeadFlow, and related product experiences.`,
  sections: [
    {
      id: "what-cookies-are",
      title: "What Cookies Are",
      paragraphs: [
        "Cookies are small text files stored by your browser. Similar technologies may include local storage, pixels, tags, and device identifiers used to operate, secure, remember, and measure digital experiences.",
      ],
    },
    {
      id: "essential",
      title: "Essential Cookies",
      paragraphs: [
        "Essential cookies support core website and application functionality, including page delivery, security, abuse prevention, form handling, and service availability.",
      ],
    },
    {
      id: "auth-session",
      title: "Authentication and Session Cookies",
      paragraphs: [
        "Some cookies are required for Code2Crest Hub login and session functionality. Without these cookies, authenticated areas such as dashboards, company settings, team management, and product launch flows may not work.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      paragraphs: [
        "We use Google Analytics to understand website traffic, page performance, referrals, and engagement. Analytics information helps us improve the website and content.",
      ],
    },
    {
      id: "preferences-third-party",
      title: "Preference and Third-Party Cookies",
      paragraphs: [
        "We may use preference cookies if features require remembering choices. Third-party services such as hosting, analytics, email, or payment providers may set cookies or similar technologies according to their own policies.",
      ],
    },
    {
      id: "manage-cookies",
      title: "Managing Cookies",
      paragraphs: [
        "You can manage or block cookies through your browser settings. Blocking essential cookies may prevent parts of the website, Hub, or products from functioning correctly.",
      ],
    },
    {
      id: "consent-future",
      title: "Cookie Consent",
      paragraphs: [
        "A cookie consent banner is not currently enabled. The project includes a placeholder configuration for future cookie-consent integration if needed.",
      ],
    },
    {
      id: "changes-contact",
      title: "Changes and Contact",
      paragraphs: [
        `We may update this Cookie Policy as our website, Hub, products, or providers change. Contact ${LEGAL_CONTACT_EMAIL} with questions.`,
      ],
    },
  ],
};

export const refundCancellationPolicy: LegalPageContent = {
  title: "Refund & Cancellation Policy",
  description:
    "Refund and cancellation guidance for Code2Crest custom service projects and SaaS subscriptions.",
  intro:
    "This policy explains how Code2Crest reviews cancellations and refund requests for custom service projects and SaaS subscriptions. Final eligibility may depend on the applicable contract, quotation, invoice, usage, payment provider rules, and applicable law.",
  sections: [
    {
      id: "service-projects",
      title: "A. Custom Service Projects",
      items: [
        "Advance payments may be required to reserve time, start discovery, or begin project work.",
        "Amounts for work already completed, time spent, planning, design, development, meetings, support, and project management may be non-refundable.",
        "Third-party expenses such as domains, hosting, software licenses, plugins, stock assets, payment gateway fees, marketplace purchases, and contractor costs may be non-refundable.",
        "If scope is cancelled or reduced, refund eligibility is reviewed case by case against work completed, committed costs, and agreed milestones.",
        "Client delays, missing content, delayed approvals, or paused communication may affect timelines and may not automatically create refund eligibility.",
        "Cancellation requests should be sent in writing to Code2Crest with project, invoice, and reason details.",
      ],
    },
    {
      id: "saas-subscriptions",
      title: "B. SaaS Subscriptions",
      items: [
        "Trial periods may be offered for products such as LeadFlow or future Code2Crest products.",
        "Subscription cancellation stops future renewal or billing where supported, but access may continue through the paid period unless otherwise stated.",
        "Used subscription periods are generally non-refundable where legally permissible.",
        "Duplicate, incorrect, or accidental charges can be submitted for review with payment proof.",
        "Refund requests are reviewed case by case and may depend on usage, plan status, invoice terms, payment-provider rules, and applicable law.",
        "Razorpay or another payment provider may require additional processing time when payments are enabled.",
      ],
    },
    {
      id: "no-automatic-refunds",
      title: "No Automatic Refund Promise",
      paragraphs: [
        "Submitting a cancellation or refund request does not guarantee approval. Code2Crest will review the request in good faith and respond with the next steps.",
      ],
    },
    {
      id: "contact",
      title: "How to Request Review",
      paragraphs: [
        `Send refund or cancellation requests to ${LEGAL_CONTACT_EMAIL} with your name, company, project or product name, invoice or payment reference, and a short reason for the request.`,
      ],
    },
  ],
};
