import type { Metadata } from "next";
import PortalShell from "@/modules/portal/components/portal-shell";
import { requireCompany } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Code2Crest Hub",
  description: "Business hub for Code2Crest products.",
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const companyContext = await requireCompany();

  return (
    <PortalShell
      company={companyContext.company}
      user={{ ...companyContext.user, role: companyContext.membershipRole }}
    >
      {children}
    </PortalShell>
  );
}
