import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Logo from "../../../assets/logo/logo-dark.png";
import ShareAction from "../drop-down/ShareAction";
import { Link } from "react-router-dom";

const ShareHeaderLink = ({ data }) => {
  return (
    <>
      <Box position="fixed" className="header">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={6} sm={8} className="headerContainer">
              <Box className="desktopLogoImageContainer center">
                <Link to="/">
                  <Box
                    component="img"
                    src={Logo}
                    alt="logo"
                    className="logoImage"
                  />
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} className="headerContainerLogout">
              <ShareAction data={data} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ShareHeaderLink;
