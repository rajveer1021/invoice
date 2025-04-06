import React from "react";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import BannerSection from "../../internal/marketing-components/BannerSection";
import { Box, Container, MenuList, Typography } from "@mui/material";
import MarketingFooter from "../../internal/layout/MarketingFooter";

const TermsAndConditions = () => {
  return (
    <>
      <Box className="termsAndCondition-wrapper">
        <MarketingHeader
          content={"Return to the "}
          url={"/"}
          buttonTitle={"Return to the Home page"}
        />
        <BannerSection
          heading="Terms and conditions"
          content="Please review this agreement carefully before utilizing this service."
        />

        <Container>
          <Box className="termsAndCondition mt-30 mb-50">
            <Typography variant="body1" color="initial" className="heading">
              Terms and Conditions for Invoicean
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="content mt-18"
            >
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
              Acceptance of Terms
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                By accessing or using the services provided by Invoicean, you
                agree to be bound by these Terms and Conditions, our Privacy
                Policy, and all applicable laws and regulations. If you do not
                agree with any of these terms, you are prohibited from using or
                accessing this service.
              </Typography>
            </MenuList>

            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Description of Service
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                Invoicean provides a platform for creating, managing, and
                sending invoices, as well as sharing product information and
                files with clients or collaborators. Our service is designed to
                streamline the invoicing process and enhance collaboration
                between users.
              </Typography>
            </MenuList>

            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              User Responsibilities
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                Users are responsible for maintaining the confidentiality of
                their account credentials and for all activities that occur
                under their account. Users must ensure that the information
                provided during registration and while using the service is
                accurate and up-to-date.
              </Typography>
            </MenuList>

            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Use of Service
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                Users may use the service provided by Invoicean for lawful
                purposes only. Users agree not to use the service to engage in
                any illegal activities or to violate the rights of others.
              </Typography>
            </MenuList>
            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Intellectual Property
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                All content and materials available on the Invoicean platform,
                including but not limited to text, graphics, logos, images, and
                software, are the property of Invoicean or its licensors and are
                protected by copyright and other intellectual property laws.
              </Typography>
            </MenuList>
            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Modification of Terms
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                Invoicean reserves the right to modify or amend these Terms and
                Conditions at any time without prior notice. Any changes to the
                terms will be effective immediately upon posting. Users are
                encouraged to review the Terms and Conditions periodically for
                updates.
              </Typography>
            </MenuList>
            <Typography
              variant="body1"
              color="initial"
              className="subheading mt-30"
            >
              Limitation of Liability
            </Typography>

            <MenuList>
              <Typography className="content mt-18">
                Invoicean shall not be liable for any direct, indirect,
                incidental, special, or consequential damages arising out of or
                in any way connected with the use of or inability to use the
                service, even if we have been advised of the possibility of such
                damages.
              </Typography>
              <Typography className="content mt-18">
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of [Jurisdiction], without regard to
                its conflict of law provisions.
              </Typography>
            </MenuList>
          </Box>
        </Container>

        <MarketingFooter />
      </Box>
    </>
  );
};

export default TermsAndConditions;
