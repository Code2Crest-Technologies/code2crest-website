import type { Metadata } from "next";
import PublicLayoutShell from "@/modules/website/components/public-layout-shell";

const description =
  "Code2Crest Technologies is a web development and software company in Erode, Tamil Nadu, building business websites, web applications, e-commerce platforms, SaaS products, mobile apps, and custom software solutions.";

export const metadata: Metadata = {
  title: {
    default: "Code2Crest Technologies | Web Development Company in Erode",
    template: "%s | Code2Crest Technologies",
  },
  description,
  authors: [{ name: "Barath Rahav", url: "https://www.code2crest.com" }],
  creator: "Barath Rahav",
  publisher: "Code2Crest Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Code2Crest Technologies | Web Development Company in Erode",
    description,
    url: "https://www.code2crest.com",
    siteName: "Code2Crest Technologies",
    images: [
      {
        url: "https://www.code2crest.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code2Crest Technologies web development company in Erode",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code2Crest Technologies | Web Development Company in Erode",
    description,
    images: ["https://www.code2crest.com/og-image.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Erode",
    locale: "en_IN",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayoutShell>{children}</PublicLayoutShell>;
}
