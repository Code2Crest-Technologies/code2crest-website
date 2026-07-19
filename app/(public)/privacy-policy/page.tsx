import type { Metadata } from "next";
import LegalPage from "@/modules/website/components/legal-page";
import { privacyPolicy } from "@/modules/website/data/legal-pages";
import { WEBSITE_URL } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyPolicy.description,
  alternates: {
    canonical: `${WEBSITE_URL}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage content={privacyPolicy} />;
}
