import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { removeMember } from "@/modules/team/server";
import { createAuditLog } from "@/lib/audit/log";
import { getRequestMeta } from "@/lib/http/request";

type RouteContext = {
  params: Promise<{
    membershipId: string;
  }>;
};

export async function DELETE(request: Request, routeContext: RouteContext) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const { membershipId } = await routeContext.params;
  const result = await removeMember({
    companyId: context.companyId,
    membershipId,
    actorRole: context.membershipRole,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  await createAuditLog({
    action: "MEMBER_REMOVED",
    actorId: context.user.id,
    companyId: context.companyId,
    entityType: "Membership",
    entityId: result.membership.id,
    ...getRequestMeta(request),
  });

  return NextResponse.json({ membership: result.membership });
}
