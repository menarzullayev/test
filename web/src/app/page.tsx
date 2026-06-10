import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CtaFooter } from "@/components/sections/CtaFooter";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { SocialProof } from "@/components/sections/SocialProof";
import { Solution } from "@/components/sections/Solution";
import { FAQS, PRICING, SITE } from "@/lib/data";

/** Structured data: Organization + WebSite + SoftwareApplication + FAQ. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: SITE.company,
      url: SITE.url,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#org` },
    },
    {
      "@type": "SoftwareApplication",
      name: SITE.name,
      description: SITE.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: PRICING.filter((tier) => tier.monthly !== null).map((tier) => ({
        "@type": "Offer",
        name: tier.name,
        price: tier.annual,
        priceCurrency: "USD",
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <ProductDemo />
        <Features />
        <CaseStudies />
        <Pricing />
        <Faq />
        <CtaFooter />
      </main>
      <Footer />
    </>
  );
}
