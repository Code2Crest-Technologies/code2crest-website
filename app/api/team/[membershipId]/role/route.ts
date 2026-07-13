import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { isMembershipRole, updateMemberRole } from "@/modules/team/server";
import { createAuditLog } from "@/lib/audit/log";
import { getRequestMeta } from "@/lib/http/request";

type RouteContext = {
  params: Promise<{
    membershipId: string;
  }>;
};

export async function PATCH(request: Request, routeContext: RouteContext) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    role?: string;
  } | null;

  if (!isMembershipRole(body?.role)) {
    return NextResponse.json({ message: "A valid role is required." }, { status: 400 });
  }

  const { membershipId } = await routeContext.params;
  const result = await updateMemberRole({
    companyId: context.companyId,
    membershipId,
    role: body.role,
    actorRole: context.membershipRole,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  await createAuditLog({
    action: "MEMBER_ROLE_CHANGED",
    actorId: context.user.id,
    companyId: context.companyId,
    entityType: "Membership",
    entityId: result.membership.id,
    metadata: { role: result.membership.role },
    ...getRequestMeta(request),
  });

  return NextResponse.json({ membership: result.membership });
}
