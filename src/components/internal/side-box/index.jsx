import { Box, Typography } from "@mui/material";
import React from "react";
import logoSquare from "../../../assets/logo/logo-square-light.png";
import { CustomButton } from "../../shared/CustomButton";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const SideBox = ({ content, btnTitle, url }) => {
  return (
    <>
      <Box className="side-box">
        <>
        <Box className="box-image">
            <Box component="img" className="logo" src={logoSquare} alt="invoicean-logo-square"  />
        </Box>
          <Box className="content">
            <Typography className="label mt-30">{content}</Typography>
            <CustomButton
              title={btnTitle}
              styles="unRegisterButton button-light button mt-18"
              url={url}
              endIcon={
                <ArrowRightAltIcon sx={{ fontSize: "1.5rem !important" }} />
              }
            />
          </Box>
        </>
      </Box>
    </>
  );
};

export default SideBox;
