import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/login",
        "/register",
        "/dashboard",
        "/company",
        "/team",
        "/subscription",
        "/settings",
        "/admin",
        "/hub/",
        "/api/",
        "/connect",
      ],
    },
    sitemap: "https://www.code2crest.com/sitemap.xml",
    host: "https://www.code2crest.com",
  };
}
