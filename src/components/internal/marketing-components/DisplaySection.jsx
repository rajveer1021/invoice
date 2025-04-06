import { Box, Container, Typography } from "@mui/material";
import React from "react";

const DisplaySection = () => {
  return (
    <>
      <Box className="display-section">
        <Container>
          <Box className="display-wrapper">
            <Typography className="content-heading" data-aos="fade-up">
              <span className="highlighted-heading ">
                Generate stunning invoices in under 60 seconds.
              </span>
            </Typography>
            <Typography className="content-subheading mt-30" data-aos="fade-up" data-aos-delay="100">
              Simplify Invoicing with Invoicean: Your All-in-One Solution
            </Typography>

            <Typography className="content text-display mt-50" data-aos="fade-up" data-aos-delay="200">
              Take a tour of Invoicean
            </Typography>

            <iframe
              src="https://xd.adobe.com/embed/3ef9866a-78b5-4dd4-b12f-19aba3bc2d57-6baa/"
              frameborder="0"
              title="Simplify Invoicing with Invoicean"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default DisplaySection;
