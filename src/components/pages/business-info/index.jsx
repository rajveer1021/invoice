import { Box, Container } from "@mui/material";
import React from "react";
import useAuthentication from "../../../hooks/useAuthentication";
import BusinessInfoHeader from "./BusinessInfoHeader";
import BusinessInfoForm from "./BusinessInfoForm";
import Header from "../../internal/layout/Header";
import business_background_Image from "../../../assets/images/Business-info.png";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";

const BusinessInfo = () => {
  useAuthentication();
  useCheckProfileCompletion();

  return (
    <>
      <Header />
      <Box className="front-screen-container">
        <Box
          className="busnessinfo"
          sx={{ backgroundImage: `url(${business_background_Image})` }}
        >
          <Container>
            <Box className="businessinfo-wrapper mb-50">
              <Box className="businessinfo-container">
                <BusinessInfoHeader
                  heading="Business Info"
                  subHeading="Free, Unlimited Invoicing"
                />
                <BusinessInfoForm />
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default BusinessInfo;
