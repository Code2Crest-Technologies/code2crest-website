import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { listTeamMembers } from "@/modules/team/server";

export async function GET() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const members = await listTeamMembers(context.companyId);

  return NextResponse.json({
    companyId: context.companyId,
    currentUserRole: context.membershipRole,
    members,
  });
}
