import { CompanyProductStatus, MembershipRole } from "@prisma/client";
import { getAuthContext } from "@/lib/auth/server";
import { prisma } from "@/lib/db/prisma";

export const leadFlowPermissions = [
  "contacts:read",
  "contacts:create",
  "contacts:update",
  "contacts:delete",
  "deals:read",
  "deals:create",
  "deals:update",
  "deals:delete",
  "tasks:read",
  "tasks:create",
  "tasks:update",
  "tasks:delete",
  "quotations:read",
  "quotations:create",
  "quotations:update",
  "quotations:delete",
  "notes:read",
  "notes:create",
  "notes:update",
  "notes:delete",
  "activities:read",
  "activities:create",
  "activities:update",
  "activities:delete",
  "timeline:read",
  "settings:read",
  "settings:update",
  "integrations:read",
  "integrations:update",
] as const;

export type LeadFlowPermission = (typeof leadFlowPermissions)[number];
export type ProductKey = "leadflow";

const fullAccess = [...leadFlowPermissions];

export const rolePermissions = {
  [MembershipRole.OWNER]: fullAccess,
  [MembershipRole.ADMIN]: fullAccess,
  [MembershipRole.MANAGER]: [
    "contacts:read",
    "contacts:create",
    "contacts:update",
    "contacts:delete",
    "deals:read",
    "deals:create",
    "deals:update",
    "deals:delete",
    "tasks:read",
    "tasks:create",
    "tasks:update",
    "tasks:delete",
    "quotations:read",
    "quotations:create",
    "quotations:update",
    "quotations:delete",
    "notes:read",
    "notes:create",
    "notes:update",
    "activities:read",
    "activities:create",
    "timeline:read",
  ],
  [MembershipRole.SALES]: [
    "contacts:read",
    "contacts:create",
    "contacts:update",
    "deals:read",
    "deals:create",
    "deals:update",
    "tasks:read",
    "tasks:create",
    "tasks:update",
    "quotations:read",
    "quotations:create",
    "quotations:update",
    "notes:read",
    "notes:create",
    "activities:read",
    "activities:create",
    "timeline:read",
  ],
  [MembershipRole.VIEWER]: [
    "contacts:read",
    "deals:read",
    "tasks:read",
    "quotations:read",
    "notes:read",
    "activities:read",
    "timeline:read",
  ],
} satisfies Record<MembershipRole, readonly LeadFlowPermission[]>;

export function hasPermission(
  role: MembershipRole,
  permission: LeadFlowPermission,
) {
  return (rolePermissions[role] as readonly LeadFlowPermission[]).includes(
    permission,
  );
}

export async function requireProductAccess(productKey: ProductKey) {
  const context = await getAuthContext();

  if (!context) {
    return {
      ok: false as const,
      status: 401,
      message: "Authentication required.",
    };
  }

  const access = await prisma.companyProduct.findFirst({
    where: {
      companyId: context.companyId,
      product: { key: productKey },
      status: {
        in: [CompanyProductStatus.TRIAL, CompanyProductStatus.ACTIVE],
      },
    },
    include: { product: true },
  });

  if (!access) {
    return {
      ok: false as const,
      status: 403,
      message: `Company does not have active ${productKey} access.`,
    };
  }

  return {
    ok: true as const,
    context,
    productAccess: access,
  };
}

export async function requirePermission(permission: LeadFlowPermission) {
  const productAccess = await requireProductAccess("leadflow");

  if (!productAccess.ok) {
    return productAccess;
  }

  if (!hasPermission(productAccess.context.membershipRole, permission)) {
    return {
      ok: false as const,
      status: 403,
      message: `You do not have permission to ${permission.replace(":", " ")}.`,
    };
  }

  return {
    ok: true as const,
    context: productAccess.context,
    productAccess: productAccess.productAccess,
  };
}
