import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";
import FounderImage from "@/public/images/barath-rahav.jpg";

export default function AboutFounder() {
  return (
    <section id="about-founder" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -z-10 -translate-x-1/2 opacity-25"
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
        <div className="py-12 md:py-16 lg:py-20">

          {/* Heading */}
          <div className="mb-8 text-center md:mb-10">
            <h2 className="font-nacelle text-3xl font-semibold text-white md:text-4xl">
              Meet the Founder
            </h2>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr] lg:gap-12">

            {/* Founder Image */}
            <div
              className="flex justify-center"
              data-aos="fade-right"
            >
              <div className="group relative h-72 w-72 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-gray-800 to-gray-900 transition duration-300 hover:border-indigo-500/60 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)] sm:h-80 sm:w-80 lg:h-96 lg:w-96">

                <Image
                  src={FounderImage}
                  alt="Barath Rahav, founder of Code2Crest Technologies"
                  fill
                  priority
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
              </div>
            </div>

            {/* Founder Info */}
            <div data-aos="fade-left">

              <h3 className="mb-2 font-nacelle text-3xl font-semibold text-white">
                Hi, I'm Barath Rahav
              </h3>

              <p className="mb-4 text-lg font-medium text-indigo-400">
                Founder & Full-Stack Developer
              </p>

              <p className="mb-4 leading-relaxed text-indigo-200/75">
                With over 7+ years of experience in full-stack development,
                I help startups and businesses build scalable websites,
                e-commerce platforms, and custom software solutions using
                modern technologies.
              </p>

              <p className="mb-6 leading-relaxed text-indigo-200/75">
                My expertise includes React.js, Next.js, Node.js,
                MongoDB, TypeScript, and modern cloud-based solutions.
                I focus on delivering fast, scalable, and user-friendly
                digital products that help businesses grow.
              </p>

              {/* Quick Stats */}
              <div className="mb-6 grid grid-cols-3 gap-2.5 sm:gap-3">

                <div className="flex min-h-20 flex-col justify-center rounded-xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 to-blue-500/5 p-3 text-center shadow-[0_18px_45px_-35px_rgba(99,102,241,0.75)] sm:min-h-24 sm:p-4">
                  <h4 className="text-xl font-bold leading-none text-white sm:text-2xl">
                    7+
                  </h4>
                  <p className="mt-2 text-[11px] leading-tight text-slate-400 sm:text-xs">
                    Years Experience
                  </p>
                </div>

                <div className="flex min-h-20 flex-col justify-center rounded-xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 p-3 text-center shadow-[0_18px_45px_-35px_rgba(34,211,238,0.65)] sm:min-h-24 sm:p-4">
                  <h4 className="text-xl font-bold leading-none text-white sm:text-2xl">
                    30+
                  </h4>
                  <p className="mt-2 text-[11px] leading-tight text-slate-400 sm:text-xs">
                    Projects Built
                  </p>
                </div>

                <div className="flex min-h-20 flex-col justify-center rounded-xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/5 p-3 text-center shadow-[0_18px_45px_-35px_rgba(168,85,247,0.65)] sm:min-h-24 sm:p-4">
                  <h4 className="text-xl font-bold leading-none text-white sm:text-2xl">
                    100%
                  </h4>
                  <p className="mt-2 text-[11px] leading-tight text-slate-400 sm:text-xs">
                    Client Focus
                  </p>
                </div>

              </div>

              {/* Skills */}
              <div>

                <h4 className="mb-4 font-semibold text-white">
                  Core Expertise
                </h4>

                <div className="flex flex-wrap gap-2.5">
                  {[
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "MongoDB",
                    "TypeScript",
                    "Tailwind CSS",
                    "Express.js",
                    "Strapi",
                    "REST APIs",
                    "React Native",
                    "E-Commerce",
                    "SaaS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-sm text-indigo-300 transition duration-300 hover:border-indigo-400/60 hover:bg-indigo-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
