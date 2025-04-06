import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyOTPverificationQuery } from "../../services";
import useToast from "../useToast";

const useVerifyOTP = (userEmail) => {
  const [OTPLoading, setIsLoading] = useState(false);
  const [OTPerrorMessage, setErrorMessage] = useState("");

  const [OTPverification] = useLazyOTPverificationQuery();

  const { showSuccessToast } = useToast();
  const navigate = useNavigate();

  const VerifyOtp = async (values, resetForm) => {
    setIsLoading(true);
    try {
      const params = {
        email: encodeURIComponent(userEmail),
        otp: values?.otp_code,
      };
      const response = await OTPverification(params);
      if (response?.data) {
        showSuccessToast(response?.data?.message);
        navigate("/login");
        resetForm();
      } else if (response?.error) {
        setErrorMessage("Failed to verify OTP. Please try again!");
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    VerifyOtp,
    OTPLoading,
    OTPerrorMessage,
  };
};

export default useVerifyOTP;
