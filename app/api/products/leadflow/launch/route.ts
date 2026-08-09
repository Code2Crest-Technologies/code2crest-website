import { NextResponse } from "next/server";
import {
  CompanyProductStatus,
  PlatformRole,
  ProductStatus,
  SubscriptionStatus,
} from "@prisma/client";
import { randomUUID } from "crypto";
import { getAuthContext } from "@/lib/auth/server";
import { createLeadFlowSsoToken } from "@/lib/auth/sso";
import { getPortalHref } from "@/lib/config/public-url";
import { prisma } from "@/lib/db/prisma";
import { createAuditLog } from "@/lib/audit/log";
import { getRequestMeta } from "@/lib/http/request";

const leadFlowCallbackUrl = "https://leadflow.code2crest.com/sso/callback";
const ssoIssuer = "code2crest-portal";
const ssoAudience = "leadflow";
const ACTIVE_SUBSCRIPTION_STATUSES = new Set<SubscriptionStatus>([
  SubscriptionStatus.TRIALING,
  SubscriptionStatus.ACTIVE,
]);

type LaunchFailureReason =
  | "leadflow_trial_expired"
  | "subscription_suspended"
  | "subscription_expired"
  | "product_unavailable"
  | "product_access_required";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

function isBrowserRequest(request: Request) {
  const accept = request.headers.get("accept") ?? "";
  return accept.includes("text/html");
}

function entitlementFailure(
  request: Request,
  reason: LaunchFailureReason,
  message: string,
  status = 403,
) {
  if (!isBrowserRequest(request)) {
    return NextResponse.json({ message, reason }, { status });
  }

  const targetPath =
    reason === "product_unavailable" || reason === "product_access_required"
      ? "/products"
      : "/subscription";
  const redirectUrl = new URL(getPortalHref(targetPath), request.url);
  redirectUrl.searchParams.set("reason", reason);

  return NextResponse.redirect(redirectUrl);
}

export async function GET(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    const loginUrl = new URL(getPortalHref("/login"), request.url);
    loginUrl.searchParams.set("next", "/products");
    return NextResponse.redirect(loginUrl);
  }

  const isInternalPlatformAdmin =
    context.user.platformRole === PlatformRole.PLATFORM_ADMIN;

  const leadFlowAccess = await prisma.companyProduct.findFirst({
    where: {
      companyId: context.companyId,
      product: { key: "leadflow" },
    },
    include: {
      product: true,
      company: {
        include: {
          subscription: true,
        },
      },
    },
  });

  if (!leadFlowAccess) {
    return entitlementFailure(
      request,
      "product_access_required",
      "Company does not have active LeadFlow access.",
    );
  }

  if (leadFlowAccess.product.status !== ProductStatus.ACTIVE) {
    return entitlementFailure(
      request,
      "product_unavailable",
      "LeadFlow is not active for launch.",
    );
  }

  if (
    !isInternalPlatformAdmin &&
    leadFlowAccess.status !== CompanyProductStatus.TRIAL &&
    leadFlowAccess.status !== CompanyProductStatus.ACTIVE
  ) {
    return entitlementFailure(
      request,
      leadFlowAccess.status === CompanyProductStatus.SUSPENDED
        ? "subscription_suspended"
        : "product_access_required",
      "Company does not have active LeadFlow access.",
    );
  }

  if (
    !isInternalPlatformAdmin &&
    leadFlowAccess.status === CompanyProductStatus.TRIAL &&
    (!leadFlowAccess.trialEndsAt || leadFlowAccess.trialEndsAt < new Date())
  ) {
    return entitlementFailure(
      request,
      "leadflow_trial_expired",
      "Company LeadFlow trial has expired.",
    );
  }

  const subscription = leadFlowAccess.company.subscription;

  if (
    !isInternalPlatformAdmin &&
    (!subscription ||
      !ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.status))
  ) {
    return entitlementFailure(
      request,
      subscription?.status === SubscriptionStatus.PAST_DUE ||
        subscription?.status === SubscriptionStatus.CANCELLED
        ? "subscription_suspended"
        : "subscription_expired",
      "Company subscription is not active.",
    );
  }

  if (!subscription) {
    return entitlementFailure(
      request,
      "subscription_expired",
      "Company does not have a subscription.",
    );
  }

  if (
    !isInternalPlatformAdmin &&
    subscription.status === SubscriptionStatus.TRIALING &&
    subscription.trialEndsAt &&
    subscription.trialEndsAt < new Date()
  ) {
    return entitlementFailure(
      request,
      "leadflow_trial_expired",
      "Company subscription trial has expired.",
    );
  }

  if (
    !isInternalPlatformAdmin &&
    subscription.status === SubscriptionStatus.ACTIVE &&
    subscription.currentPeriodEnd &&
    subscription.currentPeriodEnd < new Date()
  ) {
    return entitlementFailure(
      request,
      "subscription_expired",
      "Company subscription period has expired.",
    );
  }

  const { firstName, lastName } = splitName(context.user.name);
  const subscriptionStatus = isInternalPlatformAdmin
    ? SubscriptionStatus.ACTIVE
    : subscription.status;
  const productAccess = isInternalPlatformAdmin
    ? CompanyProductStatus.ACTIVE
    : leadFlowAccess.status;
  const token = createLeadFlowSsoToken({
    portalUserId: context.user.id,
    portalCompanyId: context.companyId,
    email: context.user.email,
    firstName,
    lastName,
    role: context.membershipRole,
    productKey: "leadflow",
    subscriptionStatus,
    productAccess,
    companyName: context.activeCompany.name,
    companySlug: context.activeCompany.slug,
    subscriptionPlan: subscription.plan,
    platformRole: isInternalPlatformAdmin ? PlatformRole.PLATFORM_ADMIN : undefined,
    internalAccess: isInternalPlatformAdmin,
    iss: ssoIssuer,
    aud: ssoAudience,
    jti: randomUUID(),
    userId: context.user.id,
    companyId: context.companyId,
    product: "leadflow",
  });
  const callbackUrl = new URL(leadFlowCallbackUrl);
  callbackUrl.searchParams.set("token", token);

  await createAuditLog({
    action: "PRODUCT_LAUNCHED",
    actorId: context.user.id,
    companyId: context.companyId,
    entityType: "Product",
    entityId: leadFlowAccess.productId,
    metadata: {
      productKey: "leadflow",
      internalAccess: isInternalPlatformAdmin,
      effectiveSubscriptionStatus: subscriptionStatus,
      effectiveProductAccess: productAccess,
    },
    ...getRequestMeta(request),
  });

  return NextResponse.redirect(callbackUrl);
}
