import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Popper,
  Paper,
  ClickAwayListener,
  Box,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDownloadInvoicePDF } from "../../../hooks/useDownloadInvoicePDF";

const ShareAction = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleButtonClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const downloadInvoicePDF = useDownloadInvoicePDF();

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box className="actionDropdown">
        <Button
          onClick={handleButtonClick}
          variant="contained"
          aria-describedby={open ? "dropdown" : undefined}
          endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          className="actionButton button"
        >
          Action
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          role={undefined}
          transition
          disablePortal
          style={{
            minWidth: "7.6875rem",
            maxWidth: "7.6875rem",
            width: "100%",
          }}
        >
          {({ TransitionProps, placement }) => (
            <Paper
              {...TransitionProps}
              square
              style={{
                minWidth: "7.6875rem",
                maxWidth: "7.6875rem",
                width: "100%",
              }}
            >
              <Menu
                id="dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                style={{
                  minWidth: "7.6875rem",
                  maxWidth: "9.6875rem",
                  width: "100%",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuItemClick("Option 2");
                    downloadInvoicePDF(data?.data?.invoice?.id,data?.data?.invoice?.invoice_name);
                  }}
                  className="font-12"
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  Download as PDF
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    window.print();
                  }}
                  className="font-12"
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  Print invoice
                </MenuItem>
              </Menu>
            </Paper>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default ShareAction;
