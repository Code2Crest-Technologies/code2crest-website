import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { getBillingHistory } from "@/modules/subscription/billing";

export async function GET() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const payments = await getBillingHistory(context.companyId);

  return NextResponse.json({ payments });
}
