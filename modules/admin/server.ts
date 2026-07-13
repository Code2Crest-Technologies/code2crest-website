import {
  CompanyProductStatus,
  ProductStatus,
  SubscriptionStatus,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { createAuditLog } from "@/lib/audit/log";

export async function getAdminDashboardData() {
  const [
    totalCompanies,
    totalUsers,
    activeTrials,
    activeSubscriptions,
    leadFlowEnabledCompanies,
    recentUsers,
    companies,
  ] = await Promise.all([
    prisma.company.count(),
    prisma.user.count(),
    prisma.subscription.count({ where: { status: SubscriptionStatus.TRIALING } }),
    prisma.subscription.count({ where: { status: SubscriptionStatus.ACTIVE } }),
    prisma.companyProduct.count({
      where: {
        product: { key: "leadflow" },
        status: { in: [CompanyProductStatus.TRIAL, CompanyProductStatus.ACTIVE] },
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    prisma.company.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        owner: { select: { name: true, email: true } },
        subscription: true,
        products: { include: { product: true } },
      },
    }),
  ]);

  return {
    metrics: {
      totalCompanies,
      totalUsers,
      activeTrials,
      activeSubscriptions,
      leadFlowEnabledCompanies,
    },
    recentUsers,
    companies,
  };
}

export async function runAdminCompanyAction(input: {
  actorId: string;
  companyId: string;
  action: "extend_trial" | "activate_company" | "suspend_company" | "grant_leadflow" | "revoke_leadflow";
  ip?: string | null;
  userAgent?: string | null;
}) {
  const company = await prisma.company.findUnique({
    where: { id: input.companyId },
    include: { subscription: true },
  });

  if (!company) {
    return { ok: false as const, status: 404, message: "Company not found." };
  }

  if (input.action === "extend_trial") {
    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    const subscription = await prisma.subscription.update({
      where: { companyId: input.companyId },
      data: { trialEndsAt, currentPeriodEnd: trialEndsAt },
    });
    await createAuditLog({
      action: "SUBSCRIPTION_CHANGED",
      actorId: input.actorId,
      companyId: input.companyId,
      entityType: "Subscription",
      entityId: subscription.id,
      metadata: { action: input.action, trialEndsAt: trialEndsAt.toISOString() },
      ip: input.ip,
      userAgent: input.userAgent,
    });
  }

  if (input.action === "activate_company" || input.action === "suspend_company") {
    await prisma.company.update({
      where: { id: input.companyId },
      data: { status: input.action === "activate_company" ? "ACTIVE" : "SUSPENDED" },
    });
  }

  if (input.action === "grant_leadflow" || input.action === "revoke_leadflow") {
    const product = await prisma.product.upsert({
      where: { key: "leadflow" },
      update: { status: ProductStatus.ACTIVE },
      create: {
        key: "leadflow",
        name: "LeadFlow",
        description: "LeadFlow CRM",
        status: ProductStatus.ACTIVE,
        appUrl: "https://leadflow.code2crest.com",
        sortOrder: 1,
      },
    });

    await prisma.companyProduct.upsert({
      where: { companyId_productId: { companyId: input.companyId, productId: product.id } },
      update: {
        status:
          input.action === "grant_leadflow"
            ? CompanyProductStatus.ACTIVE
            : CompanyProductStatus.SUSPENDED,
        activatedAt: input.action === "grant_leadflow" ? new Date() : null,
      },
      create: {
        companyId: input.companyId,
        productId: product.id,
        status:
          input.action === "grant_leadflow"
            ? CompanyProductStatus.ACTIVE
            : CompanyProductStatus.SUSPENDED,
        activatedAt: input.action === "grant_leadflow" ? new Date() : null,
      },
    });
  }

  await createAuditLog({
    action: "ADMIN_ACTION",
    actorId: input.actorId,
    companyId: input.companyId,
    entityType: "Company",
    entityId: input.companyId,
    metadata: { action: input.action },
    ip: input.ip,
    userAgent: input.userAgent,
  });

  return { ok: true as const, status: 200 };
}
