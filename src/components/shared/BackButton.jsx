import { Box, Typography } from "@mui/material";
import React from "react";
import useGoBack from "../../hooks/useGoBack";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const BackButton = () => {
  const goBack = useGoBack();
  return (
    <>
      <Box className="invoiceTopContainer">
        <Typography className="backBtn center" onClick={goBack}>
          <KeyboardArrowLeftIcon sx={{fontSize:"1rem"}}/>
          {"Back"}
        </Typography>
      </Box>
    </>
  );
};

export default BackButton;
