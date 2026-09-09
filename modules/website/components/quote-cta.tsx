"use client";

import { FaArrowRight } from "react-icons/fa";
import { useQuoteModal } from "@/modules/website/components/quote-modal-provider";

export default function QuoteCta() {
  const { openQuote } = useQuoteModal();

  return (
    <section id="GetQuote" className="relative scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
        <div className="border-t py-12 md:py-14 lg:py-16 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
          <div className="rounded-2xl border border-blue-500/20 bg-linear-to-br from-slate-950 via-slate-900 to-blue-950/50 p-6 text-center shadow-[0_24px_70px_-48px_rgba(37,99,235,0.75)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Have a project in mind?
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-nacelle text-3xl font-semibold text-white md:text-4xl">
              Let's discuss the right digital solution for your business.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Share what you want to build and we will help shape the right
              website, app, or software plan.
            </p>
            <button
              type="button"
              onClick={() => openQuote("bottom_cta")}
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_18px_45px_-25px_rgba(37,99,235,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Get Your Free Quote
              <FaArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
