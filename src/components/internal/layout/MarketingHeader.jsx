import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../shared/CustomButton";

const MarketingHeader = ({
  content,
  buttonTitle,
  url,
}) => {
  return (
    <>
      <Box className="sendInvoice-box">
        <Container>
          <Box className="sendInvoice-popup">
            <Typography className="content">
              {content}
              <span className="text-primary"> Invoicean</span> -{" "}
              <span className="text-display free-content">its free</span>
            </Typography>
            <CustomButton
              title={buttonTitle}
              styles="button marketing-NavButton pnimary-btn"
              url={url}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MarketingHeader;
