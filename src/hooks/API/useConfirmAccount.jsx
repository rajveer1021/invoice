import { useState } from "react";
import useToast from "../useToast";

const useConfirmAccount = (sendOTP) => {
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [OTPscreen, setOTPscreen] = useState(false);
  const { showSuccessToast } = useToast();

  const confirmAccount = async (values, resetForm) => {
    setIsLoading(true);
    try {
      const params = {
        email: values.email,
      };
      const response = await sendOTP(params).unwrap();
      setUserEmail(values.email);
      resetForm();
      setOTPscreen(true);
      showSuccessToast(response?.data?.message);
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.data?.errors[0]);
    } finally {
      setIsLoading(false);
    }
  };

  return { confirmAccount, isLoading, errorMessage, OTPscreen, userEmail };
};

export default useConfirmAccount;
