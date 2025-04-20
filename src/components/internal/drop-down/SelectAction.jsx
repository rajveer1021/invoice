import React, { useEffect, useState } from "react";
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
import {
  useLazyGetPreviewInvoiceQuery,
  useUpdateInvoiceMutation,
} from "../../../services/Api";
import { useNavigate } from "react-router-dom";
import DeleteInvoiceDialog from "../dialog-box/DeleteInvoice";
import { useDownloadInvoicePDF } from "../../../hooks/useDownloadInvoicePDF";
import useIsPremiumPlan from "../../../hooks/API/useIsPremiumPlan";

const SelectAction = ({
  id,
  generateShareableLink,
  invoiceData,
  setStatusUpdate,
  setSent,
  invoiceName
}) => {
  const { isPremium } = useIsPremiumPlan();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleButtonClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [getPreviewInvoice, { data: invoiceValue }] =
    useLazyGetPreviewInvoiceQuery();

  const downloadInvoicePDF = useDownloadInvoicePDF();

  useEffect(() => {
    getPreviewInvoice({ invoice_id: id });
  }, [getPreviewInvoice, id]);

  const [updateInvoice] = useUpdateInvoiceMutation();
  const UpdateInvoiceAPI = async (id) => {
    const currentStatus = invoiceValue?.data?.invoice?.status;
    let newStatus;
    switch (currentStatus) {
      case "unpaid":
      case "draft":
      case "sent":
      case "due":
        newStatus = "paid";
        break;
      default:
        newStatus = "unpaid";
        break;
    }

    const { data, error } = await updateInvoice({
      invoice_id: id,
      invoice: {
        status: newStatus,
      },
    });

    if (data) {
      navigate(`/invoices/preview/${id}`);
      setStatusUpdate(true);
    } else if (error) {
      alert(error);
    }
  };

  const UpdateInvoiceSent = async (id) => {
    const { data, error } = await updateInvoice({
      invoice_id: id,
      invoice: {
        sent: true,
      },
    });

    if (data) {
      navigate(`/invoices/preview/${id}`);
      setSent(true);
    } else if (error) {
      alert(error);
    }
  };

  const [dialogeOpen, setDialogeOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();
  const handleDeleteInvoice = (id) => {
    setDialogeOpen(true);
    setDeleteId(id);
  };

  const setDupicate = () => {
    navigate(`/invoices/duplicate-invoice/${id}`);
  };

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
          {({ TransitionProps }) => (
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
                    generateShareableLink();
                  }}
                  className="font-12"
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  Share via Link
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    UpdateInvoiceAPI(id);
                  }}
                  className="font-12"
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  {invoiceValue?.data?.invoice?.status === "paid"
                    ? "Mark as Unpaid"
                    : "Mark as Paid"}
                </MenuItem>
                {!invoiceValue?.data?.invoice?.sent && (
                  <MenuItem
                    onClick={() => {
                      UpdateInvoiceSent(id);
                    }}
                    className="font-12"
                    sx={{ width: "100%", justifyContent: "center" }}
                  >
                    Mark as Sent
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    downloadInvoicePDF(id, invoiceName);
                  }}
                  className="font-12"
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  Download as PDF
                </MenuItem>

                {isPremium && (<MenuItem
                  onClick={() => {
                    setDupicate();
                  }}
                  className="font-12"
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  Duplicate Invoice
                </MenuItem>)}

                <MenuItem
                  onClick={() => {
                    handleDeleteInvoice(id);
                  }}
                  className="font-12"
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    color: "#990000",
                  }}
                >
                  Delete Invoice
                </MenuItem>
              </Menu>
            </Paper>
          )}
        </Popper>
        <DeleteInvoiceDialog
          dialogeOpen={dialogeOpen}
          setDialogeOpen={setDialogeOpen}
          id={deleteId}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default SelectAction;
