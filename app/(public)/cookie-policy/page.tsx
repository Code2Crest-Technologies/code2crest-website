import type { Metadata } from "next";
import LegalPage from "@/modules/website/components/legal-page";
import { cookiePolicy } from "@/modules/website/data/legal-pages";
import { WEBSITE_URL } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: cookiePolicy.description,
  alternates: {
    canonical: `${WEBSITE_URL}/cookie-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return <LegalPage content={cookiePolicy} />;
}
