import {
  createLeadFlowResource,
  listLeadFlowResource,
} from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("activities", "activities:read");
}

export function POST() {
  return createLeadFlowResource("activities", "activities:create");
}
