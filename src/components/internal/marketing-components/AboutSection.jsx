import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import InvoiceanLogo from "../../..//assets/logo/logo-dark.png";

const AboutSection = () => {
  return (
    <>
      <Box className="about-section">
        <Container>
          <Box className="about-wrapper">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box className="invoice-right-section" data-aos="fade-up" >
                  <Box className="Invoicean-logo">
                    <Box
                      component="img"
                      src={InvoiceanLogo}
                      className="logo"
                      alt="about invoicean logo"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="Invoicen-details" data-aos="fade-up">
                  <Typography className="heading">
                    Know more about Invoicea
                  </Typography>
                  <Typography className="display-heading text-display">
                    Welcome to Invoicean.
                  </Typography>
                  <Typography className="subheading mt-18">
                    Discover the power of Invoicean – your ultimate invoicing
                    solution. Simplify your billing process, manage clients
                    effortlessly, and stay organized with our intuitive
                    platform. From seamless login to easy invoice creation and
                    secure sharing options, Invoicean streamlines every aspect
                    of your invoicing journey. With downloadable PDF invoices,
                    CSV exports, and insightful reporting features, Invoicean
                    puts you in control of your finances. Join the thousands of
                    businesses worldwide who trust Invoicean for their invoicing
                    needs.
                  </Typography>
                  <Typography className="subheading mt-30 text-primary">
                    {" "}
                    Your business, your clients, your invoicing solution –
                    Invoicean.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutSection;
