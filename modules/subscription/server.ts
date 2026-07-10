import { Plan, SubscriptionStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { portalPlanConfig } from "@/modules/portal/data/plans";

export type PlanLimitKey = "users" | "contacts";
export type PlanLimitValue = number | "unlimited";

export const PLAN_LIMITS = {
  [Plan.TRIAL]: portalPlanConfig.TRIAL.limits,
  [Plan.STARTER]: portalPlanConfig.STARTER.limits,
  [Plan.GROWTH]: portalPlanConfig.GROWTH.limits,
  [Plan.BUSINESS]: portalPlanConfig.BUSINESS.limits,
} satisfies Record<Plan, Record<PlanLimitKey, PlanLimitValue>>;

function subscriptionError(status: number, message: string) {
  return { ok: false as const, status, message };
}

function subscriptionSuccess<T extends object>(data: T) {
  return { ok: true as const, ...data };
}

function isSubscriptionUsable(status: SubscriptionStatus) {
  return status === SubscriptionStatus.TRIALING || status === SubscriptionStatus.ACTIVE;
}

function getDaysRemaining(date: Date | null) {
  if (!date) {
    return null;
  }

  return Math.max(
    0,
    Math.ceil((date.getTime() - Date.now()) / (24 * 60 * 60 * 1000)),
  );
}

async function getUsage(companyId: string) {
  const users = await prisma.membership.count({
    where: {
      companyId,
      isActive: true,
    },
  });

  return {
    users,
    contacts: 0,
  };
}

export async function createTrialSubscription(companyId: string) {
  const trialStartedAt = new Date();
  const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  return prisma.subscription.upsert({
    where: { companyId },
    update: {},
    create: {
      companyId,
      plan: Plan.TRIAL,
      status: SubscriptionStatus.TRIALING,
      trialEndsAt,
      currentPeriodStart: trialStartedAt,
      currentPeriodEnd: trialEndsAt,
    },
  });
}

export async function getCompanySubscription(companyId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { companyId },
  });

  if (!subscription) {
    return null;
  }

  const usage = await getUsage(companyId);
  const limits = PLAN_LIMITS[subscription.plan];

  return {
    subscription,
    limits,
    usage,
    trialDaysRemaining: getDaysRemaining(subscription.trialEndsAt),
  };
}

export async function requireActiveSubscription(companyId: string) {
  const subscriptionContext = await getCompanySubscription(companyId);

  if (!subscriptionContext) {
    return subscriptionError(403, "Company does not have a subscription.");
  }

  const { subscription } = subscriptionContext;

  if (!isSubscriptionUsable(subscription.status)) {
    return subscriptionError(403, "Company subscription is not active.");
  }

  if (
    subscription.status === SubscriptionStatus.TRIALING &&
    subscription.trialEndsAt &&
    subscription.trialEndsAt < new Date()
  ) {
    return subscriptionError(403, "Company trial has expired.");
  }

  if (
    subscription.status === SubscriptionStatus.ACTIVE &&
    subscription.currentPeriodEnd &&
    subscription.currentPeriodEnd < new Date()
  ) {
    return subscriptionError(403, "Company subscription period has ended.");
  }

  return subscriptionSuccess(subscriptionContext);
}

export async function checkPlanLimit(companyId: string, limitKey: PlanLimitKey) {
  const activeSubscription = await requireActiveSubscription(companyId);

  if (!activeSubscription.ok) {
    return activeSubscription;
  }

  const limit = activeSubscription.limits[limitKey];
  const usage = activeSubscription.usage[limitKey];

  if (limit !== "unlimited" && usage >= limit) {
    return subscriptionError(
      403,
      `Plan limit reached for ${limitKey}. Upgrade is coming soon.`,
    );
  }

  return subscriptionSuccess({
    limit,
    usage,
    subscription: activeSubscription.subscription,
  });
}
