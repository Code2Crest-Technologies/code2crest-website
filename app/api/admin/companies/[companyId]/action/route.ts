import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { runAdminCompanyAction } from "@/modules/admin/server";
import { getRequestMeta } from "@/lib/http/request";

const allowedActions = [
  "extend_trial",
  "activate_company",
  "suspend_company",
  "grant_leadflow",
  "revoke_leadflow",
] as const;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ companyId: string }> },
) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  if (context.user.platformRole !== "PLATFORM_ADMIN") {
    return NextResponse.json({ message: "Platform admin access required." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as { action?: string } | null;

  if (!body?.action || !allowedActions.includes(body.action as (typeof allowedActions)[number])) {
    return NextResponse.json({ message: "A valid admin action is required." }, { status: 400 });
  }

  const { companyId } = await params;
  const result = await runAdminCompanyAction({
    actorId: context.user.id,
    companyId,
    action: body.action as (typeof allowedActions)[number],
    ...getRequestMeta(request),
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
