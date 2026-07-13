import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { resendInvite } from "@/modules/team/server";
import { createAuditLog } from "@/lib/audit/log";
import { getRequestMeta } from "@/lib/http/request";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const requestMeta = getRequestMeta(request);
  const rate = checkRateLimit({
    key: `team-invite-resend:${context.user.id}:${requestMeta.ip ?? "unknown"}`,
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });

  if (!rate.ok) {
    return NextResponse.json(
      { message: "Please wait before resending more invites." },
      { status: 429 },
    );
  }

  const { inviteId } = await params;
  const result = await resendInvite({
    companyId: context.companyId,
    inviteId,
    actorRole: context.membershipRole,
    origin: new URL(request.url).origin,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  await createAuditLog({
    action: "MEMBER_INVITED",
    actorId: context.user.id,
    companyId: context.companyId,
    entityType: "Invite",
    entityId: result.invite.id,
    metadata: { email: result.invite.email, role: result.invite.role, resent: true },
    ...requestMeta,
  });

  return NextResponse.json({ invite: result.invite, inviteLink: result.inviteLink });
}
