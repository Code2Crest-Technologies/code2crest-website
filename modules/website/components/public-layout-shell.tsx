"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "@/modules/website/components/ui/header";
import Footer from "@/modules/website/components/ui/footer";
import ScrollToTop from "@/modules/website/components/ui/scroll-to-top";

export default function PublicLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <>
      <Header />
      <main className="relative flex grow flex-col">{children}</main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
