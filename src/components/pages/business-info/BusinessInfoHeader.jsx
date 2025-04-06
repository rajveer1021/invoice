import { Box, Typography } from "@mui/material";
import React from "react";

const BusinessInfoHeader = ({ heading, subHeading }) => {
  return (
    <>
      <Box className="StepperHeaderContainer">
        <Typography className="heading">{heading}</Typography>
        <Box className="primary-line " />
        <Typography className="subHeading">{subHeading}</Typography>
      </Box>
    </>
  );
};

export default BusinessInfoHeader;
