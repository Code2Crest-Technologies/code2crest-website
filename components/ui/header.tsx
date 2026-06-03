"use client";

import { useState } from "react";
import Logo from "./logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/95 px-6 backdrop-blur-xl shadow-lg shadow-slate-950/20">

          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Services
            </a>

            <a
              href="#why-us"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Why Us
            </a>

            <a
              href="#portfolio"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <a
            href="#GetQuote"
            className="hidden md:inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Get Quote
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
            <div className="absolute left-0 top-20 w-full rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl md:hidden">

              <nav className="flex flex-col gap-5">

                <a
                  href="#services"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Services
                </a>

                <a
                  href="#why-us"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Why Us
                </a>

                <a
                  href="#portfolio"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Portfolio
                </a>

                <a
                  href="/connect"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  Connect
                </a>

                <a
                  href="#GetQuote"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 rounded-lg bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700"
                >
                  Get Quote
                </a>

              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}