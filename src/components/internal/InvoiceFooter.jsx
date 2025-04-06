import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import logo from "../../assets/logo/logo-dark.png";

const InvoiceFooter = ({ email }) => {
  return (
    <>
      <Typography textAlign="start" className="mt-18 mb-18 font-14">
        <strong>Email:</strong> {email}
      </Typography>
      <Stack
        direction="row"
        alignItem="center"
        justifyContent="flex-end"
        spacing={1}
        className="mb-30"
      >
        <Typography textAlign="end" className="mt-18 mb-18 font-12">
          Powered by
        </Typography>
        <Box className="invoice-footer-logo ">
          <Box
            component="img"
            src={logo}
            className="logo"
            alt="invoice-footer-logo"
          />
        </Box>
      </Stack>
    </>
  );
};

export default InvoiceFooter;
