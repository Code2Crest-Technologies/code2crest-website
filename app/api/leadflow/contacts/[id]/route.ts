import {
  deleteLeadFlowResource,
  listLeadFlowResource,
  updateLeadFlowResource,
} from "@/modules/leadflow/api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export function GET() {
  return listLeadFlowResource("contacts", "contacts:read");
}

export async function PATCH(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return updateLeadFlowResource("contacts", "contacts:update", id);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return deleteLeadFlowResource("contacts", "contacts:delete", id);
}
