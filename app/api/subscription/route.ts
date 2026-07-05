import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { getCompanySubscription } from "@/modules/subscription/server";

export async function GET() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const subscription = await getCompanySubscription(context.companyId);

  if (!subscription) {
    return NextResponse.json(
      { message: "Company does not have a subscription." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    companyId: context.companyId,
    plan: subscription.subscription.plan,
    status: subscription.subscription.status,
    trialEndsAt: subscription.subscription.trialEndsAt,
    currentPeriodEnd: subscription.subscription.currentPeriodEnd,
    limits: subscription.limits,
    usage: subscription.usage,
    trialDaysRemaining: subscription.trialDaysRemaining,
  });
}
