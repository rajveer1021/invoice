import React from "react";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import BannerSection from "../../internal/marketing-components/BannerSection";
import DisplaySection from "../../internal/marketing-components/DisplaySection";
import FAQSection from "../../internal/marketing-components/FAQSection";
import MarketingFooter from "../../internal/layout/MarketingFooter";
import TestimonialSection from "../../internal/marketing-components/TestimonialSection";

const TourInvnoicean = () => {
  return (
    <>
      <MarketingHeader
        content={"Return to the "}
        url={"/"}
        buttonTitle={"Return to the Home page"}
      />
      <BannerSection
        heading="Efficient Invoicing"
        content="Generate professional and elegant estimates and invoices effortlessly, in any language or currency, within seconds, and seamlessly deliver them to your clients."
      />
      <DisplaySection />
      <FAQSection />
      <TestimonialSection />
      <MarketingFooter />
    </>
  );
};

export default TourInvnoicean;
