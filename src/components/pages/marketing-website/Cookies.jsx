import React from "react";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import BannerSection from "../../internal/marketing-components/BannerSection";
import { Box, Container, MenuList, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MarketingFooter from "../../internal/layout/MarketingFooter";

const Cookies = () => {
  return (
    <>
      <Box className="termsAndCondition-wrapper">
        <MarketingHeader
          content={"Return to the "}
          url={"/"}
          buttonTitle={"Return to the Home page"}
        />
        <BannerSection
          heading="Cookie Policy"
          content="At Invoicean, we utilize cookies to ensure optimal user experience, security, and functionality of our platform."
        />
        <Container>
          <Box className="termsAndCondition mt-30 mb-50">
            <Typography variant="body1" color="initial" className="heading">
              Legal/Cookies Policy for Invoicean
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="content mt-18"
            >
              At Invoicean, we prioritize the protection of your privacy and
              data security. Our legal and cookies policy outlines how we
              collect, use, and safeguard your information when you use our
              platform for creating invoices, sending, or sharing products.
            </Typography>

            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Data Collection and Usage
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="content mt-18"
            >
              We collect personal and non-personal information to provide and
              improve our services, including:
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                Account registration data such as name, email address, and
                contact information.
              </Typography>
              <Typography className="content mt-18">
                Usage data including interactions with our platform, IP
                addresses, and device information.
              </Typography>
              <Typography className="content mt-18">
                Cookies and similar technologies to enhance user experience,
                analytics, and targeted advertising.
              </Typography>
              <Typography className="content mt-18">
                <strong>Cookies and Tracking Technologies:</strong> We use
                cookies and similar tracking technologies to enhance your user
                experience and analyze usage trends.
              </Typography>
            </MenuList>

            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Data Protection and Security
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                We employ industry-standard security measures to protect your
                information against unauthorized access, alteration, disclosure,
                or destruction. Your data is encrypted and stored securely on
                our servers.
              </Typography>
            </MenuList>

            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Cookies Policy
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                We use cookies and similar technologies to enhance user
                experience and improve our services. Cookies may collect
                information about your browsing behavior, preferences, and
                interactions with our platform. You have the option to manage
                cookies preferences through your browser settings.
              </Typography>
            </MenuList>

            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Third-Party Services
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                We may integrate third-party services or links on our platform.
                These services may have their own privacy policies and terms of
                use, which we encourage you to review.
              </Typography>
            </MenuList>
            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Data Retention
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                We retain your information only for as long as necessary to
                fulfill the purposes outlined in this policy or as required by
                law. You have the right to request access, correction, or
                deletion of your personal data.
              </Typography>
            </MenuList>
            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Policy Updates
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                We reserve the right to update our legal and cookies policy to
                reflect changes in our practices, technology, or legal
                requirements. We will notify you of any significant changes and
                seek your consent if necessary.
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
                If you have any questions or concerns regarding our legal and
                cookies policy, please contact us at
                <Link href="mailto:contact@clecotech.com">
                  {" "}
                  contact@invoicean.com
                </Link>
                .
              </Typography>
              <Typography className="content mt-18">
                By using our platform, you consent to the terms outlined in this
                legal and cookies policy.
              </Typography>
            </MenuList>
          </Box>
        </Container>

        <MarketingFooter />
      </Box>
    </>
  );
};

export default Cookies;
