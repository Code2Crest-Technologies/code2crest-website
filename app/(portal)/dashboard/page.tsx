import Link from "next/link";
import {
  FaArrowRight,
  FaBuilding,
  FaCheck,
  FaCreditCard,
  FaGear,
  FaLayerGroup,
  FaRocket,
  FaTriangleExclamation,
  FaUsers,
} from "react-icons/fa6";
import { CompanyProductStatus } from "@prisma/client";
import ProductGrid from "@/modules/portal/components/product-grid";
import { requireCompany } from "@/lib/auth/server";
import { getCompanyProductAccess } from "@/modules/products/server";
import { getCompanySubscription } from "@/modules/subscription/server";

export default async function DashboardPage() {
  const context = await requireCompany();
  const products = await getCompanyProductAccess(context.companyId);
  const subscription = await getCompanySubscription(context.companyId);
  const leadFlow = products.find((product) => product.key === "leadflow");
  const hasLeadFlowAccess =
    leadFlow?.access?.status === CompanyProductStatus.TRIAL ||
    leadFlow?.access?.status === CompanyProductStatus.ACTIVE;
  const hasCompanyProfile =
    Boolean(context.company.website) ||
    Boolean(context.company.phone) ||
    Boolean(context.company.address);
  const trialDaysRemaining = subscription?.trialDaysRemaining ?? null;
  const stats = [
    { label: "Products", value: products.length, icon: FaLayerGroup },
    { label: "Team Members", value: context.company.members, icon: FaUsers },
    { label: "Company Status", value: context.company.status ?? "ACTIVE", icon: FaBuilding },
    {
      label: "Current Plan",
      value: subscription?.subscription.plan ?? context.company.plan,
      icon: FaCreditCard,
    },
    {
      label: "Plan Status",
      value: subscription?.subscription.status ?? "Preview",
      icon: FaRocket,
    },
    {
      label: "Trial Days",
      value: trialDaysRemaining === null ? "N/A" : trialDaysRemaining,
      icon: FaTriangleExclamation,
    },
  ];
  const quickActions = [
    {
      label: "Open LeadFlow",
      href: hasLeadFlowAccess ? "/api/products/leadflow/launch" : "/products",
      icon: FaRocket,
    },
    { label: "Invite Team Member", href: "/team", icon: FaUsers },
    { label: "Update Company Profile", href: "/company", icon: FaBuilding },
    { label: "View Subscription", href: "/subscription", icon: FaCreditCard },
    { label: "Manage Products", href: "/products", icon: FaLayerGroup },
    { label: "Account Settings", href: "/settings", icon: FaGear },
  ];
  const checklist = [
    { label: "Complete company profile", href: "/company", done: hasCompanyProfile },
    { label: "Open LeadFlow", href: hasLeadFlowAccess ? "/api/products/leadflow/launch" : "/products", done: hasLeadFlowAccess },
    { label: "Invite a team member", href: "/team", done: context.company.members > 1 },
    { label: "Review subscription", href: "/subscription", done: Boolean(subscription) },
    { label: "Configure account security", href: "/settings", done: false },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-300">
              Code2Crest Hub
            </p>
            <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Welcome back, {context.user.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Manage your Code2Crest products, company workspace, team access,
              subscription, and business tools from one secure hub.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View Products
            <FaArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-950">
                {stat.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <h2 className="text-lg font-semibold text-slate-950">Quick actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
              <a
                key={action.label}
                href={action.href}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </a>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <h2 className="text-lg font-semibold text-slate-950">
            Getting Started
          </h2>
          <div className="mt-4 space-y-3">
            {checklist.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-md border border-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span
                  className={
                    item.done
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                      : "flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400"
                  }
                >
                  <FaCheck className="h-3 w-3" />
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-950">Products</h2>
          <p className="mt-1 text-sm text-slate-500">
            Open active apps and preview upcoming Code2Crest tools.
          </p>
        </div>
        <ProductGrid compact products={products} />
      </section>
    </div>
  );
}
