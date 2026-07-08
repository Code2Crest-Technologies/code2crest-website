import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code2Crest Hub Access",
  description: "Login and registration screens for Code2Crest Hub.",
};

export default function PortalAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-slate-100">{children}</main>;
}
