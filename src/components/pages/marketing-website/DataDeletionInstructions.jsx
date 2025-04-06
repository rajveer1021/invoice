import React from "react";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import BannerSection from "../../internal/marketing-components/BannerSection";
import { Box, Container, Typography } from "@mui/material";
import MarketingFooter from "../../internal/layout/MarketingFooter";

const DataDeletionInstructions = () => {
  return (
    <>
      <Box className="termsAndCondition-wrapper">
        <MarketingHeader
          content={"Return to the "}
          url={"/"}
          buttonTitle={"Return to the Home page"}
        />
        <BannerSection
          heading="Data Deletion Instructions"
          content="Review these steps to understand how you can delete your data."
        />

        <Container>
          <Box className="termsAndCondition mt-30 mb-50">
            <Typography variant="h6" color="initial" className="heading">
              Data Deletion Instructions
            </Typography>
            <Typography variant="body1" color="initial" 
              className="content mt-18" gutterBottom>
              According to the Facebook Platform rules, we have to provide User Data Deletion Callback URL or Data Deletion Instructions URL.
            </Typography>
            <Typography variant="body1" color="initial" 
              className="content mt-18" gutterBottom>
              If you want to delete your activities for Invoicean App, you can remove your information by following these steps:
            </Typography>
            <Typography variant="body2" color="initial" className="content">
              1. Go to your Facebook Account's "Settings & Privacy".
            </Typography>
            <Typography variant="body2" color="initial" className="content">
              2. Click "Settings"
            </Typography>
            <Typography variant="body2" color="initial" className="content">
              3. Then, go to  "Apps and Websites" and you will see all of your Apps activities.
            </Typography>
            <Typography variant="body2" color="initial" className="content">
              4. Select the option box for Invoicean.
            </Typography>
            <Typography variant="body2" color="initial" className="content">
              5. Click "Remove" button.
            </Typography>
            <Typography variant="body1" color="initial" className="content mt-18" gutterBottom>
              If you wish to delete your user account data, you can send us a request to <a href="mailto:support@invoicean.com">support@invoicean.com</a>. In the email body, provide the email address used for registration and we will take care of the rest.           
            </Typography>
          </Box>
        </Container>

        <MarketingFooter />
      </Box>
    </>
  );
};

export default DataDeletionInstructions;