export const metadata = {
  title: "Code2Crest Technologies",
  description: "Welcome to Code2Crest Technologies, your partner in digital transformation and software development",
};

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

export default function Page() {
  return (
    <>
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
