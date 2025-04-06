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
import { useLazyLogoutQuery } from "../../../services/Api";
import { CustomButton } from "../../shared/CustomButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogoutDialog = ({ dialogeOpen, setDialogeOpen }) => {
  const handleDialogeopen = () => {
    setDialogeOpen(!dialogeOpen);
  };

  const navigate = useNavigate();

  const { showErrorToast } = useToast();
  const [logout,{isLoading}] = useLazyLogoutQuery();

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response?.isSuccess && response?.data?.status === "success") {
        localStorage.clear();
        navigate("/login");
      } else if (response.error && response?.isError) {
        if (response?.error?.data?.success === "error") {
          showErrorToast(response?.error?.data?.errors);
        } else {
          showErrorToast("An error occurred while logging out.");
        }
      }
    } catch (error) {
      showErrorToast("An error occurred while logging out.");
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
        <DialogTitle className="dialogTitle">Confirm Logout</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to log out?
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
            title={isLoading ? "Please wait...": "Yes, Logout"}
            handleClick={handleLogout}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LogoutDialog;
