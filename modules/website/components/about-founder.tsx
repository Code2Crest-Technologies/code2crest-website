import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";
import FounderImage from "@/public/images/barath-rahav.jpg";

export default function AboutFounder() {
  return (
    <section id="about-founder" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-16 md:py-24">

          {/* Heading */}
          <div className="mb-16 text-center">
            <h2 className="font-nacelle text-3xl font-semibold text-white md:text-4xl">
              Meet the Founder
            </h2>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* Founder Image */}
            <div
              className="flex justify-center"
              data-aos="fade-right"
            >
              <div className="group relative h-80 w-80 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-gray-800 to-gray-900 transition duration-300 hover:border-indigo-500/60 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)]">

                <Image
                  src={FounderImage}
                  alt="Barath Rahav"
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

              <p className="mb-6 text-lg font-medium text-indigo-400">
                Founder & Full-Stack Developer
              </p>

              <p className="mb-6 leading-relaxed text-indigo-200/75">
                With over 5 years of experience in full-stack development,
                I help startups and businesses build scalable websites,
                e-commerce platforms, and custom software solutions using
                modern technologies.
              </p>

              <p className="mb-8 leading-relaxed text-indigo-200/75">
                My expertise includes React.js, Next.js, Node.js,
                MongoDB, TypeScript, and modern cloud-based solutions.
                I focus on delivering fast, scalable, and user-friendly
                digital products that help businesses grow.
              </p>

              {/* Quick Stats */}
              <div className="mb-8 grid grid-cols-3 gap-4">

                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-center">
                  <h4 className="text-2xl font-bold text-white">6+</h4>
                  <p className="text-xs text-slate-400">
                    Years Experience
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-center">
                  <h4 className="text-2xl font-bold text-white">20+</h4>
                  <p className="text-xs text-slate-400">
                    Projects Built
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-center">
                  <h4 className="text-2xl font-bold text-white">100%</h4>
                  <p className="text-xs text-slate-400">
                    Client Focus
                  </p>
                </div>

              </div>

              {/* Skills */}
              <div>

                <h4 className="mb-4 font-semibold text-white">
                  Core Expertise
                </h4>

                <div className="flex flex-wrap gap-2">
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
                      className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 transition duration-300 hover:border-indigo-400/60 hover:bg-indigo-500/20"
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