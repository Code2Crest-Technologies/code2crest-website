export type PortalPlan = "TRIAL" | "STARTER" | "GROWTH" | "BUSINESS";
export type LimitValue = number | "unlimited";

export const portalPlanConfig = {
  TRIAL: {
    label: "Trial",
    description: "Beta workspace for validating Code2Crest Hub and LeadFlow.",
    limits: { users: 2, contacts: 100 },
  },
  STARTER: {
    label: "Starter",
    description: "For small teams starting with customer operations.",
    limits: { users: 3, contacts: 500 },
  },
  GROWTH: {
    label: "Growth",
    description: "For growing teams with larger sales workflows.",
    limits: { users: 10, contacts: 5000 },
  },
  BUSINESS: {
    label: "Business",
    description: "Custom limits for established operations.",
    limits: { users: "unlimited", contacts: "unlimited" },
  },
} satisfies Record<
  PortalPlan,
  {
    label: string;
    description: string;
    limits: { users: LimitValue; contacts: LimitValue };
  }
>;
