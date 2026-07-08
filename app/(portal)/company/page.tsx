import { requireCompany } from "@/lib/auth/server";

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
  const profileFields = [
    ["Website", "Profile editing coming soon"],
    ["Phone", "Profile editing coming soon"],
    ["Address", "Profile editing coming soon"],
    ["GSTIN", "Profile editing coming soon"],
  ];

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
          ["Status", "Active"],
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

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Business Profile
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Profile editing coming soon. These fields are reserved for company
              billing and customer-facing product settings.
            </p>
          </div>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Coming Soon
          </span>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {profileFields.map(([label, value]) => (
            <div key={label} className="rounded-md border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-sm font-semibold text-slate-700">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
