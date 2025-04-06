import React from "react";
import GoogleForm from "../../internal/GoogleForm";
import { Box, Container, Grid, Typography } from "@mui/material";

const BugReport = () => {
  return (
    <>
      <Box className="BugReport-section" >
        <Container>
          <Box className="BugReport-wrapper">
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Typography className="heading">Report Bug !</Typography>
                <Typography className="subheading mt-18">
                  We strive to provide you with the best possible experience.
                  Your feedback is invaluable in helping us improve our
                  services. If you encounter any issues, glitches, or unexpected
                  behavior while using our platform, we encourage you to report
                  them to us. Your input helps us identify and resolve issues
                  promptly, ensuring a smooth and seamless user experience for
                  all.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box className="formButton">
                  <GoogleForm
                    URL="https://docs.google.com/forms/d/e/1FAIpQLScTSt6DW03bf7k02QegBC_6iJ4yMjUNQiD8_6l49QqJATyR9A/viewform?usp=sf_link"
                    styleClassName="button googleFromButton mt-18"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BugReport;
