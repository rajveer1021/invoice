import React from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";

const UserDetailsSection = ({ user }) => {
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="flex-start"
        justifyContent={"space-between"}
        className=" mt-18"
      >
        <Box className="UserDetailsContainer">
          <Typography className="heading">{user?.company_name}</Typography>
          <Typography className="address">{user?.address}</Typography>
          <Typography className="address">
            {user?.company_email_address}
          </Typography>
          <Typography className="address">{user?.phone_no}</Typography>
          <Stack spacing={1} direction="row" useFlexGap flexWrap="wrap">
            <Typography className="address">{user?.city},</Typography>
            <Typography className="address">{user?.state},</Typography>
            <Typography className="address">{user?.postal_code}</Typography>
          </Stack>
          <Typography className="address">{user?.country}</Typography>
        </Box>
        <Box className="logoContainer">
          <img src={user?.company_logo} alt="Logo" className="logo" />
        </Box>
      </Stack>
    </>
  );
};

export default UserDetailsSection;
