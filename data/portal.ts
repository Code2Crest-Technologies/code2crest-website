import {
  FaBuilding,
  FaCreditCard,
  FaGear,
  FaGrip,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export type PortalProductStatus = "Active" | "Coming Soon";

export type PortalProduct = {
  name: string;
  slug: string;
  status: PortalProductStatus;
  description: string;
  href?: string;
};

export type PortalNavigationItem = {
  name: string;
  href: string;
  icon: IconType;
};

export const portalProducts: PortalProduct[] = [
  {
    name: "LeadFlow",
    slug: "leadflow",
    status: "Active",
    description:
      "Capture leads, manage deals, track follow-ups, and open the live CRM workspace.",
    href: "https://leadflow.code2crest.com",
  },
  {
    name: "ProjectFlow",
    slug: "projectflow",
    status: "Coming Soon",
    description:
      "Plan projects, milestones, tasks, delivery updates, and client collaboration.",
  },
  {
    name: "HRFlow",
    slug: "hrflow",
    status: "Coming Soon",
    description:
      "Manage people, attendance, leave, onboarding, and internal HR workflows.",
  },
  {
    name: "SupportFlow",
    slug: "supportflow",
    status: "Coming Soon",
    description:
      "Track tickets, customer conversations, service levels, and knowledge base work.",
  },
  {
    name: "InventoryFlow",
    slug: "inventoryflow",
    status: "Coming Soon",
    description:
      "Monitor stock, purchases, sales, product movements, and operational reports.",
  },
];

export const portalNavigation: PortalNavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: FaGrip },
  { name: "Products", href: "/products", icon: FaLayerGroup },
  { name: "Company", href: "/company", icon: FaBuilding },
  { name: "Team", href: "/team", icon: FaUsers },
  { name: "Subscription", href: "/subscription", icon: FaCreditCard },
  { name: "Settings", href: "/settings", icon: FaGear },
];

export const mockUser = {
  name: "Barath Rahav",
  email: "barath@code2crest.com",
  role: "Workspace Owner",
};

export const mockCompany = {
  name: "Code2Crest Technologies",
  workspace: "Code2Crest Unified Portal",
  plan: "Founder Preview",
  members: 6,
};
