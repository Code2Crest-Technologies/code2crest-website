import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { listPendingInvites, listTeamMembers } from "@/modules/team/server";

export async function GET(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const members = await listTeamMembers(context.companyId);
  const invites = await listPendingInvites(context.companyId);
  const origin = new URL(request.url).origin;

  return NextResponse.json({
    companyId: context.companyId,
    currentUserId: context.user.id,
    currentUserRole: context.membershipRole,
    members,
    invites: invites.map((invite) => ({
      ...invite,
      inviteLink: `${origin}/register?inviteToken=${invite.token}`,
    })),
  });
}
