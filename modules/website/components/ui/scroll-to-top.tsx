"use client";

import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed bottom-24 right-7 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-400/40 bg-slate-950/90 text-blue-200 shadow-[0_18px_45px_-22px_rgba(37,99,235,0.95)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:bottom-28 sm:right-8 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <FaChevronUp className="h-4 w-4" />
    </button>
  );
}
