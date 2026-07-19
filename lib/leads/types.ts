import { LEAD_SOURCES, type LeadSource } from "@/lib/leads/lead-sources";

export const leadSources = [LEAD_SOURCES.CODE2CREST_GET_QUOTE, LEAD_SOURCES.CODE2CREST_CONTACT] as const;

export type { LeadSource };

export const serviceOptions = [
  { value: "WEBSITE_DEVELOPMENT", label: "Website Development" },
  { value: "WEB_APPLICATION_DEVELOPMENT", label: "Web Application Development" },
  { value: "ECOMMERCE", label: "E-Commerce Solutions" },
  { value: "MOBILE_APP_DEVELOPMENT", label: "Mobile App Development" },
  { value: "CUSTOM_SOFTWARE", label: "Custom Software Development" },
  { value: "MAINTENANCE_SUPPORT", label: "Maintenance & Support" },
  { value: "SAAS_PRODUCT_DEVELOPMENT", label: "SaaS / Product Development" },
  { value: "OTHER", label: "Other" },
] as const;

export type LeadService = (typeof serviceOptions)[number]["value"];

export const budgetOptions = [
  { value: "UNDER_25000", label: "Under Rs.25,000" },
  { value: "25000_50000", label: "Rs.25,000 - Rs.50,000" },
  { value: "50000_100000", label: "Rs.50,000 - Rs.1,00,000" },
  { value: "100000_300000", label: "Rs.1,00,000 - Rs.3,00,000" },
  { value: "300000_PLUS", label: "Rs.3,00,000+" },
  { value: "NOT_SURE", label: "Not Sure Yet" },
] as const;

export type LeadBudget = (typeof budgetOptions)[number]["value"];

export const timelineOptions = [
  { value: "URGENT_ASAP", label: "Urgent / ASAP" },
  { value: "WITHIN_1_MONTH", label: "Within 1 Month" },
  { value: "ONE_TO_THREE_MONTHS", label: "1-3 Months" },
  { value: "THREE_TO_SIX_MONTHS", label: "3-6 Months" },
  { value: "SIX_PLUS_MONTHS", label: "6+ Months" },
  { value: "FLEXIBLE_NOT_SURE", label: "Flexible / Not Sure" },
] as const;

export type LeadTimeline = (typeof timelineOptions)[number]["value"];

export const heardAboutOptions = [
  { value: "GOOGLE_SEARCH", label: "Google Search" },
  { value: "GOOGLE_BUSINESS_PROFILE", label: "Google Business Profile" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "REFERRAL", label: "Referral" },
  { value: "EXISTING_CLIENT", label: "Existing Client" },
  { value: "EVENT_NETWORKING", label: "Event / Networking" },
  { value: "OTHER", label: "Other" },
] as const;

export type HeardAbout = (typeof heardAboutOptions)[number]["value"];

export type LeadAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPage?: string;
  currentPage?: string;
};

export type PublicLeadInput = {
  source: LeadSource;
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  service: LeadService;
  budget?: LeadBudget;
  timeline?: LeadTimeline;
  projectDescription: string;
  heardAboutUs?: HeardAbout;
  attribution?: LeadAttribution;
  website?: string;
};

export type NormalizedPublicLead = Omit<PublicLeadInput, "website">;

export type LeadFieldErrors = Partial<Record<keyof PublicLeadInput, string>>;

export type LeadValidationResult =
  | { ok: true; lead: NormalizedPublicLead; isHoneypot: boolean }
  | { ok: false; message: string; fieldErrors: LeadFieldErrors };
