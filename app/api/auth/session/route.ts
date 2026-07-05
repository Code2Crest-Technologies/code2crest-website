import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";

export async function GET() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: context.user,
    activeCompany: context.activeCompany,
    membershipRole: context.membershipRole,
  });
}
