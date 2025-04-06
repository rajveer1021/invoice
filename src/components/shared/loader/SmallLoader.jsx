import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SmallLoader = ({ size, marginLeft='auto' }) => {
  return (
    <CircularProgress size={size} sx={{marginLeft: marginLeft}}/>
  );
};

export default SmallLoader;
