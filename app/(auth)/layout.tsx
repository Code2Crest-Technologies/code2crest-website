import type { Metadata } from "next";

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

export default function PortalAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-slate-100">{children}</main>;
}
