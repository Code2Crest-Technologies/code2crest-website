import {
  createLeadFlowResource,
  listLeadFlowResource,
} from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("deals", "deals:read");
}

export function POST() {
  return createLeadFlowResource("deals", "deals:create");
}
