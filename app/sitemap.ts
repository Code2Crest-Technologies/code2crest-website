import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://www.code2crest.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.code2crest.com/products",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
