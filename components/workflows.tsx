import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
import Spotlight from "@/components/spotlight";
import { FaReact, FaRocket, FaCode, FaComments } from "react-icons/fa";

export default function Workflows() {
  const features = [
    {
      title: "Modern Web Technologies",
      description:
        "Built using React, Next.js, Node.js, MongoDB, Tailwind CSS and industry best practices.",
      icon: <FaReact className="h-8 w-8 text-indigo-400" />,
    },
    {
      title: "Scalable Business Solutions",
      description:
        "Applications designed to grow with your business, from startup MVPs to enterprise platforms.",
      icon: <FaRocket className="h-8 w-8 text-indigo-400" />,
    },
    {
      title: "Tailored Software Development",
      description:
        "Every project is customized to your business requirements, ensuring the right solution.",
      icon: <FaCode className="h-8 w-8 text-indigo-400" />,
    },
    {
      title: "Reliable Communication",
      description:
        "Transparent updates, milestone tracking and dedicated support throughout the project lifecycle.",
      icon: <FaComments className="h-8 w-8 text-indigo-400" />,
    },
  ];
  return (
    <section id="why-us" className="relative scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </div>
            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
              Why Businesses Choose Code2Crest
            </h2>
            <p className="text-lg text-indigo-200/65">
              We combine modern technologies, scalable architecture, and
              user-focused design to build solutions that help businesses grow.
            </p>
          </div>
          {/* Spotlight items */}
          <Spotlight className="group mx-auto grid max-w-sm gap-6 lg:max-w-none lg:grid-cols-2">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px
      before:pointer-events-none before:absolute before:-left-40 before:-top-40
      before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)]
      before:translate-y-[var(--mouse-y)] before:rounded-full
      before:bg-indigo-500/80 before:opacity-0 before:blur-3xl
      before:transition-opacity before:duration-500
      after:pointer-events-none after:absolute after:-left-48 after:-top-48
      after:z-30 after:h-64 after:w-64
      after:translate-x-[var(--mouse-x)]
      after:translate-y-[var(--mouse-y)]
      after:rounded-full after:bg-indigo-500
      after:opacity-0 after:blur-3xl
      after:transition-opacity after:duration-500
      hover:after:opacity-20
      group-hover:before:opacity-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="mb-2 font-nacelle text-lg font-semibold text-white">
                          {feature.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-indigo-200/65">
                          {feature.description}
                        </p>
                      </div>

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
