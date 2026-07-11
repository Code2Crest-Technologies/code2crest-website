import type { Metadata } from "next";
import ProductCard from "@/modules/website/components/product-card";
import LeadFlowHighlight from "@/modules/website/components/leadflow-highlight";
import { BreadcrumbStructuredData } from "@/modules/website/components/structured-data";
import { products } from "@/modules/portal/data/products";

export const metadata: Metadata = {
  title: "Business Software and SaaS Products",
  description:
    "Explore the Code2Crest product ecosystem, including LeadFlow CRM and upcoming tools for projects, support, HR, and inventory management.",
  alternates: {
    canonical: "https://www.code2crest.com/products",
  },
  openGraph: {
    title: "Business Software and SaaS Products",
    description:
      "Explore the Code2Crest product ecosystem, including LeadFlow CRM and upcoming tools for projects, support, HR, and inventory management.",
    url: "https://www.code2crest.com/products",
    images: [
      {
        url: "https://www.code2crest.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code2Crest business software and SaaS products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Software and SaaS Products",
    description:
      "Explore the Code2Crest product ecosystem, including LeadFlow CRM and upcoming tools for projects, support, HR, and inventory management.",
    images: ["https://www.code2crest.com/og-image.png"],
  },
};

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://www.code2crest.com" },
          { name: "Products", url: "https://www.code2crest.com/products" },
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-20 -z-10 h-72 bg-blue-600/10 blur-3xl" />
        <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 md:py-16 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Code2Crest Ecosystem
            </p>
            <h1 className="mt-4 font-nacelle text-4xl font-semibold text-white md:text-5xl">
              Business Software and SaaS Products
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Explore LeadFlow CRM and upcoming Code2Crest tools for projects,
              support, HR, and inventory management.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <LeadFlowHighlight />
    </>
  );
}
