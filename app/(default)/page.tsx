export const metadata = {
  title: "Code2Crest Technologies",
  description: "Welcome to Code2Crest Technologies, your partner in digital transformation and software development",
};

import PageIllustration from "@/components/ui/page-illustration";
import Home from "@/components/home";
import Workflows from "@/components/workflows";
import Portfolio from "@/components/portfolio";
import AboutFounder from "@/components/about-founder";
// import Testimonials from "@/components/testimonials";
import GetQuote from "@/components/get-quote";
import Contact from "@/components/contact";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import Services from "@/components/services";

export default function Page() {
  return (
    <>
      <PageIllustration />
      <Home />
      <Services />
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
