import { Box, Container, Typography } from "@mui/material";
import React from "react";

const BannerSection = ({content,heading}) => {
  return (
    <>
      <Box className="banner-section">
        <Container>
          <Box className="banner-wrapper" data-aos="flip-down">
            <Typography className="heading">
              {heading}
            </Typography>
           
            <Typography className="subheading mt-18">
              {content}
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BannerSection;
