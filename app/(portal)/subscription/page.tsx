import { mockCompany } from "@/data/portal";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Subscription
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Billing is mocked for the MVP and ready for a future payment provider.
        </p>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
        <p className="text-sm font-semibold text-blue-600">Current Plan</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          {mockCompany.plan}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
          Includes portal access, LeadFlow launch access, and early previews for
          upcoming Code2Crest workflow products.
        </p>
      </section>
    </div>
  );
}
