import ProductGrid from "@/modules/portal/components/product-grid";
import { requireCompany } from "@/lib/auth/server";
import { getCompanyProductAccess } from "@/modules/products/server";

const productReasonMessages: Record<string, { title: string; body: string }> = {
  product_unavailable: {
    title: "LeadFlow is not available for launch.",
    body: "The product is currently unavailable. Please check your product access or contact Code2Crest support.",
  },
  product_access_required: {
    title: "LeadFlow access is not enabled.",
    body: "Review your product access or subscription options to enable LeadFlow for this workspace.",
  },
};

type HubProductsPageProps = {
  searchParams?: Promise<{ reason?: string }>;
};

export default async function HubProductsPage({
  searchParams,
}: HubProductsPageProps) {
  const context = await requireCompany();
  const products = await getCompanyProductAccess(context.companyId);
  const isInternalPlatformAdmin = context.user.platformRole === "PLATFORM_ADMIN";
  const params = await searchParams;
  const reasonMessage =
    !isInternalPlatformAdmin && params?.reason
      ? productReasonMessages[params.reason]
      : null;

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

      {reasonMessage ? (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <p className="text-base font-semibold text-slate-950">
            {reasonMessage.title}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
            {reasonMessage.body}
          </p>
        </section>
      ) : null}

      <ProductGrid
        products={products}
        isInternalPlatformAdmin={isInternalPlatformAdmin}
      />
    </div>
  );
}
