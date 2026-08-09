import { FaArrowUpRightFromSquare, FaClock, FaCircleCheck } from "react-icons/fa6";
import { CompanyProductStatus, ProductStatus } from "@prisma/client";
import type { ProductAccessView } from "@/modules/products/server";

type ProductGridProps = {
  compact?: boolean;
  products: ProductAccessView[];
  isInternalPlatformAdmin?: boolean;
};

function formatStatus(status: ProductStatus) {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatAccessStatus(status: CompanyProductStatus) {
  return status
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getProductLaunchUrl(product: ProductAccessView) {
  if (product.key === "leadflow") {
    return "/api/products/leadflow/launch";
  }

  return product.appUrl;
}

function getProductDomain(productKey: string) {
  return `${productKey}.code2crest.com`;
}

function getProductCategory(productKey: string) {
  const categories: Record<string, string> = {
    leadflow: "CRM",
    projectflow: "Projects",
    hrflow: "People Ops",
    supportflow: "Support",
    inventoryflow: "Operations",
  };

  return categories[productKey] ?? "Business Tool";
}

function isTrialExpired(product: ProductAccessView) {
  return (
    product.access?.status === CompanyProductStatus.TRIAL &&
    Boolean(product.access.trialEndsAt) &&
    new Date(product.access.trialEndsAt as Date) < new Date()
  );
}

function getAccessLabel(
  product: ProductAccessView,
  isInternalPlatformAdmin: boolean,
) {
  if (isInternalPlatformAdmin && product.key === "leadflow") {
    return "Internal Access";
  }

  if (!product.access) {
    return product.status === ProductStatus.ACTIVE
      ? "Access Required"
      : "Coming Soon";
  }

  if (isTrialExpired(product)) {
    return "Trial Expired";
  }

  return formatAccessStatus(product.access.status);
}

function getProductAction(
  product: ProductAccessView,
  isInternalPlatformAdmin: boolean,
) {
  const isAvailable = product.status === ProductStatus.ACTIVE;
  const access = product.access;
  const trialExpired = isTrialExpired(product);
  const canLaunch =
    product.key === "leadflow" &&
    isAvailable &&
    (isInternalPlatformAdmin ||
      (access?.status === CompanyProductStatus.ACTIVE ||
        (access?.status === CompanyProductStatus.TRIAL && !trialExpired)));

  if (canLaunch) {
    return {
      href: getProductLaunchUrl(product),
      label: "Open App",
      primary: true,
      disabled: false,
      newTab: true,
    };
  }

  if (product.key === "leadflow" && trialExpired) {
    return {
      href: "/subscription?reason=leadflow_trial_expired",
      label: "View Plans",
      primary: false,
      disabled: false,
      newTab: false,
    };
  }

  if (
    product.key === "leadflow" &&
    (access?.status === CompanyProductStatus.SUSPENDED ||
      access?.status === CompanyProductStatus.CANCELLED ||
      access?.status === CompanyProductStatus.EXPIRED)
  ) {
    return {
      href: "/subscription?reason=subscription_suspended",
      label: "Manage Subscription",
      primary: false,
      disabled: false,
      newTab: false,
    };
  }

  return {
    href: null,
    label: isAvailable ? "Access Required" : "Coming Soon",
    primary: false,
    disabled: true,
    newTab: false,
  };
}

export default function ProductGrid({
  compact = false,
  products,
  isInternalPlatformAdmin = false,
}: ProductGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const isAvailable = product.status === ProductStatus.ACTIVE;
        const access = product.access;
        const action = getProductAction(product, isInternalPlatformAdmin);
        const accessLabel = getAccessLabel(product, isInternalPlatformAdmin);

        return (
          <article
            key={product.key}
            className="flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {accessLabel}
                </p>
              </div>

              <span
                className={
                  isAvailable
                    ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200"
                    : "inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
                }
              >
                {isAvailable ? (
                  <FaCircleCheck className="h-3 w-3" />
                ) : (
                  <FaClock className="h-3 w-3" />
                )}
                {formatStatus(product.status)}
              </span>
            </div>

            <p className="flex-1 text-sm leading-6 text-slate-600">
              {product.description}
            </p>

            <dl className="mt-5 grid gap-2 text-xs text-slate-500">
              <div className="flex items-center justify-between gap-3">
                <dt className="font-semibold text-slate-600">Category</dt>
                <dd>{getProductCategory(product.key)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="font-semibold text-slate-600">Company access</dt>
                <dd>{accessLabel}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="font-semibold text-slate-600">Domain</dt>
                <dd>{getProductDomain(product.key)}</dd>
              </div>
            </dl>

            {!action.disabled && action.href ? (
              <a
                href={action.href}
                target={action.newTab ? "_blank" : undefined}
                rel={action.newTab ? "noopener noreferrer" : undefined}
                className={
                  action.primary
                    ? "mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                    : "mt-6 inline-flex h-10 items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                }
              >
                {action.label}
                {action.newTab ? <FaArrowUpRightFromSquare className="h-3.5 w-3.5" /> : null}
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-6 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-400"
              >
                {action.label}
              </button>
            )}

            {!compact ? (
              <div className="mt-4 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                {getProductDomain(product.key)}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
