import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import {} from "../../services/Utils";

const ItemDetails = ({
  boxBackgroundColor,
  itemInfo,
  invoice,
  textColor,
  data,
}) => {
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        className="mt-10 itemsHeaderContainer"
      >
        <Typography className="itemsHeader">Description</Typography>
        <Box className="itemsHeader">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Typography className="itemData">Quantity</Typography>
            <Typography className="itemData">{"Rate"}</Typography>
            <Typography className="amountItemData">Amount</Typography>
          </Stack>
        </Box>
      </Stack>
      {itemInfo?.map((item) => (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="flex-start"
            justifyContent={"space-between"}
            className="mb-5 mt-5 itemsContainer"
          >
            <Typography
              className="item"
              dangerouslySetInnerHTML={{
                __html: item?.title ? item.title.replace(/\n/g, "<br>") : "",
              }}
            />
            <Box className="item">
              <Stack
                direction={"row"}
                alignItems={"flex-start"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Typography className="itemData">
                  {item?.quantity !== 0 && item?.quantity}
                </Typography>
                <Typography className="itemData">
                  {item?.rate !== "0.0" && Number(item?.rate).toFixed(2)}
                  <Typography className="itemDataUnit">
                    {item?.unit && `(${item?.unit})`}
                  </Typography>
                </Typography>
                <Box className="amountItemData">
                  {invoice?.currency} {Number(item?.amount).toFixed(2)}
                </Box>
              </Stack>
            </Box>
          </Stack>
        </>
      ))}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent={"space-between"}
        className="mt-10 subTotalContainer"
      >
        <Box className="items"></Box>
        <Box className="items">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box className="amountData">Sub-total</Box>
            <Box className="amountItemData center">
              {invoice?.currency}{" "}
              {Number(invoice?.subtotal).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent={"space-between"}
        className="mt-10 totalContainer"
      >
        <Box className="items"></Box>
        <Box className="items">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box className="amountData">Total</Box>
            <Box className="amountItemData center">
              {invoice?.currency}{" "}
              {Number(invoice?.total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Box>
          </Stack>
        </Box>
      </Stack>
      {invoice?.status === "paid" ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent={"space-between"}
          className="mt-10 totalContainer"
        >
          <Box className="items"></Box>
          <Box className="items">
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box className="amountData">Paid to date</Box>
              <Box className="amountItemData center">
                {invoice?.currency}{" "}
                {Math.round(data?.paid_to_date).toLocaleString()}
              </Box>
            </Stack>
          </Box>
        </Stack>
      ) : null}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent={"space-between"}
        className="mt-10 balanceContainer"
      >
        <Box className="items"></Box>
        <Box className="items">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            border={`1px solid ${boxBackgroundColor}`}
          >
            <Box
              className="amountTitle"
              sx={{
                backgroundColor: boxBackgroundColor,
                color: textColor,
              }}
            >
              Balance
            </Box>
            <Box className="amountItemData center">
              {invoice?.currency} {Math.round(data?.balance).toLocaleString()}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default ItemDetails;
