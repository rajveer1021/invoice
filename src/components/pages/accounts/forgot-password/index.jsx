import React from "react";
import { Box } from "@mui/material";
import { useForgotPasswordEmailMutation } from "../../../../services";
import UpdatePassword from "../../../shared/UpdatePassword";
import OTPVerfication from "../../../shared/OTPVerfication";
import UnregisteredHeader from "./../../../internal/layout/UnregisteredHeader";
import EmailVerification from "../../../shared/EmailVerification";
import useConfirmAccount from "../../../../hooks/API/useConfirmAccount";
import useSetPassword from "../../../../hooks/API/useSetPassword";
import useForgotPasswordOTP from "../../../../hooks/API/useForgotPasswordOTP";

const ForgotPassword = () => {
  const [ForgotPasswordEmail] = useForgotPasswordEmailMutation();

  const { confirmAccount, isLoading, errorMessage, OTPscreen, userEmail } =
    useConfirmAccount(ForgotPasswordEmail);

  const {
    VerifyOtp,
    OTPLoading,
    OTPerrorMessage,
    updatePasswordScreen,
    userOTP,
  } = useForgotPasswordOTP(userEmail);

  const { updatePassword, setPasswordLoading, setPassworderrorMessage } =
    useSetPassword(userEmail, userOTP);

  return (
    <>
      <UnregisteredHeader />
      <Box className="front-screen-container" sx={{ background: "#ffffff" }}>
        {!OTPscreen && !updatePasswordScreen && (
          <EmailVerification
            sentVerification={confirmAccount}
            errorMessage={errorMessage}
            isLoading={isLoading}
            Content="Forgot Password?"
          />
        )}
        {OTPscreen && !updatePasswordScreen && (
          <OTPVerfication
            verfiyOTP={VerifyOtp}
            errorMessage={OTPerrorMessage}
            isLoading={OTPLoading}
            userEmail={userEmail}
          />
        )}
        {OTPscreen && updatePasswordScreen && (
          <UpdatePassword
            updatePassword={updatePassword}
            errorMessage={setPassworderrorMessage}
            isLoading={setPasswordLoading}
          />
        )}

        <Box className="forgotpassword-tab-container">
          <Box
            className={
              !OTPscreen && !updatePasswordScreen
                ? "active-forgot-password-tab forgotpassword-tab mr-5"
                : "forgotpassword-tab mr-5"
            }
          />
          <Box
            className={
              OTPscreen && !updatePasswordScreen
                ? "active-forgot-password-tab forgotpassword-tab mr-5"
                : "forgotpassword-tab mr-5"
            }
          />
          <Box
            className={
              OTPscreen && updatePasswordScreen
                ? "active-forgot-password-tab forgotpassword-tab mr-5"
                : "forgotpassword-tab mr-5"
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
