import { NextResponse } from "next/server";
import type { LeadFlowPermission } from "@/modules/leadflow/permissions";
import { requirePermission } from "@/modules/leadflow/permissions";
import { checkPlanLimit, type PlanLimitKey } from "@/modules/subscription/server";

type ResourceName =
  | "contacts"
  | "deals"
  | "tasks"
  | "quotations"
  | "notes"
  | "activities"
  | "timeline"
  | "settings/integrations";

function denied(status: number, message: string) {
  return NextResponse.json({ message }, { status });
}

async function guarded(permission: LeadFlowPermission) {
  const access = await requirePermission(permission);

  if (!access.ok) {
    return {
      ok: false as const,
      response: denied(access.status, access.message),
    };
  }

  return access;
}

export async function listLeadFlowResource(
  resource: ResourceName,
  permission: LeadFlowPermission,
) {
  const access = await guarded(permission);

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    companyId: access.context.companyId,
    resource,
    data: [],
  });
}

export async function createLeadFlowResource(
  resource: ResourceName,
  permission: LeadFlowPermission,
  limitKey?: PlanLimitKey,
) {
  const access = await guarded(permission);

  if (!access.ok) {
    return access.response;
  }

  if (limitKey) {
    const limit = await checkPlanLimit(access.context.companyId, limitKey);

    if (!limit.ok) {
      return denied(limit.status, limit.message);
    }
  }

  return NextResponse.json(
    {
      companyId: access.context.companyId,
      resource,
      message:
        "LeadFlow data model is not connected yet. Use the active companyId from auth context when implemented.",
    },
    { status: 501 },
  );
}

export async function updateLeadFlowResource(
  resource: ResourceName,
  permission: LeadFlowPermission,
  id?: string,
) {
  const access = await guarded(permission);

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json(
    {
      companyId: access.context.companyId,
      resource,
      id,
      message:
        "LeadFlow data model is not connected yet. Updates must use the active companyId from auth context when implemented.",
    },
    { status: 501 },
  );
}

export async function deleteLeadFlowResource(
  resource: ResourceName,
  permission: LeadFlowPermission,
  id?: string,
) {
  const access = await guarded(permission);

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json(
    {
      companyId: access.context.companyId,
      resource,
      id,
      message:
        "LeadFlow data model is not connected yet. Deletes must be scoped by the active companyId when implemented.",
    },
    { status: 501 },
  );
}
