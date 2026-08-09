"use client";

import { useEffect, useState } from "react";
import { portalPlanConfig } from "@/modules/portal/data/plans";

type Plan = "TRIAL" | "STARTER" | "GROWTH" | "BUSINESS";
type SubscriptionStatus =
  | "TRIALING"
  | "ACTIVE"
  | "PAST_DUE"
  | "CANCELLED"
  | "EXPIRED";
type LimitValue = number | "unlimited";

type SubscriptionResponse = {
  platformRole?: string;
  plan: Plan;
  status: SubscriptionStatus;
  billingCycle: string;
  trialEndsAt: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  limits: {
    users: LimitValue;
    contacts: LimitValue;
  };
  usage: {
    users: number;
    contacts: number;
  };
  productAccess: {
    key: string;
    name: string;
    status: string;
    accessStatus: string | null;
  }[];
  trialDaysRemaining: number | null;
};

const reasonMessages: Record<
  string,
  { title: string; body: string; tone: "warning" | "info" }
> = {
  leadflow_trial_expired: {
    title: "Your LeadFlow trial has ended.",
    body: "Choose a plan to continue using LeadFlow and keep access to your CRM workspace.",
    tone: "warning",
  },
  subscription_suspended: {
    title: "Your subscription needs attention.",
    body: "Manage your subscription to restore access to your Code2Crest product workspace.",
    tone: "warning",
  },
  subscription_expired: {
    title: "Your subscription has expired.",
    body: "Choose a plan to continue using Code2Crest Hub products.",
    tone: "warning",
  },
};

const comparisonPlans: Plan[] = ["TRIAL", "STARTER", "GROWTH", "BUSINESS"];

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
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    setReason(new URLSearchParams(window.location.search).get("reason") ?? "");

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
  const reasonMessage =
    subscription.platformRole === "PLATFORM_ADMIN"
      ? null
      : reasonMessages[reason] ?? null;

  async function requestCheckout(plan: Plan) {
    setActionMessage("");
    const response = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;

    setActionMessage(
      data?.message ??
        (response.ok
          ? "Checkout is ready."
          : "Online payments are being enabled for beta customers."),
    );
  }

  return (
    <div className="space-y-6">
      {reasonMessage ? (
        <section
          className={
            reasonMessage.tone === "warning"
              ? "rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm"
              : "rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm"
          }
        >
          <p className="text-base font-semibold text-slate-950">
            {reasonMessage.title}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
            {reasonMessage.body}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="#plans"
              className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View plans
            </a>
            <a
              href="/products"
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to products
            </a>
          </div>
        </section>
      ) : null}

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
              Billing cycle: {formatPlan(subscription.billingCycle)}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Trial starts: {formatDate(subscription.currentPeriodStart)}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Trial ends: {formatDate(subscription.trialEndsAt)}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Current period ends: {formatDate(subscription.currentPeriodEnd)}
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
            View Billing History
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

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
        <h3 className="text-lg font-semibold text-slate-950">Product access</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {subscription.productAccess.map((product) => (
            <div
              key={product.key}
              className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2 text-sm"
            >
              <span className="font-medium text-slate-700">{product.name}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {product.accessStatus ?? product.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="plans" className="grid gap-4 lg:grid-cols-4">
        {comparisonPlans.map((plan) => {
          const config = portalPlanConfig[plan];
          const isCurrent = subscription.plan === plan;

          return (
          <div
            key={plan}
            className={
              isCurrent
                ? "rounded-lg border border-blue-300 bg-blue-50/70 p-5 shadow-sm shadow-blue-100"
                : "rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
            }
          >
            <h3 className="text-lg font-semibold text-slate-950">
              {config.label}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {config.description}
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>Users: {formatLimit(config.limits.users)}</p>
              <p>Contacts: {formatLimit(config.limits.contacts)}</p>
            </div>
            <button
              type="button"
              disabled={isCurrent || plan === "TRIAL"}
              onClick={() => requestCheckout(plan)}
              className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-400 enabled:border-blue-600 enabled:bg-blue-600 enabled:text-white enabled:hover:bg-blue-700"
            >
              {isCurrent ? "Current Plan" : plan === "BUSINESS" ? "Contact Sales" : "Upgrade"}
            </button>
          </div>
          );
        })}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Cancel subscription", "View billing history", "Manual activation"].map(
          (action) => (
            <button
              key={action}
              type="button"
              disabled
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-400"
            >
              {action}
            </button>
          ),
        )}
      </section>

      {actionMessage ? (
        <p className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
          {actionMessage}
        </p>
      ) : null}

      <p className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
        Online payments are being enabled for beta customers. Manual activation
        remains available for founder/admin testing.
      </p>
    </div>
  );
}
