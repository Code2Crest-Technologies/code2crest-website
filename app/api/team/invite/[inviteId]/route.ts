import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { cancelInvite } from "@/modules/team/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const { inviteId } = await params;
  const result = await cancelInvite({
    companyId: context.companyId,
    inviteId,
    actorRole: context.membershipRole,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({ invite: result.invite });
}
