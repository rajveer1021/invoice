import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordUpdateMutation } from "../../services";
import useToast from "../useToast";

const useSetPassword = (userEmail, userOTP) => {
  const [setPasswordLoading, setIsLoading] = useState(false);
  const [setPassworderrorMessage, setErrorMessage] = useState("");
  const { showSuccessToast } = useToast();
  const navigate = useNavigate();

  const [setPassword] = useForgotPasswordUpdateMutation();

  const updatePassword = async (values, resetForm, loggedin) => {
    setIsLoading(true);
    try {
      const params = {
        email: userEmail,
        password: values.password,
        password_confirmation: values.password_confirmation,
        otp: userOTP,
      };
      const response = await setPassword(params);
      if (response?.data) {
        showSuccessToast(response?.data?.message);
        resetForm();
        navigate("/login");
      } else if (response?.error) {
        setErrorMessage(response?.error?.data?.errors?.confirmation_otp[0]);
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return { updatePassword, setPasswordLoading, setPassworderrorMessage };
};

export default useSetPassword;
