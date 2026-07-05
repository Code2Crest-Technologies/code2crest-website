import {
  listLeadFlowResource,
  updateLeadFlowResource,
} from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("settings/integrations", "integrations:read");
}

export function PATCH() {
  return updateLeadFlowResource(
    "settings/integrations",
    "integrations:update",
  );
}
