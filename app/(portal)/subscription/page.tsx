import SubscriptionPanel from "@/modules/portal/components/subscription-panel";

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

      <SubscriptionPanel />
    </div>
  );
}
