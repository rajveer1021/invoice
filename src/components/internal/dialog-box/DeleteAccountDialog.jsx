import React, { useState, useRef } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  DialogTitle,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hooks/useToast";
import { useDeleteAccountMutation } from "../../../services/Api";
import { CustomButton } from "../../shared/CustomButton";
import PasswordField from "../../shared/fields/PasswordField";
import { Formik } from "formik";
import { validationForDeleteAccount } from "../../../schema";
import { initialValuesForDeleteAccount } from "../../../constant";
import { ErrorAlert } from "../../shared/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteAccountDialog = ({ dialogeOpen, setDialogeOpen }) => {
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const formikRef = useRef(); 

  const handleDialog = () => {
    setDialogeOpen(!dialogeOpen);
    formikRef.current?.resetForm();
    setErrorMessage("")
  };

  const navigate = useNavigate();

  const { showSuccessToast } = useToast();
  const [deleteAccount] = useDeleteAccountMutation();

  const handleDelete = async (values, resetForm) => {
    setIsloading(true);
    const params = {
      confirm_password: values.confirm_password,
    };
    try {
      const response = await deleteAccount(params);
      if (response?.data) {
        localStorage.clear();
        navigate("/login");
        showSuccessToast(response?.data?.message);
        resetForm();
      } else if (response.error) {
        setErrorMessage(response?.error?.data?.errors?.full_messages[0]);
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Box>
      <Dialog
        open={dialogeOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialog}
        aria-describedby="alert-dialog-slide-description"
        className="dialogBox"
      >
        <Formik
          innerRef={formikRef}
          initialValues={initialValuesForDeleteAccount}
          validationSchema={validationForDeleteAccount}
          onSubmit={(values, { resetForm }) => handleDelete(values, resetForm)}
        >
          {({ values, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle className="dialogTitle">
                Confirm Account Deletion?
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Typography>
                    Are you sure you want to delete your account?
                  </Typography>
                  <Typography className="mt-10">
                    This action is irreversible and will permanently delete all
                    your account information.
                  </Typography>
                  <Typography className="mt-18">
                    Please enter your password to confirm:
                  </Typography>
                  <Stack direction="column" spacing={1.5} className="mt-18">
                    <PasswordField
                      id="confirm_password"
                      name="confirm_password"
                      label="Confirm Password"
                      value={values.confirm_password}
                    />
                  </Stack>
                  {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <CustomButton
                  type="button"
                  styles="dialoge-button button outlined-dialoge-button"
                  handleClick={handleDialog}
                  title="Cancel"
                />
                <CustomButton
                  styles="dialoge-button button filled-dialoge-button"
                  title={isLoading ? "Please wait..." : "Yes, Delete"}
                />
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default DeleteAccountDialog;
