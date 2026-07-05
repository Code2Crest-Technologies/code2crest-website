import {
  createLeadFlowResource,
  listLeadFlowResource,
} from "@/modules/leadflow/api";

export function GET() {
  return listLeadFlowResource("contacts", "contacts:read");
}

export function POST() {
  return createLeadFlowResource("contacts", "contacts:create", "contacts");
}
