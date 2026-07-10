import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { cancelSubscription } from "@/modules/subscription/billing";

export async function POST() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const result = await cancelSubscription({
    companyId: context.companyId,
    actorRole: context.membershipRole,
  });

  return NextResponse.json(
    { message: result.ok ? "Subscription cancellation requested." : result.message },
    { status: result.ok ? 200 : result.status },
  );
}
