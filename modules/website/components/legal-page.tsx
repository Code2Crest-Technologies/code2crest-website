import Link from "next/link";
import { LEGAL_LAST_UPDATED } from "@/lib/legal/constants";
import type { LegalPageContent } from "@/modules/website/data/legal-pages";

type LegalPageProps = {
  content: LegalPageContent;
};

export default function LegalPage({ content }: LegalPageProps) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
            Legal
          </p>
          <h1 className="mt-4 font-nacelle text-4xl font-semibold text-white sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
            {content.intro}
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Last updated:{" "}
            <time dateTime="2026-07-19">{LEGAL_LAST_UPDATED}</time>
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-label={`${content.title} sections`}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
            >
              <h2 className="text-sm font-semibold text-white">On this page</h2>
              <ol className="mt-4 space-y-2 text-sm">
                {content.sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="block rounded-lg px-2 py-1.5 text-slate-400 transition hover:bg-slate-900 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="rounded-2xl border border-slate-800 bg-slate-950/75 p-5 shadow-2xl shadow-slate-950/30 sm:p-7 lg:p-9">
            <div className="mb-8 rounded-xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
              These pages provide a practical trust and legal foundation for
              Code2Crest Technologies. They should be reviewed by qualified
              legal counsel before relying on them as final legal terms.
            </div>

            <div className="space-y-9">
              {content.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="font-nacelle text-2xl font-semibold text-white">
                    {section.title}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-base leading-8 text-slate-300"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.items ? (
                    <ul className="mt-4 space-y-3 text-base leading-7 text-slate-300">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
