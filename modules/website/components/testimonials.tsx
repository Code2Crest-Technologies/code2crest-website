import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    type: "review",
    clientName: "Bionics Enviro Tech Pvt Ltd",
    project: "Website Development",
    source: "Google Review",
    rating: 5,
    logo: {
      src: "/images/client-logos/bionics-enviro-tech.png",
      alt: "Bionics Enviro Tech logo",
      frame: "light",
      className: "p-2.5",
    },
    feedback:
      "We had a great experience working with Code2Crest Technologies for our company website development. They understood our requirements well and delivered a fast, responsive and professional website with excellent attention to performance and user experience. Highly recommended for reliable website development and technology solutions.",
  },
  {
    id: 2,
    type: "project",
    clientName: "Akshaa Nature",
    project: "Organic Cosmetics · E-Commerce Website",
    source: "Project Story",
    rating: 5,
    logo: {
      src: "/images/client-logos/akshaa-nature.png",
      alt: "Akshaa Nature logo",
      frame: "dark",
      className: "p-1.5",
    },
    feedback:
      "A digital commerce experience developed for Akshaa Nature, an organic cosmetics brand, with a focus on presenting their natural product range through a clean, customer-friendly online experience.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-24 overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[110%] opacity-25"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-64 bg-cyan-500/5 blur-3xl" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
        <div className="border-t py-12 md:py-16 lg:py-20 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-8 text-center md:pb-10">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text font-semibold text-transparent">
                Client Feedback & Projects
              </span>
            </div>
            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
              Trusted by Growing Businesses
            </h2>
            <p className="text-lg text-indigo-200/65">
              Real businesses. Real projects. Digital experiences built around their goals.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="mx-auto grid max-w-sm gap-6 sm:max-w-none md:grid-cols-2 lg:gap-6">
            {testimonials.map((testimonial, idx) => (
              <article
                key={testimonial.id}
                className="group relative flex h-full min-h-[300px] overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-[0_0_35px_-8px_rgba(99,102,241,0.45)] md:p-6"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-36 shrink-0 items-center rounded-xl ring-1 sm:h-16 sm:w-40 ${
                        testimonial.logo.frame === "light"
                          ? "bg-white/95 shadow-[0_14px_35px_-24px_rgba(255,255,255,0.8)] ring-white/20"
                          : "bg-slate-950/70 shadow-[0_14px_35px_-22px_rgba(99,102,241,0.55)] ring-indigo-400/30"
                      } ${testimonial.logo.className}`}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={testimonial.logo.src}
                          alt={testimonial.logo.alt}
                          fill
                          sizes="160px"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="h-3.5 w-3.5 text-amber-300" />
                      ))}
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="mb-4 flex items-center gap-2 text-indigo-300">
                    <FaQuoteLeft className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-200/60">
                      {testimonial.type === "review"
                        ? "Client Review"
                        : "Project Snapshot"}
                    </span>
                  </div>
                  <p className="text-base leading-7 text-slate-300 md:text-[15px]">
                    &ldquo;{testimonial.feedback}&rdquo;
                  </p>

                  {/* Client Info */}
                  <div className="mt-auto pt-6">
                    <div className="h-px w-full bg-gradient-to-r from-indigo-400/25 via-slate-400/10 to-transparent" />
                    <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                      <div>
                        <p className="font-semibold text-white">
                          {testimonial.clientName}
                        </p>
                        <p className="text-sm leading-6 text-indigo-200/65">
                          {testimonial.project}
                        </p>
                      </div>
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-300/80">
                        {testimonial.source}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
