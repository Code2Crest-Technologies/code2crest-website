import SubscriptionPanel from "@/modules/portal/components/subscription-panel";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Subscription
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Track your current plan, beta trial status, and workspace usage.
        </p>
      </div>

      <SubscriptionPanel />
    </div>
  );
}
