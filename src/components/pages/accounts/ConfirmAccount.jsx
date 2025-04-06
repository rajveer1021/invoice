import React from "react";
import UnregisteredHeader from "../../internal/layout/UnregisteredHeader";
import { Box } from "@mui/material";
import { useSendOTPMutation } from "../../../services";
import EmailVerification from "../../shared/EmailVerification";
import OTPVerfication from "../../shared/OTPVerfication";
import useConfirmAccount from "../../../hooks/API/useConfirmAccount";
import useVerifyOTP from "../../../hooks/API/useVerifyOTP";

const ConfirmAccount = () => {
  const [sendOTP] = useSendOTPMutation();

  const { confirmAccount, isLoading, errorMessage, OTPscreen, userEmail } =
    useConfirmAccount(sendOTP);

  const { VerifyOtp, OTPLoading, OTPerrorMessage } = useVerifyOTP(userEmail);

  return (
    <>
      <UnregisteredHeader />
      <Box className="front-screen-container" sx={{ background: "#ffffff" }}>
        {!OTPscreen && (
          <EmailVerification
            sentVerification={confirmAccount}
            errorMessage={errorMessage}
            isLoading={isLoading}
            Content={"Account Confirmation"}
          />
        )}
        {OTPscreen && (
          <OTPVerfication
            verfiyOTP={VerifyOtp}
            errorMessage={OTPerrorMessage}
            isLoading={OTPLoading}
            userEmail={userEmail}
          />
        )}
        <Box className="forgotpassword-tab-container">
          <Box
            className={
              !OTPscreen
                ? "active-forgot-password-tab forgotpassword-tab mr-5"
                : "forgotpassword-tab mr-5"
            }
          />
          <Box
            className={
              OTPscreen
                ? "active-forgot-password-tab forgotpassword-tab mr-5"
                : "forgotpassword-tab mr-5"
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default ConfirmAccount;
