import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import Header from "@/components/ui/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.code2crest.com"),

  title:
    "Code2Crest Technologies - Web Development & Custom Software Solutions",

  description:
    "Code2Crest Technologies builds modern websites, web applications, e-commerce solutions and custom software using React, Next.js, Node.js, MongoDB and modern technologies.",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "Code2Crest Technologies",
    description:
      "Web Development, E-Commerce Solutions, React, Next.js, Mobile App Development",
    url: "https://www.code2crest.com",
    siteName: "Code2Crest Technologies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Code2Crest Technologies",
    description:
      "Web Development, E-Commerce Solutions, React, Next.js, Mobile App Development",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    title: "Code2Crest",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-inter text-base text-gray-200 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>

        <GoogleAnalytics gaId="G-56WCCMYN4G" />
        
      </body>
    </html>
  );
}
