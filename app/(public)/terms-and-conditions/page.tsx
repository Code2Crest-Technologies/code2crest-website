import type { Metadata } from "next";
import LegalPage from "@/modules/website/components/legal-page";
import { termsAndConditions } from "@/modules/website/data/legal-pages";
import { WEBSITE_URL } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: termsAndConditions.description,
  alternates: {
    canonical: `${WEBSITE_URL}/terms-and-conditions`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  return <LegalPage content={termsAndConditions} />;
}
