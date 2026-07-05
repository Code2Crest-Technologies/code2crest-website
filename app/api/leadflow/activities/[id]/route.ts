import {
  deleteLeadFlowResource,
  listLeadFlowResource,
  updateLeadFlowResource,
} from "@/modules/leadflow/api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export function GET() {
  return listLeadFlowResource("activities", "activities:read");
}

export async function PATCH(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return updateLeadFlowResource("activities", "activities:update", id);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return deleteLeadFlowResource("activities", "activities:delete", id);
}
