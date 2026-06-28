import { mockCompany } from "@/data/portal";

export default function CompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Company
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Mock company profile for the MVP portal experience.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          ["Company Name", mockCompany.name],
          ["Workspace", mockCompany.workspace],
          ["Plan", mockCompany.plan],
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
    </div>
  );
}
