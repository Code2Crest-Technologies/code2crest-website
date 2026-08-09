import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { getCompanySubscription } from "@/modules/subscription/server";
import { getCompanyProductAccess } from "@/modules/products/server";

export async function GET() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const subscription = await getCompanySubscription(context.companyId);
  const products = await getCompanyProductAccess(context.companyId);

  if (!subscription) {
    return NextResponse.json(
      { message: "Company does not have a subscription." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    companyId: context.companyId,
    platformRole: context.user.platformRole,
    plan: subscription.subscription.plan,
    status: subscription.subscription.status,
    billingCycle: subscription.subscription.billingCycle,
    trialEndsAt: subscription.subscription.trialEndsAt,
    currentPeriodStart: subscription.subscription.currentPeriodStart,
    currentPeriodEnd: subscription.subscription.currentPeriodEnd,
    cancelAtPeriodEnd: subscription.subscription.cancelAtPeriodEnd,
    limits: subscription.limits,
    usage: subscription.usage,
    productAccess: products.map((product) => ({
      key: product.key,
      name: product.name,
      status: product.status,
      accessStatus: product.access?.status ?? null,
    })),
    trialDaysRemaining: subscription.trialDaysRemaining,
  });
}
