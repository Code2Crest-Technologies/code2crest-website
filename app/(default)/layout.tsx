"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import PortalShell from "@/components/portal/portal-shell";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  if (pathname === "/products") {
    return <PortalShell>{children}</PortalShell>;
  }

  return (
    <>
      <Header />
      <main className="relative flex grow flex-col">{children}</main>

      <Footer />
    </>
  );
}
