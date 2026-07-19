import type { MetadataRoute } from "next";
import { WEBSITE_URL } from "@/lib/legal/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const legalRoutes = [
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
    "/refund-cancellation-policy",
  ];

  return [
    {
      url: WEBSITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${WEBSITE_URL}/products`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...legalRoutes.map((route) => ({
      url: `${WEBSITE_URL}${route}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
