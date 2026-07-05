import { requireCompany } from "@/lib/auth/server";

export default async function SettingsPage() {
  const context = await requireCompany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Mock profile and workspace settings for the portal MVP.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <p className="text-sm font-medium text-slate-500">Name</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">
            {context.user.name}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <p className="text-sm font-medium text-slate-500">Email</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">
            {context.user.email}
          </p>
        </div>
      </section>
    </div>
  );
}
