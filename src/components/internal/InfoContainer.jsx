import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import InfoSkeleton from './../shared/loader/InfoSkeleton';


const InfoContainer = ({ title, value, loading, arrow, arrowStatus }) => {
  return (
    <>
      {loading ? (
        <InfoSkeleton />
      ) : (
        <Box className="InfoContainer">
          <Typography className="title">{title}</Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography className="title"><strong>{value}</strong></Typography>
            {arrowStatus === "decreasing" ? (
              arrow === "0" ? (
                <Typography className="center downIcon">{arrow}</Typography>
              ) : (
                <Typography className="center downIcon">
                  <ArrowDownwardIcon className="downIcon" />
                  {arrow}
                </Typography>
              )
            ) : (
              <Typography className="center upIcon">
                <ArrowUpwardIcon className="upIcon" />
                {arrow}
              </Typography>
            )}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default InfoContainer;
