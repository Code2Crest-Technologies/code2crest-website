import type { Metadata } from "next";

import PageIllustration from "@/modules/website/components/ui/page-illustration";
import Home from "@/modules/website/components/home";
import Workflows from "@/modules/website/components/workflows";
import Portfolio from "@/modules/website/components/portfolio";
import AboutFounder from "@/modules/website/components/about-founder";
// import Testimonials from "@/modules/website/components/testimonials";
import GetQuote from "@/modules/website/components/get-quote";
import Contact from "@/modules/website/components/contact";
import WhatsAppButton from "@/modules/website/components/ui/whatsapp-button";
import Services from "@/modules/website/components/services";
import ProductsEcosystem from "@/modules/website/components/products-ecosystem";
import LeadFlowHighlight from "@/modules/website/components/leadflow-highlight";
import {
  OrganizationStructuredData,
  ProfessionalServiceStructuredData,
} from "@/modules/website/components/structured-data";

export const metadata: Metadata = {
  title: "Code2Crest Technologies | Web Design and Web Development Company in Erode",
  description:
    "Code2Crest Technologies builds modern websites, web applications, e-commerce platforms, SaaS products, mobile apps, and custom software solutions for businesses in Erode, Tamil Nadu, and across India.",
  alternates: {
    canonical: "https://www.code2crest.com",
  },
  openGraph: {
    title: "Code2Crest Technologies | Web Design and Web Development Company in Erode",
    description:
      "Code2Crest Technologies builds modern websites, web applications, e-commerce platforms, SaaS products, mobile apps, and custom software solutions for businesses in Erode, Tamil Nadu, and across India.",
    url: "https://www.code2crest.com",
    images: [
      {
        url: "https://www.code2crest.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code2Crest Technologies web design and Web development company in Erode",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <OrganizationStructuredData />
      <ProfessionalServiceStructuredData />
      <PageIllustration />
      <Home />
      <Services />
      <ProductsEcosystem />
      <LeadFlowHighlight />
      <Workflows />
      <Portfolio />
      <AboutFounder />
      {/* <Testimonials /> */}
      <GetQuote />
      <Contact />
      <WhatsAppButton />
    </>
  );
}
