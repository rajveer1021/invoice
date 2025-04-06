import { Box, Button } from "@mui/material";
import React from "react";

const GoogleForm = ({ URL, styleClassName }) => {
  const openBugReportForm = () => {
    window.open(`${URL}`, "_blank");
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={openBugReportForm}
        className={styleClassName}
      >
        Report a Bug
      </Button>
    </Box>
  );
};

export default GoogleForm;
