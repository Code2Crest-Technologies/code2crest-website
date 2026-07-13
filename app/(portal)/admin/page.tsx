import { requirePlatformAdmin } from "@/lib/auth/server";
import { getAdminDashboardData } from "@/modules/admin/server";
import AdminDashboard from "@/modules/portal/components/admin-dashboard";

export default async function AdminPage() {
  await requirePlatformAdmin();
  const data = await getAdminDashboardData();

  return <AdminDashboard data={data} />;
}

