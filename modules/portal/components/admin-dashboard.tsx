"use client";

import { useState } from "react";
import type { getAdminDashboardData } from "@/modules/admin/server";

type AdminData = Awaited<ReturnType<typeof getAdminDashboardData>>;
type AdminAction =
  | "extend_trial"
  | "activate_company"
  | "suspend_company"
  | "grant_leadflow"
  | "revoke_leadflow";

const actionLabels: Record<AdminAction, string> = {
  extend_trial: "Extend trial",
  activate_company: "Activate",
  suspend_company: "Suspend",
  grant_leadflow: "Grant LeadFlow",
  revoke_leadflow: "Revoke LeadFlow",
};

function formatDate(value?: Date | string | null) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function AdminDashboard({ data }: { data: AdminData }) {
  const [pending, setPending] = useState<{
    companyId: string;
    companyName: string;
    action: AdminAction;
  } | null>(null);
  const [message, setMessage] = useState("");

  async function runAction() {
    if (!pending) {
      return;
    }

    const response = await fetch(`/api/admin/companies/${pending.companyId}/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: pending.action }),
    });

    setMessage(
      response.ok
        ? `${actionLabels[pending.action]} completed for ${pending.companyName}. Refresh to see latest data.`
        : "Admin action failed.",
    );
    setPending(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Platform Admin
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Internal Code2Crest platform operations and beta oversight.
        </p>
      </div>

      {message ? (
        <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
          {message}
        </p>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Object.entries(data.metrics).map(([label, value]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium capitalize text-slate-500">
              {label.replace(/([A-Z])/g, " $1")}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Recent registrations</h2>
        <div className="mt-4 grid gap-2">
          {data.recentUsers.map((user) => (
            <div key={user.id} className="flex justify-between rounded-md bg-slate-50 px-3 py-2 text-sm">
              <span>{user.name} - {user.email}</span>
              <span className="text-slate-500">{formatDate(user.createdAt)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700">
          Companies
        </div>
        <div className="divide-y divide-slate-100">
          {data.companies.map((company) => {
            const leadFlow = company.products.find((access) => access.product.key === "leadflow");

            return (
              <div key={company.id} className="grid gap-3 px-5 py-4 text-sm xl:grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_1.4fr] xl:items-center">
                <div>
                  <p className="font-semibold text-slate-950">{company.name}</p>
                  <p className="text-xs text-slate-500">{company.status}</p>
                </div>
                <div>{company.owner.name}<br /><span className="text-xs text-slate-500">{company.owner.email}</span></div>
                <div>{company.subscription?.plan ?? "None"}</div>
                <div>{company.subscription?.status ?? "None"}</div>
                <div>{formatDate(company.subscription?.trialEndsAt)}</div>
                <div>{leadFlow?.status ?? "Not enabled"}</div>
                <div className="flex flex-wrap gap-2">
                  {(["extend_trial", "activate_company", "suspend_company", leadFlow ? "revoke_leadflow" : "grant_leadflow"] as AdminAction[]).map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => setPending({ companyId: company.id, companyName: company.name, action })}
                      className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      {actionLabels[action]}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {pending ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-950">Confirm admin action</h2>
            <p className="mt-2 text-sm text-slate-600">
              Run "{actionLabels[pending.action]}" for {pending.companyName}?
              This action will be written to audit logs.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPending(null)}
                className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={runAction}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
