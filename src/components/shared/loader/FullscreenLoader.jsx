import { Box } from "@mui/material";
import React from "react";

const FullscreenLoader = () => {
  return (
    <>
      <Box className="fullScreenLoader front-screen-container center">
        <Box className="spinner" />
      </Box>
    </>
  );
};

export default FullscreenLoader;
