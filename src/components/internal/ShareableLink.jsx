import React, { useState } from "react";
import { Alert } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ShareableLink = ({ content }) => {
  const [onSuccess, setOnSuccess] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setOnSuccess(true);
      setTimeout(() => {
        setOnSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };
  return (
    <>
      <Grid item xs={12}>
        <Box className="sharedLinkContainer mt-30">
          <Alert
            icon={
              <ContentCopyIcon
                fontSize="inherit"
                onClick={handleCopyClick}
                cursor="pointer"
              />
            }
            severity="success"
            className="sharedLink"
          >
            {content}
          </Alert>
          {onSuccess && (
            <Typography className="copiedText mt-5">Link copied!</Typography>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default ShareableLink;
