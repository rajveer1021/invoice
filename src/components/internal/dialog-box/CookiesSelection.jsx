import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import ManageCookiesSection from "./ManageCookiesSection";
import useCookiesAPI from "../../../hooks/API/useCookiesAPI";

const CookiesSelection = () => {
  const [open, setOpen] = useState(true);
  const [manageOpen, setManageOpen] = useState(false);
  const syncGuidWithApi = useCookiesAPI();

  const handleClose = () => setOpen(false);
  const handleManageOpen = () => {
    setOpen(false);
    setManageOpen(true);
  };

  const handleRejectAll = () => {
    syncGuidWithApi(false);
    handleClose();
  };

  const handleAcceptAll = () => {
    syncGuidWithApi(true);
    handleClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        className="cookiesDialogBox"
        onClick={handleBackdropClick}
        disableEscapeKeyDown={true}
      >
        <DialogTitle className="cookiesHeading">
          Personalize your invoicing experience
        </DialogTitle>
        <DialogContent>
          <Typography className="cookiesInformation">
            We use cookies – small data files – to make our website as
            functional, relevant, and helpful for you as we can. Allowing
            cookies means we can personalize your invoicing journey and give you
            the best Invoicean experience.
          </Typography>
          <Typography className="cookiesInformation mt-18">
            You can also choose to reject cookies, or manage which ones are used
            while you browse. Disabling cookies means your experience of using
            our website will be limited to essential functionality only.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box>
              <Button
                onClick={handleManageOpen}
                variant="text"
                className="manageBtn"
              >
                Manage All
              </Button>
            </Box>
            <Stack spacing={2} direction={"row"}>
              <Button
                onClick={handleRejectAll}
                variant="outlined"
                className="rejectBtn"
              >
                Reject All
              </Button>
              <Button
                onClick={handleAcceptAll}
                variant="contained"
                className="acceptBtn"
              >
                Accept All
              </Button>
            </Stack>
          </Stack>
        </DialogActions>
      </Dialog>

      {manageOpen && (
        <ManageCookiesSection
          isOpen={manageOpen}
          handleClose={() => setManageOpen(false)}
        />
      )}
    </>
  );
};

export default CookiesSelection;
