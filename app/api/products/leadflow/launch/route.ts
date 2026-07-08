import { NextResponse } from "next/server";
import {
  CompanyProductStatus,
  ProductStatus,
  SubscriptionStatus,
} from "@prisma/client";
import { randomUUID } from "crypto";
import { getAuthContext } from "@/lib/auth/server";
import { createLeadFlowSsoToken } from "@/lib/auth/sso";
import { getPortalHref } from "@/lib/config/public-url";
import { prisma } from "@/lib/db/prisma";

const leadFlowCallbackUrl = "https://leadflow.code2crest.com/sso/callback";
const ssoIssuer = "code2crest-portal";
const ssoAudience = "leadflow";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

export async function GET(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    const loginUrl = new URL(getPortalHref("/login"), request.url);
    loginUrl.searchParams.set("next", "/dashboard");
    return NextResponse.redirect(loginUrl);
  }

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
    return NextResponse.json(
      { message: "Company does not have active LeadFlow access." },
      { status: 403 },
    );
  }

  if (leadFlowAccess.product.status !== ProductStatus.ACTIVE) {
    return NextResponse.json(
      { message: "LeadFlow is not active for launch." },
      { status: 403 },
    );
  }

  if (
    leadFlowAccess.status !== CompanyProductStatus.TRIAL &&
    leadFlowAccess.status !== CompanyProductStatus.ACTIVE
  ) {
    return NextResponse.json(
      { message: "Company does not have active LeadFlow access." },
      { status: 403 },
    );
  }

  if (
    leadFlowAccess.status === CompanyProductStatus.TRIAL &&
    (!leadFlowAccess.trialEndsAt || leadFlowAccess.trialEndsAt < new Date())
  ) {
    return NextResponse.json(
      { message: "Company LeadFlow trial has expired." },
      { status: 403 },
    );
  }

  const subscription = leadFlowAccess.company.subscription;

  if (
    !subscription ||
    (subscription.status !== SubscriptionStatus.TRIALING &&
      subscription.status !== SubscriptionStatus.ACTIVE)
  ) {
    return NextResponse.json(
      { message: "Company subscription is not active." },
      { status: 403 },
    );
  }

  const { firstName, lastName } = splitName(context.user.name);
  const token = createLeadFlowSsoToken({
    portalUserId: context.user.id,
    portalCompanyId: context.companyId,
    email: context.user.email,
    firstName,
    lastName,
    role: context.membershipRole,
    productKey: "leadflow",
    subscriptionStatus: subscription.status,
    productAccess: leadFlowAccess.status,
    companyName: context.activeCompany.name,
    companySlug: context.activeCompany.slug,
    subscriptionPlan: subscription.plan,
    iss: ssoIssuer,
    aud: ssoAudience,
    jti: randomUUID(),
    userId: context.user.id,
    companyId: context.companyId,
    product: "leadflow",
  });
  const callbackUrl = new URL(leadFlowCallbackUrl);
  callbackUrl.searchParams.set("token", token);

  return NextResponse.redirect(callbackUrl);
}
