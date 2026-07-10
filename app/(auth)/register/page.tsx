"use client";

import RegisterForm from "@/modules/portal/components/register-form";
import { AuthShell } from "@/modules/portal/components/auth-ui";
import { FaBriefcase, FaLayerGroup, FaShieldHalved } from "react-icons/fa6";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Code2Crest Hub"
      title="Create your Code2Crest Hub workspace"
      subtitle="Create your company workspace and start managing Code2Crest products from one secure hub."
      trustItems={[
        {
          label: "Company workspace setup",
          description: "Registration creates your company and owner access.",
          icon: FaBriefcase,
        },
        {
          label: "LeadFlow trial access",
          description: "Eligible workspaces receive LeadFlow trial access.",
          icon: FaLayerGroup,
        },
        {
          label: "Secure session foundation",
          description: "Built for protected company and product contexts.",
          icon: FaShieldHalved,
        },
      ]}
    >
      <RegisterForm />
    </AuthShell>
  );
}
