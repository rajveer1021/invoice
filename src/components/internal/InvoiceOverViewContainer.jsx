import { Box, Typography } from "@mui/material";
import React from "react";

const InvoiceOverViewContainer = ({ Heading, Amount, Unit }) => {
  return (
    <>
      <Box className="InvoiceOverViewContainer">
        <Typography className="heading">{Heading}</Typography>
        <Typography className="amount mt-10">
          <span className="font-14">USD</span> {Number(Amount).toFixed(2)}
        </Typography>
        <Box className="">
          <Typography className="unit center">
            {Unit} {Number(Unit) > 1 ? "Invoices" : "Invoice"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InvoiceOverViewContainer;
