import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const TotalAmountSection = ({
  sum,
  TotalAmount,
  selectedCurrency,
  boxBackgroundColor,
  textColor,
}) => {
  return (
    <>
      <Grid container>
        <Grid item sm={6} md={6} xs={12} />
        <Grid item sm={6} md={6} xs={12}>
          <Box className="amountContainer">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="mt-10"
              paddingInline={{ xs: 0, sm: 2 }}
            >
              <Typography className="font-12">Subtotal</Typography>
              <Typography className="font-12 center">
                {selectedCurrency?.code}{" "}
                {sum.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="mt-10"
              paddingInline={{ xs: 0, sm: 2 }}
            >
              <Typography>
                <span className="font-12 font-weight-medium">Total</span>
              </Typography>
              <Typography>
                <span className="font-12 center font-weight-medium">
                  {selectedCurrency?.code}{" "}
                  {Number(TotalAmount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="mt-10 totalAmountContainer"
              sx={{ border: `1px solid ${boxBackgroundColor}` }}
            >
              <Typography
                className="flag"
                sx={{
                  background: boxBackgroundColor || "#e2e2e2",
                  color: textColor,
                }}
              >
                <span className="font-14 font-weight-medium">Balance</span>
              </Typography>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                marginLeft={1}
                backgroundColor="#ffffff"
                height="90%"
              >
                <Typography>
                  <span className="center font-14 flagAmount font-weight-medium">
                    {selectedCurrency?.code}{" "}
                    {Math.round(TotalAmount).toLocaleString()}
                  </span>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TotalAmountSection;
