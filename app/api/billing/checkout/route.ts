import { NextResponse } from "next/server";
import { Plan } from "@prisma/client";
import { getAuthContext } from "@/lib/auth/server";
import { createBillingCheckout } from "@/modules/subscription/billing";

export async function POST(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { plan?: string } | null;
  const plan = body?.plan;

  if (!plan || !Object.values(Plan).includes(plan as Plan)) {
    return NextResponse.json({ message: "A valid plan is required." }, { status: 400 });
  }

  const result = await createBillingCheckout({
    companyId: context.companyId,
    actorRole: context.membershipRole,
    plan: plan as Plan,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json(result);
}
