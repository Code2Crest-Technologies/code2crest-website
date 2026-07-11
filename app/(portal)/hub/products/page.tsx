import ProductGrid from "@/modules/portal/components/product-grid";
import { requireCompany } from "@/lib/auth/server";
import { getCompanyProductAccess } from "@/modules/products/server";

export default async function HubProductsPage() {
  const context = await requireCompany();
  const products = await getCompanyProductAccess(context.companyId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Products
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Open active Code2Crest apps, review company product access, and see
          the workflow tools queued for your workspace.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
