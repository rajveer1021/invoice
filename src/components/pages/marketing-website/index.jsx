import React, { useState, useEffect } from "react";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import HomeSection from "../../internal/marketing-components/HomeSection";
import AboutSection from "../../internal/marketing-components/AboutSection";
import DisplaySection from "../../internal/marketing-components/DisplaySection";
import ServiceSection from "../../internal/marketing-components/ServiceSection";
import BannerSection from "../../internal/marketing-components/BannerSection";
import AISection from "../../internal/marketing-components/AISection";
import FAQSection from "../../internal/marketing-components/FAQSection";
import TestimonialSection from "../../internal/marketing-components/TestimonialSection";
import MarketingFooter from "../../internal/layout/MarketingFooter";
import FullscreenLoader from "../../shared/loader/FullscreenLoader";
import CookiesSelection from "../../internal/dialog-box/CookiesSelection";
import {
  getHeaderDataFromLocalStorage,
  getUserDataFromLocalStorage,
} from "../../../services/Utils";
import BugReport from "./BugReport";

const InvoiceanMarketing = () => {
  const [checkAuthentication, setCheckAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCookiesSection, setShowCookiesSection] = useState(true);

  useEffect(() => {
    const userHeaderData = getHeaderDataFromLocalStorage();
    const userData = getUserDataFromLocalStorage();
    if (userHeaderData && userData) {
      setCheckAuthentication(true);
    }
  }, []);

  const buttonTitle = checkAuthentication
    ? "Go to Dashboard"
    : "Create Invoice";
  const url = checkAuthentication ? "/dashboard" : "/login";
  const content = checkAuthentication
    ? "Welcome to"
    : "Send your first Invoice with";

  const getCookie = (name) => {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split("; ").map((cookie) => cookie.trim());
    const foundCookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    if (foundCookie) {
      const cookieValue = foundCookie.split("=")[1];
      return JSON.parse(cookieValue);
    }
    return null;
  };

  useEffect(() => {
    const cookieData = getCookie("cookie_consent");
    const cookieGuid = cookieData ? cookieData.guid : null;

    const shouldShowCookiesSection = !cookieGuid;
    setShowCookiesSection(shouldShowCookiesSection);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <>
      {showCookiesSection && <CookiesSelection />}
      <MarketingHeader content={content} url={url} buttonTitle={buttonTitle} />
      <HomeSection checkAuthentication={checkAuthentication} />
      <AboutSection />
      <DisplaySection />
      <ServiceSection />
      <BannerSection
        heading="Your Business. Your Clients, Your Invoicing Solution – Invoicean."
        content="Join thousands of businesses worldwide that trust Invoicean for their invoicing needs. Sign up now and take control of your invoicing process – effortlessly manage invoices, delight clients, and drive business growth with Invoicean."
      />
      <AISection />
      <FAQSection />
      <TestimonialSection />
      <BugReport />
      <MarketingFooter />
    </>
  );
};

export default InvoiceanMarketing;
