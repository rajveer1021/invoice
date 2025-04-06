import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../shared/CustomButton";

const HomeSection = ({ checkAuthentication }) => {
  return (
    <Box>
      <Box className="home-section">
        <Container>
          <Box className="home-wrapper">
            <Box className="advertisement-content">
              <Typography className="content-heading">
                <span className="highlighted-heading">
                  Welcome to Invoicean
                </span>{" "}
                <br />
                Your Business's Invoicing Companion!
              </Typography>
              <CustomButton
                title={
                  !checkAuthentication
                    ? "Start using Invoicean"
                    : "Go to Dashboard"
                }
                styles="button marketingButton mt-18"
                url={!checkAuthentication ? "/login" : "/dashboard"}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomeSection;
