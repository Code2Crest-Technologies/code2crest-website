import { getPortalHref } from "@/lib/config/public-url";

export type ProductStatus = "Active / Launching Soon" | "Coming Soon";

export type Product = {
  name: string;
  slug: string;
  status: ProductStatus;
  description: string;
  cta: string;
  href?: string;
};

export const products: Product[] = [
  {
    name: "LeadFlow",
    slug: "leadflow",
    status: "Active / Launching Soon",
    description:
      "CRM for small businesses to manage leads, contacts, deals, quotations, tasks, and WhatsApp follow-ups.",
    cta: "Open LeadFlow",
    href: getPortalHref("/products"),
  },
  {
    name: "ProjectFlow",
    slug: "projectflow",
    status: "Coming Soon",
    description:
      "Project management system for clients, tasks, milestones, invoices, and team collaboration.",
    cta: "Join Waitlist",
  },
  {
    name: "HRFlow",
    slug: "hrflow",
    status: "Coming Soon",
    description:
      "HR management system for employees, attendance, leave, payroll, and internal workflows.",
    cta: "Join Waitlist",
  },
  {
    name: "SupportFlow",
    slug: "supportflow",
    status: "Coming Soon",
    description:
      "Helpdesk system for tickets, customer support, knowledge base, and chat management.",
    cta: "Join Waitlist",
  },
  {
    name: "InventoryFlow",
    slug: "inventoryflow",
    status: "Coming Soon",
    description:
      "Inventory and stock management system for products, purchases, sales, and reports.",
    cta: "Join Waitlist",
  },
];

export const leadFlowFeatures = [
  "Lead and contact management",
  "Deal pipeline tracking",
  "Task reminders and follow-ups",
  "Quotation creation",
  "WhatsApp quick actions",
  "Team member access",
];
