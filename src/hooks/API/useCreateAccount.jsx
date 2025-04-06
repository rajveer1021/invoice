import { useState } from "react";
import { useRegistrationMutation } from "../../services";
import useToast from "../useToast";

const useCreateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [OTPscreen, setOTPscreen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { showSuccessToast } = useToast();

  const [sentRegistrationData] = useRegistrationMutation();

  const createAccount = async (values, resetForm) => {
    setIsLoading(true);
    try {
      const response = await sentRegistrationData({
        email: values?.email,
        password: values?.password,
        password_confirmation: values?.password_confirmation,
        first_name: values?.first_name,
        last_name: values?.last_name,
      }).unwrap();
      setUserEmail(values?.email);
      resetForm();
      setOTPscreen(true);
      showSuccessToast(response.message);
    } catch (error) {
      setErrorMessage(error.data.errors.full_messages[0]);
    } finally {
      setIsLoading(false);
    }
  };

  return { createAccount, isLoading, errorMessage, OTPscreen, userEmail };
};

export default useCreateAccount;
