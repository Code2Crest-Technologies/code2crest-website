import { requireCompany } from "@/lib/auth/server";
import SettingsPanel from "@/modules/portal/components/settings-panel";

export default async function SettingsPage() {
  const context = await requireCompany();

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

      <SettingsPanel user={context.user} />
    </div>
  );
}
