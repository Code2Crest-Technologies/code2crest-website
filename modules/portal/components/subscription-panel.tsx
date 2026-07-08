"use client";

import { useEffect, useState } from "react";

type Plan = "TRIAL" | "STARTER" | "GROWTH" | "BUSINESS";
type SubscriptionStatus =
  | "TRIALING"
  | "ACTIVE"
  | "PAST_DUE"
  | "CANCELLED"
  | "EXPIRED";
type LimitValue = number | "unlimited";

type SubscriptionResponse = {
  plan: Plan;
  status: SubscriptionStatus;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
  limits: {
    users: LimitValue;
    contacts: LimitValue;
  };
  usage: {
    users: number;
    contacts: number;
  };
  trialDaysRemaining: number | null;
};

const upgradePlans: Plan[] = ["STARTER", "GROWTH", "BUSINESS"];

function formatPlan(value: string) {
  return value
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatLimit(value: LimitValue) {
  return value === "unlimited" ? "Unlimited" : value.toLocaleString();
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function SubscriptionPanel() {
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSubscription() {
      const response = await fetch("/api/subscription", { cache: "no-store" });
      const data = (await response.json().catch(() => null)) as
        | SubscriptionResponse
        | { message?: string }
        | null;

      if (response.ok && data && "plan" in data) {
        setSubscription(data);
      } else {
        setMessage(
          data && "message" in data && data.message
            ? data.message
            : "Unable to load subscription.",
        );
      }

      setIsLoading(false);
    }

    void loadSubscription();
  }, []);

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
        <p className="text-sm text-slate-600">Loading subscription...</p>
      </section>
    );
  }

  if (!subscription) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">{message}</p>
      </section>
    );
  }

  const usageItems = [
    {
      label: "Users",
      usage: subscription.usage.users,
      limit: subscription.limits.users,
    },
    {
      label: "Contacts",
      usage: subscription.usage.contacts,
      limit: subscription.limits.contacts,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
        <p className="text-sm font-semibold text-blue-600">Current Plan</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              {formatPlan(subscription.plan)}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Status: {formatPlan(subscription.status)}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Trial ends: {formatDate(subscription.trialEndsAt)}
            </p>
            {subscription.trialDaysRemaining !== null ? (
              <p className="mt-1 text-sm font-semibold text-slate-950">
                {subscription.trialDaysRemaining} trial days remaining
              </p>
            ) : null}
          </div>
          <button
            type="button"
            disabled
            className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-400"
          >
            Billing Coming Soon
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {usageItems.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
          >
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {item.usage.toLocaleString()} / {formatLimit(item.limit)}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {upgradePlans.map((plan) => (
          <div
            key={plan}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
          >
            <h3 className="text-lg font-semibold text-slate-950">
              {formatPlan(plan)}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Upgrade path reserved for Razorpay integration.
            </p>
            <button
              type="button"
              disabled
              className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-400"
            >
              Coming Soon
            </button>
          </div>
        ))}
      </section>

      <p className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
        Payments will be enabled after beta.
      </p>
    </div>
  );
}
