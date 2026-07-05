import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";

export async function GET() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({
    user: context.user,
    activeCompany: context.activeCompany,
    membershipRole: context.membershipRole,
    companyId: context.companyId,
  });
}
