"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { getPortalHref } from "@/lib/config/public-url";
import { useQuoteModal } from "@/modules/website/components/quote-modal-provider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openQuote } = useQuoteModal();
  const pathname = usePathname();
  const productsHref = pathname === "/products" ? "/products" : "/#products";
  const hubLoginHref = getPortalHref("/login");

  return (
    <header className="sticky top-0 z-50 py-2 md:py-3">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
        <div className="relative flex h-16 items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/95 px-4 shadow-lg shadow-slate-950/20 backdrop-blur-xl sm:px-5">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="/#services"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Services
            </a>

            <a
              href={productsHref}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Products
            </a>

            <a
              href="/#why-us"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Why Us
            </a>

            <a
              href="/#portfolio"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Portfolio
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => openQuote("navbar")}
            className="hidden h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 md:inline-flex"
          >
            Get Quote
          </button>

          <a
            href={hubLoginHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center justify-center rounded-lg border border-slate-700 px-4 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white md:inline-flex"
          >
            Hub Login
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute left-0 top-20 w-full rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl md:hidden">
              <nav className="flex flex-col gap-5">
                <a
                  href="/#services"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Services
                </a>

                <a
                  href={productsHref}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Products
                </a>

                <a
                  href="/#why-us"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Why Us
                </a>

                <a
                  href="/#portfolio"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Portfolio
                </a>

                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Contact
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openQuote("mobile_nav");
                  }}
                  className="mt-3 rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
                >
                  Get Quote
                </button>

                <a
                  href={hubLoginHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-slate-700 px-4 py-3 text-center font-semibold text-slate-200 hover:border-blue-500 hover:text-white"
                >
                  Hub Login
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
