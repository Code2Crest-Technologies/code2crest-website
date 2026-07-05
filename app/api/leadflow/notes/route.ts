import {
  createLeadFlowResource,
  listLeadFlowResource,
} from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("notes", "notes:read");
}

export function POST() {
  return createLeadFlowResource("notes", "notes:create");
}
