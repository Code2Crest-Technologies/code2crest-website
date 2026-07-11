import type { Metadata } from "next";
import PortalShell from "@/modules/portal/components/portal-shell";
import { requireCompany } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: {
    default: "Code2Crest Hub",
    template: "%s | Code2Crest Hub",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
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
