import { useState } from "react";
import { useLazyForgotPasswordOTPQuery } from "../../services";

const useForgotPasswordOTP = (userEmail) => {
  const [OTPLoading, setIsLoading] = useState(false);
  const [OTPerrorMessage, setErrorMessage] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [updatePasswordScreen, setUpdatePasswordScreen] = useState(false);

  const [ForgotPasswordOTP] = useLazyForgotPasswordOTPQuery();

  const VerifyOtp = async (values, resetForm) => {
    setIsLoading(true);
    try {
      const params = {
        email: encodeURIComponent(userEmail),
        otp: values?.otp_code,
      };
      const response = await ForgotPasswordOTP(params);
      if (response?.data) {
        setUserOTP(values.otp_code);
        setUpdatePasswordScreen(true);
        resetForm();
      } else if (response?.error) {
        setErrorMessage("Failed to verify OTP. Please try again!");
        setUpdatePasswordScreen(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
      setUpdatePasswordScreen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    VerifyOtp,
    OTPLoading,
    OTPerrorMessage,
    updatePasswordScreen,
    userOTP,
  };
};

export default useForgotPasswordOTP;
