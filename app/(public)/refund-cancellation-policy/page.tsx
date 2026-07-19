import type { Metadata } from "next";
import LegalPage from "@/modules/website/components/legal-page";
import { refundCancellationPolicy } from "@/modules/website/data/legal-pages";
import { WEBSITE_URL } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: refundCancellationPolicy.description,
  alternates: {
    canonical: `${WEBSITE_URL}/refund-cancellation-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundCancellationPolicyPage() {
  return <LegalPage content={refundCancellationPolicy} />;
}
