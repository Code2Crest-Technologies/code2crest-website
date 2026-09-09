import {
  budgetOptions,
  heardAboutOptions,
  leadSources,
  serviceOptions,
  timelineOptions,
  type LeadAttribution,
} from "@/lib/leads/types";

export function trimToLength(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function normalizeEmail(value: unknown) {
  return trimToLength(value, 254).toLowerCase();
}

export function normalizePhone(value: unknown) {
  return trimToLength(value, 32).replace(/[^\d+()\-\s.]/g, "");
}

export function normalizeOptional(value: unknown, maxLength: number) {
  const normalized = trimToLength(value, maxLength);
  return normalized.length > 0 ? normalized : undefined;
}

export function getOptionLabel<T extends readonly { value: string; label: string }[]>(
  options: T,
  value?: string,
) {
  return options.find((option) => option.value === value)?.label ?? "Not provided";
}

export function normalizeAttribution(value: unknown): LeadAttribution {
  if (!value || typeof value !== "object") {
    return {};
  }

  const attribution = value as Record<string, unknown>;

  return {
    utmSource: normalizeOptional(attribution.utmSource, 80),
    utmMedium: normalizeOptional(attribution.utmMedium, 80),
    utmCampaign: normalizeOptional(attribution.utmCampaign, 120),
    utmTerm: normalizeOptional(attribution.utmTerm, 120),
    utmContent: normalizeOptional(attribution.utmContent, 120),
    referrer: normalizeOptional(attribution.referrer, 500),
    landingPage: normalizeOptional(attribution.landingPage, 500),
    currentPage: normalizeOptional(attribution.currentPage, 500),
    modalSource: normalizeOptional(attribution.modalSource, 80),
  };
}

export const validLeadSources = new Set(leadSources);
export const validServices = new Set(serviceOptions.map((option) => option.value));
export const validBudgets = new Set(budgetOptions.map((option) => option.value));
export const validTimelines = new Set(timelineOptions.map((option) => option.value));
export const validHeardAbout = new Set(heardAboutOptions.map((option) => option.value));
