import { listLeadFlowResource } from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("timeline", "timeline:read");
}
