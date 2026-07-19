import { NextResponse } from "next/server";
import { getRequestMeta } from "@/lib/http/request";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { validatePublicLeadPayload } from "@/lib/leads/validation";
import { submitPublicLead } from "@/lib/leads/submit-public-lead";

const successResponse = {
  success: true,
  message: "Thanks! We've received your project enquiry.",
};

export async function POST(request: Request) {
  const requestMeta = getRequestMeta(request);
  const rate = checkRateLimit({
    key: `public-lead:${requestMeta.ip ?? "unknown"}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!rate.ok) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many enquiries were submitted. Please try again shortly.",
        fieldErrors: {},
      },
      { status: 429 },
    );
  }

  const payload = await request.json().catch(() => null);
  const result = validatePublicLeadPayload(payload);

  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        message: result.message,
        fieldErrors: result.fieldErrors,
      },
      { status: 400 },
    );
  }

  if (result.isHoneypot) {
    console.warn(`[public-lead] honeypot blocked ip=${requestMeta.ip ?? "unknown"}`);
    return NextResponse.json(successResponse);
  }

  const delivery = await submitPublicLead(result.lead);

  if (!delivery.ok) {
    console.error(
      `[public-lead] leadflow_and_email_failed source=${result.lead.source} service=${result.lead.service} ip=${requestMeta.ip ?? "unknown"}`,
    );
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't process your enquiry right now. Please try again or contact us directly.",
        fieldErrors: {},
      },
      { status: 503 },
    );
  }

  return NextResponse.json(successResponse);
}
