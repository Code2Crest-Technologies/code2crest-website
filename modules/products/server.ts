import {
  CompanyProductStatus,
  ProductStatus,
  type Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export const DEFAULT_PRODUCTS = [
  {
    key: "leadflow",
    name: "LeadFlow",
    description:
      "Capture leads, manage deals, track follow-ups, and open the live CRM workspace.",
    status: ProductStatus.ACTIVE,
    appUrl: "https://leadflow.code2crest.com",
    sortOrder: 1,
  },
  {
    key: "projectflow",
    name: "ProjectFlow",
    description:
      "Plan projects, milestones, tasks, delivery updates, and client collaboration.",
    status: ProductStatus.COMING_SOON,
    appUrl: null,
    sortOrder: 2,
  },
  {
    key: "hrflow",
    name: "HRFlow",
    description:
      "Manage people, attendance, leave, onboarding, and internal HR workflows.",
    status: ProductStatus.COMING_SOON,
    appUrl: null,
    sortOrder: 3,
  },
  {
    key: "supportflow",
    name: "SupportFlow",
    description:
      "Track tickets, customer conversations, service levels, and knowledge base work.",
    status: ProductStatus.COMING_SOON,
    appUrl: null,
    sortOrder: 4,
  },
  {
    key: "inventoryflow",
    name: "InventoryFlow",
    description:
      "Monitor stock, purchases, sales, product movements, and operational reports.",
    status: ProductStatus.COMING_SOON,
    appUrl: null,
    sortOrder: 5,
  },
] satisfies Prisma.ProductUncheckedCreateInput[];

export type ProductAccessView = {
  id: string;
  key: string;
  name: string;
  description: string;
  status: ProductStatus;
  appUrl: string | null;
  access: {
    status: CompanyProductStatus;
    trialEndsAt: Date | null;
    activatedAt: Date | null;
  } | null;
};

export async function ensureDefaultProducts() {
  await Promise.all(
    DEFAULT_PRODUCTS.map((product) =>
      prisma.product.upsert({
        where: { key: product.key },
        update: {
          name: product.name,
          description: product.description,
          status: product.status,
          appUrl: product.appUrl,
          sortOrder: product.sortOrder,
        },
        create: product,
      }),
    ),
  );
}

export async function getProducts() {
  await ensureDefaultProducts();

  return prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getCompanyProductAccess(companyId: string) {
  await ensureDefaultProducts();

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      companies: {
        where: { companyId },
        select: {
          status: true,
          trialEndsAt: true,
          activatedAt: true,
        },
      },
    },
  });

  return products.map((product) => ({
    id: product.id,
    key: product.key,
    name: product.name,
    description: product.description,
    status: product.status,
    appUrl: product.appUrl,
    access: product.companies[0] ?? null,
  })) satisfies ProductAccessView[];
}

export async function createLeadFlowTrialAccess(companyId: string) {
  await ensureDefaultProducts();

  const leadFlow = await prisma.product.findUniqueOrThrow({
    where: { key: "leadflow" },
  });
  const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  return prisma.companyProduct.upsert({
    where: {
      companyId_productId: {
        companyId,
        productId: leadFlow.id,
      },
    },
    update: {},
    create: {
      companyId,
      productId: leadFlow.id,
      status: CompanyProductStatus.TRIAL,
      trialEndsAt,
    },
  });
}

export async function activateCompanyProduct(companyId: string, productKey: string) {
  await ensureDefaultProducts();

  if (productKey !== "leadflow") {
    return {
      ok: false,
      status: 400,
      message: "Only LeadFlow can be activated right now.",
    };
  }

  const product = await prisma.product.findUnique({
    where: { key: productKey },
  });

  if (!product || product.status !== ProductStatus.ACTIVE) {
    return {
      ok: false,
      status: 404,
      message: "Product is not available for activation.",
    };
  }

  const companyProduct = await prisma.companyProduct.upsert({
    where: {
      companyId_productId: {
        companyId,
        productId: product.id,
      },
    },
    update: {
      status: CompanyProductStatus.ACTIVE,
      activatedAt: new Date(),
    },
    create: {
      companyId,
      productId: product.id,
      status: CompanyProductStatus.ACTIVE,
      activatedAt: new Date(),
    },
    include: { product: true },
  });

  return {
    ok: true,
    status: 200,
    companyProduct,
  };
}
