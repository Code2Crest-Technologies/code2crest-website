import type { NormalizedPublicLead } from "@/lib/leads/types";

export type LeadFlowIntakeResult =
  | {
      ok: true;
      contactId: string;
      dealId: string;
      duplicateReused: boolean;
    }
  | {
      ok: false;
      reason: "missing_config" | "timeout" | "bad_response" | "request_failed";
    };

function getLeadFlowIntakeUrl() {
  const url = process.env.LEADFLOW_INTERNAL_API_URL;

  if (!url) {
    return null;
  }

  const parsed = new URL(url);
  const intakePath = "/api/internal/leads/intake";
  const normalizedBase = parsed.toString().replace(/\/+$/, "");
  const normalizedPathname = parsed.pathname.replace(/\/+$/, "");

  if (normalizedPathname.endsWith(intakePath)) {
    return normalizedBase;
  }

  const intakeUrl = `${normalizedBase}${intakePath}`;

  if (intakeUrl.includes("/api/api/")) {
    throw new Error("LEADFLOW_INTERNAL_API_URL must not include duplicate /api/api prefix.");
  }

  return intakeUrl;
}

function isValidIntakeResponse(value: unknown): value is {
  success: true;
  data: {
    contactId: string;
    dealId: string;
    duplicateReused: boolean;
  };
} {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Record<string, unknown>;

  return (
    response.success === true &&
    typeof response.data === "object" &&
    response.data !== null &&
    typeof (response.data as Record<string, unknown>).contactId === "string" &&
    typeof (response.data as Record<string, unknown>).dealId === "string" &&
    typeof (response.data as Record<string, unknown>).duplicateReused === "boolean"
  );
}

export async function forwardLeadToLeadFlow(
  lead: NormalizedPublicLead,
): Promise<LeadFlowIntakeResult> {
  let url: string | null;

  try {
    url = getLeadFlowIntakeUrl();
  } catch {
    return { ok: false, reason: "bad_response" };
  }

  const secret = process.env.CODE2CREST_LEADFLOW_INTEGRATION_SECRET;

  if (!url || !secret) {
    return { ok: false, reason: "missing_config" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lead.name,
        companyName: lead.companyName,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        budget: lead.budget,
        timeline: lead.timeline,
        projectDescription: lead.projectDescription,
        heardAboutUs: lead.heardAboutUs,
        attribution: lead.attribution,
      }),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => null)) as unknown;

    if (!response.ok || !isValidIntakeResponse(data)) {
      return { ok: false, reason: "bad_response" };
    }

    return {
      ok: true,
      contactId: data.data.contactId,
      dealId: data.data.dealId,
      duplicateReused: data.data.duplicateReused,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, reason: "timeout" };
    }

    return { ok: false, reason: "request_failed" };
  } finally {
    clearTimeout(timeout);
  }
}
