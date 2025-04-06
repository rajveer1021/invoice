import { useState } from "react";
import { useSendOTPMutation } from "../../services";
import useToast from "../useToast";

const useSendOTP = (userEmail) => {
  const [checking, setChecking] = useState();
  const { showSuccessToast, showErrorToast } = useToast();

  const [sendOTP] = useSendOTPMutation();

  const SendOTP = async () => {
    setChecking(userEmail);
    try {
      const params = {
        email: userEmail,
      };
      const response = await sendOTP(params);
      if (response?.data) {
        showSuccessToast(response?.data?.message);
      } else if (response?.error) {
        showErrorToast("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      showErrorToast("An error occurred while processing your request.");
    } finally {
      setChecking(false);
    }
  };

  return { SendOTP, checking };
};

export default useSendOTP;
