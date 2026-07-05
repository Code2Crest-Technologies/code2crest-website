import {
  listLeadFlowResource,
  updateLeadFlowResource,
} from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("settings/integrations", "settings:read");
}

export function PATCH() {
  return updateLeadFlowResource("settings/integrations", "settings:update");
}
