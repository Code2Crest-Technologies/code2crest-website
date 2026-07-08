import { requireCompany } from "@/lib/auth/server";

export default async function SettingsPage() {
  const context = await requireCompany();
  const sections = [
    {
      title: "Account settings",
      description: "Name, email, and profile preferences for your Hub account.",
      details: [`Name: ${context.user.name}`, `Email: ${context.user.email}`],
    },
    {
      title: "Security",
      description: "Password management, active sessions, and sign-in controls.",
      details: ["Coming Soon"],
    },
    {
      title: "Notifications",
      description: "Email alerts for invites, product updates, and workspace activity.",
      details: ["Coming Soon"],
    },
    {
      title: "Product preferences",
      description: "Default product views and workspace-level product settings.",
      details: ["Coming Soon"],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage account, security, notification, and product preferences.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {section.description}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Coming Soon
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {section.details.map((detail) => (
                <p key={detail} className="text-sm font-medium text-slate-700">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
