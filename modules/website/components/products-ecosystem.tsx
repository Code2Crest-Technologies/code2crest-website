import Image from "next/image";
import ProductCard from "@/modules/website/components/product-card";
import { products } from "@/modules/portal/data/products";
import SecondaryIllustration from "@/public/images/secondary-illustration.svg";

export default function ProductsEcosystem() {
  return (
    <section id="products" className="relative scroll-mt-24 overflow-hidden">
      <div className="absolute inset-x-0 top-16 -z-10 h-72 bg-blue-600/10 blur-3xl" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
        <div className="border-t py-12 md:py-14 lg:py-16 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
          <div className="grid gap-6 pb-8 lg:grid-cols-[1fr_320px] lg:items-center">
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
              <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-blue-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-blue-200/50">
                <span className="inline-flex bg-linear-to-r from-blue-500 to-cyan-300 bg-clip-text font-semibold text-transparent">
                  Products
                </span>
              </div>

              <h2 className="pb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
                Code2Crest Ecosystem
              </h2>

              <p className="text-lg text-indigo-200/65">
                Explore Code2Crest products built for leads, projects, support,
                HR, and operations.
              </p>
            </div>

            <div className="hidden justify-end lg:flex" aria-hidden="true">
              <Image
                src={SecondaryIllustration}
                alt=""
                className="h-auto w-full max-w-xs opacity-70"
                priority={false}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
