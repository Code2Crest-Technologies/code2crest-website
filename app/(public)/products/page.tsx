import PortalShell from "@/modules/portal/components/portal-shell";
import ProductGrid from "@/modules/portal/components/product-grid";
import { requireCompany } from "@/lib/auth/server";
import { getCompanyProductAccess } from "@/modules/products/server";

export default async function ProductsPage() {
  const context = await requireCompany();
  const products = await getCompanyProductAccess(context.companyId);

  return (
    <PortalShell
      company={context.company}
      user={{ ...context.user, role: context.membershipRole }}
    >
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

        <ProductGrid products={products} />
      </div>
    </PortalShell>
  );
}
