import { Stack, Typography } from "@mui/material";
import React from "react";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import {
  FACEBOOK_AUTH_TOKEN,
  GOOGLE_AUTH_TOKEN,
  REDIRECT_URL,
} from "../../constant";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { CustomButton } from "../shared/CustomButton";
import useToast from "../../hooks/useToast";

const AuthSection = ({ socialMediaLogin }) => {
  const { showErrorToast } = useToast();

  return (
    <>
      <Typography className="subHeading mt-18 mb-18">or</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} className="" spacing={2}>
        <LoginSocialFacebook
          appId={FACEBOOK_AUTH_TOKEN}
          REDIRECT_URI={REDIRECT_URL}
          onResolve={(response) => {
            socialMediaLogin(response?.data?.accessToken, "facebook");
          }}
          onReject={(err) => {
            showErrorToast("An error occurred while processing your request");
          }}
        >
          <CustomButton
            title={"Login with Facebook"}
            styles="socialmedia-button button"
            startIcon={<FacebookIcon sx={{ fontSize: "1.5rem !important" }} />}
          />
        </LoginSocialFacebook>

        <LoginSocialGoogle
          client_id={GOOGLE_AUTH_TOKEN}
          REDIRECT_URI={REDIRECT_URL}
          scope="profile email"
          onResolve={(response) => {
            socialMediaLogin(response?.data?.access_token, "google");
          }}
          onReject={(err) => {
            showErrorToast("An error occurred while processing your request");
          }}
        >
          <CustomButton
            title={"Login with Google"}
            styles="socialmedia-button button"
            startIcon={<GoogleIcon sx={{ fontSize: "1.5rem !important" }} />}
          />
        </LoginSocialGoogle>
      </Stack>
    </>
  );
};

export default AuthSection;
