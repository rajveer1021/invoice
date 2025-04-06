import { Box, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo-dark.png";

const UnregisteredHeader = () => {
  return (
    <>
      <Box className="unregisteredHeader">
        <Container>
          <Box className="unregisteredHeader-container">
            <Box className="logo-container">
              <Link to="/">
                <Box component="img" src={logo} alt="Logo" className="logo" />
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UnregisteredHeader;
