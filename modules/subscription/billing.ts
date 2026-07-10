import { createHmac, timingSafeEqual } from "crypto";
import { MembershipRole, Plan } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { isRazorpayConfigured } from "@/lib/config/env";

const provider = "razorpay";
const selectablePlans = [Plan.STARTER, Plan.GROWTH, Plan.BUSINESS] as const;

export function canManageBilling(role: MembershipRole) {
  return role === MembershipRole.OWNER || role === MembershipRole.ADMIN;
}

function billingError(status: number, message: string) {
  return { ok: false as const, status, message };
}

function billingSuccess<T extends object>(data: T) {
  return { ok: true as const, ...data };
}

export function getRazorpayPlanId(plan: Plan) {
  const envName = `RAZORPAY_PLAN_${plan}` as const;
  return process.env[envName];
}

export function isCheckoutEnabled() {
  return (
    isRazorpayConfigured() &&
    selectablePlans.every((plan) => Boolean(getRazorpayPlanId(plan)))
  );
}

export async function createBillingCheckout(input: {
  companyId: string;
  actorRole: MembershipRole;
  plan: Plan;
}) {
  if (!canManageBilling(input.actorRole)) {
    return billingError(403, "Only OWNER and ADMIN members can manage billing.");
  }

  if (!selectablePlans.includes(input.plan as (typeof selectablePlans)[number])) {
    return billingError(400, "This plan is not available for online checkout.");
  }

  if (!isCheckoutEnabled()) {
    return billingError(
      503,
      "Online payments are being enabled for beta customers.",
    );
  }

  const subscription = await prisma.subscription.findUnique({
    where: { companyId: input.companyId },
  });

  if (!subscription) {
    return billingError(404, "Company subscription was not found.");
  }

  return billingSuccess({
    checkoutEnabled: false,
    plan: input.plan,
    message: "Razorpay checkout service is ready to connect after plan IDs are finalized.",
  });
}

export async function getBillingHistory(companyId: string) {
  return prisma.payment.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      provider: true,
      amount: true,
      currency: true,
      status: true,
      paidAt: true,
      createdAt: true,
    },
  });
}

export function verifyRazorpaySignature(input: {
  body: string;
  signature: string | null;
  secret: string | undefined;
}) {
  if (!input.signature || !input.secret) {
    return false;
  }

  const expected = createHmac("sha256", input.secret)
    .update(input.body)
    .digest("hex");
  const actualBuffer = Buffer.from(input.signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function recordBillingWebhook(input: {
  providerEventId: string;
  eventType: string;
  payload: unknown;
}) {
  return prisma.billingEvent.upsert({
    where: { providerEventId: input.providerEventId },
    update: {},
    create: {
      provider,
      providerEventId: input.providerEventId,
      eventType: input.eventType,
      payload: input.payload as object,
      processedAt: new Date(),
    },
  });
}

export async function cancelSubscription(input: {
  companyId: string;
  actorRole: MembershipRole;
}) {
  if (!canManageBilling(input.actorRole)) {
    return billingError(403, "Only OWNER and ADMIN members can manage billing.");
  }

  return billingError(
    503,
    "Online cancellation will be enabled after Razorpay billing is live.",
  );
}
