"use client";

import LoginForm from "@/modules/portal/components/login-form";
import { AuthShell } from "@/modules/portal/components/auth-ui";
import { FaBuildingLock, FaShieldHalved, FaUsersGear } from "react-icons/fa6";

export default function LoginPage() {
  const trustPoints = [
    {
      label: "Secure workspace access",
      description: "Session-based authentication for your company hub.",
      icon: FaShieldHalved,
    },
    {
      label: "Company-level product permissions",
      description: "Product access is scoped to the active workspace.",
      icon: FaBuildingLock,
    },
    {
      label: "Role-based team management",
      description: "Owners and admins control workspace access.",
      icon: FaUsersGear,
    },
  ];

  return (
    <AuthShell
      eyebrow="Code2Crest Hub"
      title="Sign in to your workspace"
      subtitle="Access your Code2Crest products, team workspace, subscriptions, and business tools from one secure hub."
      trustItems={trustPoints}
    >
      <LoginForm />
    </AuthShell>
  );
}
