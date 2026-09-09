import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";
import GetQuoteForm from "@/modules/website/components/get-quote-form";

export default function GetQuote() {
  return (
    <section id="GetQuote" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-10 left-1/2 -z-10 -translate-x-1/2 opacity-20"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt=""
        />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
        <div className="bg-linear-to-r from-transparent via-gray-800/40 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[760px]">
            <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 shadow-[0_24px_80px_-55px_rgba(99,102,241,0.75)] sm:p-6 md:p-8">
              <h2
                className="pb-4 text-center font-nacelle text-3xl font-semibold text-white md:text-4xl"
                data-aos="fade-up"
              >
                Get Your Free Quote
              </h2>

              <p
                className="mb-6 text-center text-base leading-7 text-slate-300"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                Tell us what you want to build and we will help you shape the
                right website, app, or software plan.
              </p>

              <GetQuoteForm source="legacy_inline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
