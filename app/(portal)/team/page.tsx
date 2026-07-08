import TeamManager from "@/modules/portal/components/team-manager";

export default function TeamPage() {
  const roles = [
    ["Owner", "Full account, billing, product, and team control."],
    ["Admin", "Manage products, settings, and team access."],
    ["Manager", "Manage sales workflows and operational activity."],
    ["Sales", "Work with contacts, deals, tasks, and follow-ups."],
    ["Viewer", "Read-only visibility across assigned workspace data."],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Team
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Invite teammates, manage roles, and control company workspace access.
        </p>
      </div>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {roles.map(([role, description]) => (
          <div
            key={role}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70"
          >
            <h2 className="text-sm font-semibold text-slate-950">{role}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {description}
            </p>
          </div>
        ))}
      </section>

      <TeamManager />
    </div>
  );
}
