import {
  createLeadFlowResource,
  listLeadFlowResource,
} from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("quotations", "quotations:read");
}

export function POST() {
  return createLeadFlowResource("quotations", "quotations:create");
}
