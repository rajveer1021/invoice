import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { servicesData } from "../../../constant";

const ServiceSection = () => {
  return (
    <>
      <Box className="service-section">
        <Container>
          <Box className="service-wrapper">
            <Typography className="text-display heading" data-aos="fade-up" data-aos-delay="100">
              Experience the Power of Invoicean Today!
            </Typography>
            <Typography className="subheading mt-18" data-aos="fade-up" data-aos-delay="200">
              Invoicean offers a comprehensive suite of invoicing and accounting
              tools tailored to meet your business needs. Take a tour to
              discover why it's a favorite among businesses worldwide.
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 4 }} className="mt-30">
              {servicesData?.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box className="serviceCard" data-aos="fade-up" data-aos-delay={index * 100}>
                    <Box className="card-icon-container">{service?.icon}</Box>
                    <Typography className="content-heading mt-18">
                      {service?.heading}
                    </Typography>
                    <Typography className="content-subheading">
                      {service?.subheading}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ServiceSection;
