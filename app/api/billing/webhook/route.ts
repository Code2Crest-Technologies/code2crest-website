import { NextResponse } from "next/server";
import {
  recordBillingWebhook,
  verifyRazorpaySignature,
} from "@/modules/subscription/billing";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  const isValid = verifyRazorpaySignature({
    body: rawBody,
    signature,
    secret: process.env.RAZORPAY_WEBHOOK_SECRET,
  });

  if (!isValid) {
    return NextResponse.json({ message: "Invalid webhook signature." }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    event?: string;
    payload?: { payment?: { entity?: { id?: string } } };
    id?: string;
  };
  const providerEventId =
    payload.id ?? payload.payload?.payment?.entity?.id ?? crypto.randomUUID();

  await recordBillingWebhook({
    providerEventId,
    eventType: payload.event ?? "unknown",
    payload,
  });

  return NextResponse.json({ received: true });
}
