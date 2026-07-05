export const membershipRoles = [
  "OWNER",
  "ADMIN",
  "MANAGER",
  "SALES",
  "VIEWER",
] as const;


export const membershipRoleLabels: Record<MembershipRole, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  MANAGER: "Manager",
  SALES: "Sales",
  VIEWER: "Viewer",
};

export const inviteRoles = [
  "OWNER",
  "ADMIN",
  "MANAGER",
  "SALES",
  "VIEWER",
] as const;

export const allRoles = [
  "OWNER",
  "ADMIN",
  "MANAGER",
  "SALES",
  "VIEWER",
] as const;

export type MembershipRole = (typeof inviteRoles)[number];