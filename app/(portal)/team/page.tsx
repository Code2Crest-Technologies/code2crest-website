import TeamManager from "@/modules/portal/components/team-manager";

export default function TeamPage() {
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

      <TeamManager />
    </div>
  );
}
