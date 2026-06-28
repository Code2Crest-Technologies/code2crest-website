import ProductCard from "@/components/product-card";
import { products } from "@/data/products";

export default function ProductsEcosystem() {
  return (
    <section id="products" className="relative scroll-mt-24 overflow-hidden">
      <div className="absolute inset-x-0 top-16 -z-10 h-72 bg-blue-600/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-16 md:py-20 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-blue-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-blue-200/50">
              <span className="inline-flex bg-linear-to-r from-blue-500 to-cyan-300 bg-clip-text font-semibold text-transparent">
                Products
              </span>
            </div>

            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
              Code2Crest Ecosystem
            </h2>

            <p className="text-lg text-indigo-200/65">
              One company. Multiple business tools. Built to help growing teams
              manage leads, projects, support, HR, and operations from one
              connected platform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
