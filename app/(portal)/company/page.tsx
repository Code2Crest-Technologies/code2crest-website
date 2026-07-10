import { requireCompany } from "@/lib/auth/server";
import CompanyProfileForm from "@/modules/portal/components/company-profile-form";

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function CompanyPage() {
  const context = await requireCompany();
  const canEdit =
    context.membershipRole === "OWNER" || context.membershipRole === "ADMIN";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Company
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Review your company workspace details and business profile.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          ["Company Name", context.company.name],
          ["Workspace Slug", context.company.slug],
          ["Owner", context.company.owner?.name ?? context.user.name],
          ["Status", context.company.status ?? "ACTIVE"],
          ["Created", formatDate(context.company.createdAt)],
          ["Plan", context.company.plan],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
          >
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-3 text-lg font-semibold text-slate-950">{value}</p>
          </div>
        ))}
      </section>

      <CompanyProfileForm company={context.company} canEdit={canEdit} />
    </div>
  );
}
