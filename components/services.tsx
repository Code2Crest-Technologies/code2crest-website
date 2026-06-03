import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import {
  FaGlobe,
  FaShoppingCart,
  FaReact,
  FaMobileAlt,
  FaPlug,
  FaCogs,
} from "react-icons/fa";

export default function Services() {
  const services = [
  {
    title: "Web Development",
    description:
      "Responsive, fast, and SEO-friendly websites built with modern technologies.",
    icon: <FaGlobe className="h-7 w-7 text-indigo-400" />,
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Custom online stores with payment integration, product management, and order tracking.",
    icon: <FaShoppingCart className="h-7 w-7 text-indigo-400" />,
  },
  {
    title: "React & Next.js Applications",
    description:
      "High-performance frontend applications with modern UI and excellent user experience.",
    icon: <FaReact className="h-7 w-7 text-indigo-400" />,
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications for Android and iOS using React Native.",
    icon: <FaMobileAlt className="h-7 w-7 text-indigo-400" />,
  },
  {
    title: "API Integration",
    description:
      "Secure integration of payment gateways, SMS, email and third-party services.",
    icon: <FaPlug className="h-7 w-7 text-indigo-400" />,
  },
  {
    title: "Custom Software Solutions",
    description:
      "Tailor-made software systems built specifically for your business requirements.",
    icon: <FaCogs className="h-7 w-7 text-indigo-400" />,
  },
];
  return (
    <section id="services" className="relative scroll-mt-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
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
        <div className="border-t pt-6 pb-12 md:pt-8 md:pb-20 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent font-semibold">
                Our Services
              </span>
            </div>
            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
              Solutions Designed for Modern Businesses
            </h2>
            <p className="text-lg text-indigo-200/65">
              We build scalable websites, web applications, e-commerce
              platforms, and custom software solutions that help businesses grow
              online.
            </p>
          </div>
          {/* Items */}
          <div className="mx-auto grid max-w-sm gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">

  {services.map((service, index) => (
    <article
      key={service.title}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="group relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-[0_0_35px_-10px_rgba(99,102,241,0.4)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-indigo-600/0 group-hover:from-indigo-600/10 group-hover:to-indigo-600/5 transition duration-300" />

      <div className="relative z-10 flex gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
          {service.icon}
        </div>

        <div>
          <h3 className="mb-2 font-nacelle text-lg font-semibold text-white">
            {service.title}
          </h3>

          <p className="text-sm leading-relaxed text-indigo-200/65">
            {service.description}
          </p>
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
