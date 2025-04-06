import { Box, Container, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import Icongmail from "../../assets/icon/Icongmail.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import { initialValuesForOTPScreen } from "../../constant";
import { ValidationforOTPpage } from "../../schema";
import InputField from "./fields/InputField";
import { ErrorAlert } from "./Alert";
import { CustomButton } from "./CustomButton";
import { useForgotPasswordEmailMutation } from "../../services";
import useToast from "../../hooks/useToast";

const OTPVerfication = ({ userEmail, verfiyOTP, errorMessage, isLoading }) => {
  const [ForgotPasswordEmail] = useForgotPasswordEmailMutation();
  const [resendLoading, setResendLoading] = useState(false);

  const { showSuccessToast, showErrorToast } = useToast();

  const resendOTP = async () => {
    setResendLoading(false);
    try {
      const params = {
        email: userEmail,
      };
      const response = await ForgotPasswordEmail(params);
      if (response?.data) {
        showSuccessToast(response?.data?.message);
      } else if (response?.error) {
        showErrorToast("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      showErrorToast("An error occurred while processing your request.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Box className="forgot-password">
          <Box className="icon-container mt-50">
            <Box component="img" src={Icongmail} className="icon" />
          </Box>
          <Typography className="heading mt-30">OTP verification</Typography>
          <Typography className="subHeading mt-10">
            {`we sent a code to ${userEmail}`}
          </Typography>
          <Box className="login-form mt-30">
            <Formik
              initialValues={initialValuesForOTPScreen}
              validationSchema={ValidationforOTPpage}
              onSubmit={(values, { resetForm }) => verfiyOTP(values, resetForm)}
            >
              {({ values, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="login-form">
                  <InputField
                    id="otp_code"
                    name="otp_code"
                    label="OTP code"
                    value={values?.otp_code}
                  />

                  {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                  <Box className="button-container">
                    <CustomButton
                      title={isLoading ? "Verifying..." : "Verify OTP code"}
                      styles="button submitButton pnimary-btn mt-18"
                    />
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
          <Typography
            onClick={() => resendOTP()}
            className="redirect-link mt-50"
          >
            {!resendLoading ? (
              <>
                Resend <ReplayIcon className="back-icon ml-10" />
              </>
            ) : (
              "Sending..."
            )}
          </Typography>

          <Typography
            component={Link}
            to={"/login"}
            className="redirect-link mt-50"
          >
            <ArrowBackIcon className="back-icon mr-10" />
            back to log in
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default OTPVerfication;
