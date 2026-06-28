import Link from "next/link";
import {
  FaArrowRight,
  FaBuilding,
  FaCreditCard,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa6";
import ProductGrid from "@/components/portal/product-grid";
import { mockCompany, mockUser, portalProducts } from "@/data/portal";

const stats = [
  { label: "Products", value: portalProducts.length, icon: FaLayerGroup },
  { label: "Team Members", value: mockCompany.members, icon: FaUsers },
  { label: "Company", value: "Active", icon: FaBuilding },
  { label: "Plan", value: mockCompany.plan, icon: FaCreditCard },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-300">
              {mockCompany.workspace}
            </p>
            <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Welcome back, {mockUser.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Manage your Code2Crest product ecosystem, company workspace, team,
              subscription, and settings from one unified dashboard.
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-950">Products</h2>
          <p className="mt-1 text-sm text-slate-500">
            Open active apps and preview upcoming Code2Crest tools.
          </p>
        </div>
        <ProductGrid compact />
      </section>
    </div>
  );
}
