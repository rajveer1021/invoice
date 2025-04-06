import React from "react";
import ServiceSection from "../../internal/marketing-components/ServiceSection";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import BannerSection from "../../internal/marketing-components/BannerSection";
import FAQSection from "../../internal/marketing-components/FAQSection";
import MarketingFooter from "../../internal/layout/MarketingFooter";
import DisplaySection from "../../internal/marketing-components/DisplaySection";
import TestimonialSection from "../../internal/marketing-components/TestimonialSection";

const ServiceInvoicean = () => {
  return (
    <>
      <MarketingHeader
        content={"Return to the "}
        url={"/"}
        buttonTitle={"Return to the Home page"}
      />
      <BannerSection
        heading="Key Features Summarized"
        content="Invoicean offers a comprehensive suite of invoicing and accounting tools tailored to meet your business needs. Take a tour to discover why you'll love it as much as we do."
      />
      <ServiceSection />
      <DisplaySection />
      <FAQSection />
      <TestimonialSection />
      <MarketingFooter />
    </>
  );
};

export default ServiceInvoicean;
