const { PrismaClient, ProductStatus } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString =
  process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/code2crest";
const prisma = new PrismaClient({ adapter: new PrismaPg(connectionString) });

const products = [
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
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { key: product.key },
      update: product,
      create: product,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
