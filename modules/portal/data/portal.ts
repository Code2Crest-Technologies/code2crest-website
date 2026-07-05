import {
  FaBuilding,
  FaCreditCard,
  FaGear,
  FaGrip,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export type PortalNavigationItem = {
  name: string;
  href: string;
  icon: IconType;
};

export const portalNavigation: PortalNavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: FaGrip },
  { name: "Products", href: "/products", icon: FaLayerGroup },
  { name: "Company", href: "/company", icon: FaBuilding },
  { name: "Team", href: "/team", icon: FaUsers },
  { name: "Subscription", href: "/subscription", icon: FaCreditCard },
  { name: "Settings", href: "/settings", icon: FaGear },
];
