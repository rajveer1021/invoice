import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToast from "../useToast";
import { BASE_URL } from "../../constant";
import { useLazyGetSubscriptionQuery } from "../../services/Api";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { showSuccessToast } = useToast();
  const navigate = useNavigate();
  const [checkSubscription] = useLazyGetSubscriptionQuery();

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
      
      const userData = response?.data?.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userHeaderData", JSON.stringify(headersObj));
      localStorage.setItem("userAuthToken", JSON.stringify(headersObjTwo));

      const subscriptionResult = await checkSubscription().unwrap();
      
      resetForm();

      if (!response.data.data.profile_completed) {
        navigate("/business-info");
      } else if (!subscriptionResult.active_subscription) {
        navigate("/subscription");
      } else {
        navigate("/dashboard");
        showSuccessToast(
          "Welcome back! You have successfully logged in. Happy Invoicing..!"
        );
      }
      
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