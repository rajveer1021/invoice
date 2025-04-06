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
import { useLazyDeleteClientQuery } from "../../../services/Api";
import { CustomButton } from "../../shared/CustomButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteClient = ({
  dialogeOpen,
  setDialogeOpen,
  id,
  clientName,
  handleClientData,
}) => {
  const handleDialogeopen = () => {
    setDialogeOpen(!dialogeOpen);
  };

  const navigate = useNavigate();

  const [loading, setloading] = React.useState(false);

  const { showErrorToast, showSuccessToast } = useToast();
  const [deleteClient] = useLazyDeleteClientQuery();

  const handleDeleteClient = async () => {
    setloading(true)
    try {
      const response = await deleteClient({ id });
      if (response?.isSuccess) {
        handleDialogeopen();
        handleClientData();
        showSuccessToast("Client Deleted succesfully");
        navigate("/clients");
      } else if (response?.isError) {
        handleDialogeopen();
        showErrorToast("An error occurred while delete.");
      }
    } catch (error) {
      handleDialogeopen();
      showErrorToast("An error occurred while delete.");
    }finally{
      setloading(false)
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
        <DialogTitle className="dialogTitle">Confirm Client Delete</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete client <strong>{clientName}</strong>
            ?
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
            title={loading? "Deleting...":"Yes, Delete"}
            handleClick={handleDeleteClient}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteClient;
