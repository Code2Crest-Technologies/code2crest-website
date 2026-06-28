import { FaArrowRight, FaBoxOpen, FaHeadset, FaProjectDiagram, FaUsers, FaWhatsapp } from "react-icons/fa";
import type { Product } from "@/data/products";

const productIcons = {
  leadflow: FaWhatsapp,
  projectflow: FaProjectDiagram,
  hrflow: FaUsers,
  supportflow: FaHeadset,
  inventoryflow: FaBoxOpen,
};

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const Icon = productIcons[product.slug as keyof typeof productIcons] ?? FaBoxOpen;
  const isExternal = Boolean(product.href);
  const href = product.href ?? "/#contact";

  return (
    <article
      id={product.slug}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-950/80 p-6 shadow-[0_20px_60px_-35px_rgba(37,99,235,0.65)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-[0_26px_70px_-35px_rgba(37,99,235,0.8)]"
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-transparent to-cyan-400/5 opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
            <Icon className="h-6 w-6 text-blue-300" />
          </div>

          <span
            className={
              product.status === "Active / Launching Soon"
                ? "rounded-full border border-green-400/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300"
                : "rounded-full border border-slate-500/30 bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-300"
            }
          >
            {product.status}
          </span>
        </div>

        <h3 className="mb-3 font-nacelle text-xl font-semibold text-white">
          {product.name}
        </h3>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-300">
          {product.description}
        </p>

        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-white"
        >
          {product.cta}
          <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}
