import { Box, Container, Typography, MenuList } from "@mui/material";
import React from "react";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import BannerSection from "../../internal/marketing-components/BannerSection";
import MarketingFooter from "../../internal/layout/MarketingFooter";

const Privacy = () => {
  return (
    <Box className="termsAndCondition-wrapper">
      <MarketingHeader
        content={"Return to the "}
        url={"/"}
        buttonTitle={"Return to the Home page"}
      />
      <BannerSection
        heading="Privacy Policy"
        content="At Invoicean, we are dedicated to safeguarding your privacy. Prior to utilizing this service, please carefully review this Privacy Policy."
      />
      <Container>
        <Box className="termsAndCondition mt-30 mb-50">
          <Typography variant="body1" color="initial" className="heading">
            Privacy Policy for Invoicean
          </Typography>
          <Typography variant="body1" color="initial" className="content mt-18">
            At Invoicean, we take your privacy seriously and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, and safeguard your data when you use our
            platform for creating invoices, sending, or sharing products.
          </Typography>

          <Typography
            variant="body1"
            color="initial"
            className="subheading mt-30"
          >
            1. Information We Collect
          </Typography>

          <MenuList>
            <Typography className="content mt-18">
              <strong>Personal Information : </strong> When you sign up for an
              account, we may collect personal information such as your name,
              email address, and contact details.
            </Typography>
            <Typography className="content mt-18">
              <strong>Financial Information:</strong> To facilitate invoicing
              and payments, we may collect financial information such as billing
              details, bank account information, and payment history.
            </Typography>
            <Typography className="content mt-18">
              <strong>Usage Data:</strong> We may collect information about how
              you interact with our platform, including usage patterns,
              preferences, and browsing history.
            </Typography>
            <Typography className="content mt-18">
              <strong>Cookies and Tracking Technologies:</strong> We use cookies
              and similar tracking technologies to enhance your user experience
              and analyze usage trends.
            </Typography>
          </MenuList>

          <Typography
            variant="body1"
            color="initial"
            className="subheading mt-30"
          >
            2. How We Use Your Information
          </Typography>

          <MenuList>
            <Typography className="content mt-18">
              <strong> Providing Services:</strong> We use your information to
              provide you with our services, including creating invoices,
              sending reminders, and facilitating product sharing.
            </Typography>
            <Typography className="content mt-18">
              <strong>Financial Information:</strong> To facilitate invoicing
              and payments, we may collect financial information such as billing
              details, bank account information, and payment history.
            </Typography>
            <Typography className="content mt-18">
              <strong>Personalization:</strong> We may personalize your
              experience by offering tailored content mt-18, recommendations,
              and advertisements based on your preferences and usage patterns.
            </Typography>
            <Typography className="content mt-18">
              <strong>Communication:</strong> We may use your contact
              information to communicate with you about account updates, service
              announcements, and promotional offers.
            </Typography>
            <Typography className="content mt-18">
              <strong>Improving Our Platform:</strong> We analyze user data to
              improve the functionality, performance, and security of our
              platform, as well as to develop new features and services.
            </Typography>
          </MenuList>

          <Typography
            variant="body1"
            color="initial"
            className="subheading mt-30"
          >
            3. Data Security
          </Typography>

          <MenuList>
            <Typography className="content mt-18">
              We employ industry-standard security measures to protect your
              personal information from unauthorized access, disclosure,
              alteration, and destruction. However, no method of transmission
              over the internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security.
            </Typography>
          </MenuList>

          <Typography
            variant="body1"
            color="initial"
            className="subheading mt-30"
          >
            4. Data Sharing and Disclosure
          </Typography>

          <MenuList>
            <Typography className="content mt-18">
              We may share your information with trusted third-party service
              providers who assist us in operating our platform, processing
              payments, and delivering services. We may also disclose your
              information in response to legal requests, to enforce our terms of
              service, or to protect our rights, property, or safety.
            </Typography>
          </MenuList>
          <Typography
            variant="body1"
            color="initial"
            className="subheading mt-30"
          >
            5. Your Rights and Choices
          </Typography>

          <MenuList>
            <Typography className="content mt-18">
              You have the right to access, update, and delete your personal
              information stored on our platform. You may also opt out of
              receiving promotional communications and cookies by adjusting your
              account settings and browser preferences.
            </Typography>
          </MenuList>
          <Typography
            variant="body1"
            color="initial"
            className="subheading mt-30"
          >
            6. Changes to This Privacy Policy
          </Typography>

          <MenuList>
            <Typography className="content mt-18">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any material changes and seek your consent if required by law.
            </Typography>
          </MenuList>
          <Typography
            variant="body1"
            color="initial"
            className="subheading mt-30"
          >
            7. Contact Us
          </Typography>

          <MenuList>
            <Typography className="content mt-18">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at{" "}
              <a href="mailto:contact@invoicean.com">contact@invoicean.com</a>.
            </Typography>
            <Typography className="content mt-18">
              By using our platform, you consent to the terms of this Privacy
              Policy and the processing of your personal information as
              described herein.
            </Typography>
          </MenuList>
        </Box>
      </Container>

      <MarketingFooter />
    </Box>
  );
};

export default Privacy;
