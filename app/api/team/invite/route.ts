import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { createInvite, isMembershipRole } from "@/modules/team/server";

export async function POST(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    email?: string;
    role?: string;
  } | null;

  if (!body?.email || !isMembershipRole(body.role)) {
    return NextResponse.json(
      { message: "A valid email and role are required." },
      { status: 400 },
    );
  }

  const origin = new URL(request.url).origin;
  const result = await createInvite({
    companyId: context.companyId,
    email: body.email,
    role: body.role,
    invitedById: context.user.id,
    inviterRole: context.membershipRole,
    origin,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json(
    {
      invite: result.invite,
      inviteLink: result.inviteLink,
    },
    { status: result.status },
  );
}
