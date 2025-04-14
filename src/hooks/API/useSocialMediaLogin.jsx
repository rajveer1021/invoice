import useToast from "../useToast";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";
import { useNavigate } from "react-router-dom";

const useSocialMediaLogin = () => {
  const [SocialMediaLoading, setIsLoading] = useState(false);
  const { showErrorToast, showSuccessToast } = useToast();
  const [subscribe, setSubscribed] = useState(false)
  const navigate = useNavigate();

  const socialMediaLogin = async (token, provider) => {
    setIsLoading(true);
    try {
      const params = {
        token: token,
        provider: provider,
      };

      const authResponse = await axios.post(
        `${BASE_URL}/users/social_login`,
        params
      );

      const { authorization } = authResponse.headers;
      const { "access-token": accessToken, client, uid } = authResponse.headers;

      const headersObjTwo = { access_token: accessToken, client, uid };
      const headersObj = { authorization };
      if (authResponse.data.data.profile_completed === true) {
        if (subscribe) {
          navigate("/dashboard");
        }
        else {
          navigate("/subscription");
        }
      }
      else {
        navigate("/business-info");
      }
      showSuccessToast(
        "Welcome back! You have successfully logged in. Happy Invoicing..!"
      );

      const userData = authResponse?.data?.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userHeaderData", JSON.stringify(headersObj));
      localStorage.setItem("userAuthToken", JSON.stringify(headersObjTwo));
    } catch (error) {
        showErrorToast(error?.message);
      } finally {
      setIsLoading(false);
    }
  };

  return { socialMediaLogin, SocialMediaLoading };
};

export default useSocialMediaLogin;
