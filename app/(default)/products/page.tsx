import ProductGrid from "@/components/portal/product-grid";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Products
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The Code2Crest product suite in one place, with LeadFlow active and
          the next workflow products queued for release.
        </p>
      </div>

      <ProductGrid />
    </div>
  );
}
