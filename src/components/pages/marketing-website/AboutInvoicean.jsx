import React from "react";
import BannerSection from "./../../internal/marketing-components/BannerSection";
import AboutSection from "../../internal/marketing-components/AboutSection";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import MarketingFooter from "../../internal/layout/MarketingFooter";
import FAQSection from "../../internal/marketing-components/FAQSection";
import DisplaySection from "../../internal/marketing-components/DisplaySection";
import TestimonialSection from "../../internal/marketing-components/TestimonialSection";

const AboutInvoicean = () => {
  return (
    <>
      <MarketingHeader content={"Return to the "} url={"/"} buttonTitle={"Return to the Home page"} />
      <BannerSection
        heading="About Invoicean."
        content="
        Invoicean aims to make free cloud invoicing and accounting software accessible to people worldwide. How are we achieving this goal? Read on to find out."
      />
      <AboutSection />
      <DisplaySection />
      <FAQSection />
      <TestimonialSection />
      <MarketingFooter />
    </>
  );
};

export default AboutInvoicean;
