import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToast from "../useToast";
import { BASE_URL } from "../../constant";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { showSuccessToast } = useToast();
  const navigate = useNavigate();

  const login = async (values, resetForm) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/users/sign_in`, {
        email: values.email,
        password: values.password,
      });

      const { authorization } = response.headers;
      const { "access-token": accessToken, client, uid } = response.headers;

      const headersObjTwo = { access_token: accessToken, client, uid };
      const headersObj = { authorization };

      if (response.data.data.profile_completed === true) {
        if (response.data.data.subscription_status === false) {
          navigate("/subscription");
        }
        else {
          navigate("/dashboard");
        }
      }
      else {
        navigate("/business-info");
      }

      resetForm();

      showSuccessToast(
        "Welcome back! You have successfully logged in. Happy Invoicing..!"
      );

      const userData = response?.data?.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userHeaderData", JSON.stringify(headersObj));
      localStorage.setItem("userAuthToken", JSON.stringify(headersObjTwo));
    } catch (error) {
      if (error?.response?.data?.success === "error") {
        setErrorMessage(error?.response?.data?.errors);
      } else {
        setErrorMessage("An error occurred while processing your request.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, errorMessage };
};

export default useLogin;