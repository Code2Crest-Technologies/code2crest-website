import type { Metadata } from "next";

const siteUrl = "https://www.code2crest.com";

export function createPublicPageMetadata(input: {
  title: string;
  description: string;
  path?: string;
  imageAlt?: string;
}): Metadata {
  const url = `${siteUrl}${input.path ?? ""}`;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: input.imageAlt ?? input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export const futureSeoPageTitles = {
  websiteDevelopment: "Website Development Company in Erode",
  webApplicationDevelopment: "Web Application Development Company in Erode",
  ecommerceDevelopment: "E-Commerce Website Development in Erode",
  customSoftwareDevelopment: "Custom Software Development Company in Erode",
  mobileAppDevelopment: "Mobile App Development Company in Erode",
  leadFlow: "LeadFlow CRM for Small Businesses",
  erodeLocation: "Web Development Company in Erode",
} as const;
