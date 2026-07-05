import {
  createLeadFlowResource,
  listLeadFlowResource,
} from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("tasks", "tasks:read");
}

export function POST() {
  return createLeadFlowResource("tasks", "tasks:create");
}
