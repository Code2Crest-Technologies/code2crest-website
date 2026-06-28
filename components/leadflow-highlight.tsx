import { FaArrowRight, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import { leadFlowFeatures } from "@/data/products";

export default function LeadFlowHighlight() {
  return (
    <section id="leadflow" className="relative scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-950 via-slate-900 to-blue-950/50 p-6 shadow-[0_30px_90px_-50px_rgba(37,99,235,0.9)] md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div data-aos="fade-up">
              <span className="mb-4 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                Featured product
              </span>

              <h2 className="pb-5 font-nacelle text-3xl font-semibold text-white md:text-4xl">
                LeadFlow &mdash; CRM for Small Businesses
              </h2>

              <p className="text-lg leading-relaxed text-slate-300">
                LeadFlow helps businesses capture, organize, and follow up with
                leads from one simple dashboard. Manage contacts, deals, tasks,
                quotations, and WhatsApp conversations without losing track of
                opportunities.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-25px_rgba(37,99,235,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Book a Demo
                  <FaArrowRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href="https://leadflow.code2crest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-200 transition duration-300 hover:border-blue-300/60 hover:bg-blue-500/20 hover:text-white"
                >
                  Open LeadFlow
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay={150}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">LeadFlow workspace</p>
                  <h3 className="font-nacelle text-xl font-semibold text-white">
                    Sales pipeline toolkit
                  </h3>
                </div>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                  Launching soon
                </span>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {leadFlowFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-slate-700/60 bg-slate-950/60 p-3 text-sm text-slate-200"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                      <FaCheck className="h-2.5 w-2.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
