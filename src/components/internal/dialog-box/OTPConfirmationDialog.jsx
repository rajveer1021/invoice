import {
  useForgotPasswordEmailMutation,
  useLazyForgotPasswordOTPQuery,
} from "../../../services";
import { getUserDataFromLocalStorage } from "../../../services/Utils";
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
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../shared/CustomButton";
import { Formik } from "formik";
import { ValidationforOTPpage } from "../../../schema";
import { initialValuesForOTPScreen } from "../../../constant";
import { ErrorAlert } from "../../shared/Alert";
import InputField from "../../shared/fields/InputField";
import useToast from "../../../hooks/useToast";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OTPConfirmationDialog = ({ dialogeOpen, setDialogeOpen }) => {
  const handleDialogeopen = () => {
    setDialogeOpen(!dialogeOpen);
  };
  const formikRef = useRef();

  const handleDialog = () => {
    setDialogeOpen(!dialogeOpen);
    formikRef.current?.resetForm();
  };

  const navigate = useNavigate();

  const { showSuccessToast } = useToast();

  const userData = getUserDataFromLocalStorage();

  const [ForgotPasswordOTP] = useLazyForgotPasswordOTPQuery();

  const [isloading, setIsloading] = useState(false);
  const [OTPloading, setOTPLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const VerifyOtp = async (values, resetForm) => {
    setIsloading(true);
    try {
      const params = {
        email: encodeURIComponent(userData?.email),
        otp: values?.otp_code,
      };
      const response = await ForgotPasswordOTP(params);
      if (response?.data) {
        localStorage.setItem("VerificationOTP", values?.otp_code);
        showSuccessToast(response?.data?.message);
        navigate("/accounts/set-password", { otpCode: values?.otp_code });
        resetForm();
      } else if (response?.error) {
        setErrorMessage("Failed to verify OTP. Please try again!");
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
    } finally {
      setIsloading(false);
    }
  };

  const [emailConfirmation] = useForgotPasswordEmailMutation();

  const handleSentOTP = async () => {
    setOTPLoading(true);
    try {
      const params = {
        email: userData?.email,
      };
      const response = await emailConfirmation(params).unwrap();
      showSuccessToast(response?.message);
    } catch (error) {
      setErrorMessage(
        error?.data?.message ||
          error?.data?.errors[0] ||
          "An error occurred while processing your request."
      );
    } finally {
      setOTPLoading(false);
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
          initialValues={initialValuesForOTPScreen}
          validationSchema={ValidationforOTPpage}
          onSubmit={(values, { resetForm }) => VerifyOtp(values, resetForm)}
        >
          {({ values, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle className="dialogTitle">
                OTP Verification
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Typography>
                    {`We've sent a one-time password (OTP) to your registered email address ${userData?.email} for verification.`}
                  </Typography>
                  <Stack direction="column" spacing={1.5} className="mt-18">
                    <InputField
                      id="otp_code"
                      name="otp_code"
                      label="OTP code"
                      value={values?.otp_code}
                    />
                    <Link
                      sx={{ textAlign: "end", cursor: "pointer" }}
                      underline="none"
                      onClick={handleSentOTP}
                    >
                      {OTPloading ? "Resending..." : "Resend OTP"}
                    </Link>
                  </Stack>
                  {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <CustomButton
                  styles="dialoge-button button outlined-dialoge-button"
                  handleClick={handleDialogeopen}
                  title="Cancel"
                  type="button"
                />
                <CustomButton
                  styles="dialoge-button button filled-dialoge-button"
                  title={isloading ? "Processing..." : "Yes, Verify"}
                />
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default OTPConfirmationDialog;
