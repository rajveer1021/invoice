import { Typography } from "@mui/material";
import React from "react";

const Heading = ({ title, dangerText=false }) => {
  return (
    <>
     <Typography className={`genericHeading ${!dangerText ? "text-primary" : "text-danger"}`}>{title}</Typography>
    </>
  );
};

export default Heading;
