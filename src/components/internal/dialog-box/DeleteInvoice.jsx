import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hooks/useToast";
import { useLazyDeleteInvoiceQuery } from "../../../services/Api";
import { CustomButton } from "../../shared/CustomButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteInvoice = ({ dialogeOpen, setDialogeOpen, id }) => {
  const handleDialogeopen = () => {
    setDialogeOpen(!dialogeOpen);
  };

  const navigate = useNavigate();

  const { showErrorToast } = useToast();
  const [deleteInvoice] = useLazyDeleteInvoiceQuery();

  const handleLogout = async () => {
    try {
      const response = await deleteInvoice({ id: id });
      if (response?.data?.status === "success") {
        navigate("/invoices");
        handleDialogeopen();
      }
    } catch (error) {
      showErrorToast("An error occurred while delete.");
    }
  };

  return (
    <Box>
      <Dialog
        open={dialogeOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogeopen}
        aria-describedby="alert-dialog-slide-description"
        className="dialogBox"
      >
        <DialogTitle className="dialogTitle">Confirm Delete</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this Invoice?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            styles="dialoge-button button outlined-dialoge-button"
            handleClick={handleDialogeopen}
            title="Cancel"
          />
          <CustomButton
            styles="dialoge-button button filled-dialoge-button"
            title="Yes, Delete"
            handleClick={handleLogout}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteInvoice;
