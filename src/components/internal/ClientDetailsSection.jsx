import React from "react";
import { Typography, Box } from "@mui/material";
import { Stack } from "@mui/material";
import ClientDetails from "./ClientDetails";

const ClientDetailsSection = ({ client, invoice }) => {
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="flex-start"
        justifyContent={"space-between"}
        className=" mt-10"
      >
        <Box className="client-details">
          <Typography className="client-heading">To</Typography>
          <ClientDetails clientDetails={client} />
        </Box>
        <Box className="dateContainer">
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
            className="invocieDateContainer"
          >
            <Typography className="dateHeading">Invoice No.</Typography>
            <Typography className="date">{invoice?.invoice_number}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
            className="invocieDateContainer mt-5"
          >
            <Typography className="dateHeading">Invoice Date</Typography>
            <Typography className="date">{invoice?.invoice_date}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
            className="invocieDateContainer mt-5"
          >
            <Typography className="dateHeading">Due Date</Typography>
            <Typography className="date">
              {invoice?.invoice_due_date}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default ClientDetailsSection;
