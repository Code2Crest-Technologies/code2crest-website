import {
  normalizeAttribution,
  normalizeEmail,
  normalizeOptional,
  normalizePhone,
  trimToLength,
  validBudgets,
  validHeardAbout,
  validLeadSources,
  validServices,
  validTimelines,
} from "@/lib/leads/normalize";
import type {
  LeadBudget,
  LeadService,
  LeadSource,
  LeadTimeline,
  HeardAbout,
  LeadFieldErrors,
  LeadValidationResult,
  PublicLeadInput,
} from "@/lib/leads/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9()[\]\-\s.]{7,32}$/;

function isStringOption<T extends string>(value: string, validValues: Set<T>): value is T {
  return validValues.has(value as T);
}

export function validatePublicLeadPayload(payload: unknown): LeadValidationResult {
  if (!payload || typeof payload !== "object") {
    return {
      ok: false,
      message: "Please check the form and try again.",
      fieldErrors: { name: "Invalid submission." },
    };
  }

  const input = payload as Partial<PublicLeadInput>;
  const fieldErrors: LeadFieldErrors = {};
  const website = trimToLength(input.website, 120);
  const name = trimToLength(input.name, 100);
  const companyName = normalizeOptional(input.companyName, 120);
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);
  const service = trimToLength(input.service, 80);
  const budget = normalizeOptional(input.budget, 80);
  const timeline = normalizeOptional(input.timeline, 80);
  const rawProjectDescription =
    typeof input.projectDescription === "string" ? input.projectDescription.trim() : "";
  const projectDescription = trimToLength(input.projectDescription, 1600);
  const heardAboutUs = normalizeOptional(input.heardAboutUs, 80);
  const source = trimToLength(input.source, 80) || "CODE2CREST_GET_QUOTE";

  if (name.length < 2) {
    fieldErrors.name = "Enter your full name.";
  }

  if (!emailPattern.test(email)) {
    fieldErrors.email = "Enter a valid business email.";
  }

  if (!phonePattern.test(phone)) {
    fieldErrors.phone = "Enter a valid phone or WhatsApp number.";
  }

  if (!isStringOption<LeadService>(service, validServices)) {
    fieldErrors.service = "Select a valid service.";
  }

  if (budget && !isStringOption<LeadBudget>(budget, validBudgets)) {
    fieldErrors.budget = "Select a valid budget range.";
  }

  if (timeline && !isStringOption<LeadTimeline>(timeline, validTimelines)) {
    fieldErrors.timeline = "Select a valid timeline.";
  }

  if (rawProjectDescription.length < 20) {
    fieldErrors.projectDescription = "Add at least 20 characters about your project.";
  }

  if (rawProjectDescription.length > 1600) {
    fieldErrors.projectDescription = "Keep the project description under 1600 characters.";
  }

  if (heardAboutUs && !isStringOption<HeardAbout>(heardAboutUs, validHeardAbout)) {
    fieldErrors.heardAboutUs = "Select a valid source.";
  }

  if (!isStringOption<LeadSource>(source, validLeadSources)) {
    fieldErrors.source = "Invalid lead source.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const normalizedSource = source as LeadSource;
  const normalizedService = service as LeadService;
  const normalizedBudget = budget as LeadBudget | undefined;
  const normalizedTimeline = timeline as LeadTimeline | undefined;
  const normalizedHeardAboutUs = heardAboutUs as HeardAbout | undefined;

  return {
    ok: true,
    isHoneypot: website.length > 0,
    lead: {
      source: normalizedSource,
      name,
      companyName,
      email,
      phone,
      service: normalizedService,
      budget: normalizedBudget,
      timeline: normalizedTimeline,
      projectDescription,
      heardAboutUs: normalizedHeardAboutUs,
      attribution: normalizeAttribution(input.attribution),
    },
  };
}
