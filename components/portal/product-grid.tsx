import { FaArrowUpRightFromSquare, FaClock, FaCircleCheck } from "react-icons/fa6";
import { portalProducts } from "@/data/portal";

type ProductGridProps = {
  compact?: boolean;
};

export default function ProductGrid({ compact = false }: ProductGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {portalProducts.map((product) => {
        const isActive = product.status === "Active";

        return (
          <article
            key={product.slug}
            className="flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {isActive ? "Available now" : "Planned product"}
                </p>
              </div>

              <span
                className={
                  isActive
                    ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200"
                    : "inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
                }
              >
                {isActive ? (
                  <FaCircleCheck className="h-3 w-3" />
                ) : (
                  <FaClock className="h-3 w-3" />
                )}
                {product.status}
              </span>
            </div>

            <p className="flex-1 text-sm leading-6 text-slate-600">
              {product.description}
            </p>

            {isActive && product.href ? (
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Open App
                <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-6 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-400"
              >
                Coming Soon
              </button>
            )}

            {!compact ? (
              <div className="mt-4 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                code2crest.com/{product.slug}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
