import Image from "next/image";
import {
  FaStore,
  FaUtensils,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";

import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";

const projects = [
  {
    id: 1,
    title: "Multi Vendor Marketplace",
    description:
      "Multi-vendor marketplace with seller dashboards, payment integration and order management.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    icon: <FaStore className="h-8 w-8 text-indigo-400" />,
  },
  {
    id: 2,
    title: "Restaurant Ordering System",
    description:
      "Food ordering platform with live tracking, online payments and customer management.",
    tech: ["React", "Express", "MongoDB", "Firebase"],
    icon: <FaUtensils className="h-8 w-8 text-cyan-400" />,
  },
  {
    id: 3,
    title: "School Management System",
    description:
      "Complete ERP for schools with attendance, fees, grades and parent communication.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "React"],
    icon: <FaGraduationCap className="h-8 w-8 text-green-400" />,
  },
  {
    id: 4,
    title: "ERP Dashboard",
    description:
      "Business analytics dashboard with reporting, inventory and KPI tracking.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    icon: <FaChartLine className="h-8 w-8 text-purple-400" />,
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative scroll-mt-24">
      {/* Background Effects */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Background"
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image
          src={BlurredShape}
          width={760}
          height={668}
          alt="Background"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-20 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">

          {/* Section Heading */}
          <div className="mx-auto max-w-3xl pb-14 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                Project Showcase
              </span>
            </div>

            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-white md:text-5xl">
              Solutions We've Built
            </h2>

            <p className="text-lg text-slate-400">
              Scalable digital products built using modern technologies and
              industry best practices.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid gap-8 md:grid-cols-2">

            {projects.map((project, idx) => (
              <article
  key={project.id}
  data-aos="fade-up"
  data-aos-delay={idx * 100}
  className="group relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 transition-all duration-300 hover:border-indigo-500/60 hover:shadow-[0_0_35px_-8px_rgba(99,102,241,0.45)]"
>
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

  {/* Content Row */}
  <div className="flex gap-5">

    {/* Icon */}
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10">
      {project.icon}
    </div>

    {/* Content */}
    <div className="flex-1">

      <div className="mb-2">
        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
          Production Ready
        </span>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-white">
        {project.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <span className="text-sm font-medium text-indigo-400 transition group-hover:text-indigo-300">
        View Details →
      </span>

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