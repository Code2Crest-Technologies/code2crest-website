import type { Metadata } from "next";
import PortalShell from "@/components/portal/portal-shell";

export const metadata: Metadata = {
  title: "Code2Crest Unified Portal",
  description: "Unified SaaS dashboard for Code2Crest products.",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalShell>{children}</PortalShell>;
}
