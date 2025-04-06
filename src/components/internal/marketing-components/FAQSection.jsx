import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { PopupButton } from "react-calendly";

const FAQSection = () => {
  return (
    <>
      <Box className="FAQ-section">
        <Container>
          <Box className="FAQ-wrapper" data-aos="fade-up">
            <Grid container>
              <Grid item xs={12} sm={10}>
                <Typography className="heading">
                  Partner with Us for Custom Invoicing Solutions !
                </Typography>
                <Typography className="subheading mt-18">
                  Expand your invoicing capabilities with features designed just
                  for you. At Invoicean, we understand that every business has
                  unique needs. That’s why we offer personalized development
                  services to create add-on features that fit precisely with
                  your workflow, enhancing your productivity and efficiency.
                  Join hands with us and let’s build an invoicing ecosystem that
                  drives mutual success.{" "}
                </Typography>

                <PopupButton
                  url="https://calendly.com/invoicean/support"
                  text="Schedule a Meeting"
                  color="#0069ff"
                  textColor="#ffffff"
                  rootElement={document.getElementById("root")}
                  className="button marketingButton mt-30"
                />
                <Typography className="subheading mt-30">
                  Let’s discuss how we can customize Invoicean to better serve
                  your business. <br /> Schedule a meeting with our experts and
                  take the first step towards a more efficient invoicing system.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} />
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FAQSection;
