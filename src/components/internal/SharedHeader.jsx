import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const SharedHeader = ({ content }) => {
  return (
    <>
      <Box className="sharedHeader mt-18">
        <Typography className="ml-10 sharedHeader-content">
          {content}
        </Typography>
      </Box>
    </>
  );
};

export default SharedHeader;
