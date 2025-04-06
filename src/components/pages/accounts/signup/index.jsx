import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Container,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { ValidationforRegistrationPage } from "../../../../schema";
import { initialValuesForRegistrationPage } from "../../../../constant";
import FullscreenLoader from "./../../../shared/loader/FullscreenLoader";
import SideBox from "./../../../internal/side-box/index";
import InputField from "../../../shared/fields/InputField";
import PasswordField from "../../../shared/fields/PasswordField";
import { ErrorAlert } from "./../../../shared/Alert";
import UnregisteredHeader from "../../../internal/layout/UnregisteredHeader";
import { CustomButton } from "../../../shared/CustomButton";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AuthSection from "../../../internal/AuthSection";
import OTPVerfication from "../../../shared/OTPVerfication";
import useCheckLoginDetails from "../../../../hooks/useCheckLoginDetails";
import useVerifyOTP from "../../../../hooks/API/useVerifyOTP";
import useCreateAccount from "../../../../hooks/API/useCreateAccount";
import useSocialMediaLogin from "../../../../hooks/API/useSocialMediaLogin";

const Signup = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  const { invalidScreen } = useCheckLoginDetails();

  const { createAccount, isLoading, errorMessage, OTPscreen, userEmail } =
    useCreateAccount();
  const { VerifyOtp, OTPLoading, OTPerrorMessage } = useVerifyOTP(userEmail);

  const { socialMediaLogin, SocialMediaLoading } = useSocialMediaLogin();

  if (SocialMediaLoading) {
    return <FullscreenLoader />;
  }

  if (invalidScreen) {
    return <FullscreenLoader />;
  }

  if (OTPscreen) {
    return (
      <>
        <Box className="unregistered-wrapper">
          <OTPVerfication
            verfiyOTP={VerifyOtp}
            errorMessage={OTPerrorMessage}
            isLoading={OTPLoading}
            userEmail={userEmail}
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box className="unregistered-wrapper">
        <Grid container spacing={{ xs: 0, md: 2 }} rowSpacing={0}>
          <Grid item xs={12} md={6}>
            <SideBox
              content="Already have an account?"
              url="/login"
              btnTitle="Login"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box className="content-container">
              <UnregisteredHeader />
              <Box className="form-details-container">
                <Container className="signup-form-container">
                  <Typography className="heading">
                    Welcome to Invoicean
                  </Typography>
                  <Typography className="subHeading mt-10 mb-30">
                    Thank you for choosing invoicely.
                    <br />
                    You're just a few steps away from unlimited invoicing.
                  </Typography>
                  <Formik
                    initialValues={initialValuesForRegistrationPage}
                    validationSchema={ValidationforRegistrationPage}
                    onSubmit={(values, { resetForm }) =>
                      createAccount(values, resetForm)
                    }
                  >
                    {({ values, handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={1}
                          className="mt-10"
                        >
                          <InputField
                            id="first_name"
                            name="first_name"
                            label="First name"
                            type="text"
                            value={values.first_name}
                          />

                          <InputField
                            id="last_name"
                            name="last_name"
                            label="Last name"
                            type="text"
                            value={values.last_name}
                          />
                        </Stack>
                        <Stack className="mt-10">
                          <InputField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={values.email}
                          />
                        </Stack>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={1}
                          className="mt-10"
                        >
                          <PasswordField
                            id="password"
                            name="password"
                            label="Password"
                            value={values.password}
                          />

                          <PasswordField
                            id="password_confirmation"
                            name="password_confirmation"
                            label="Confirm password"
                            value={values.password_confirmation}
                          />
                        </Stack>

                        <Typography className=" subHeading mt-18">
                          By signing up, you agree to our terms and privacy
                          policy.
                        </Typography>
                        {errorMessage && (
                          <ErrorAlert errorMessage={errorMessage} />
                        )}
                        <CustomButton
                          title={isLoading ? "Loading..." : "Register"}
                          styles="unRegisterButton button button-primary mt-18"
                          endIcon={
                            <ArrowRightAltIcon
                              sx={{ fontSize: "1.5rem !important" }}
                            />
                          }
                        />
                      </form>
                    )}
                  </Formik>
                  <AuthSection socialMediaLogin={socialMediaLogin} />
                  {isMobile && (
                    <Box className="mt-30 font-14">
                      Already have an account??{" "}
                      <span>
                        <Link to="/login" className="text-primary">
                          Login
                        </Link>
                      </span>
                    </Box>
                  )}
                </Container>
              </Box>

              {isMobile && <Box className="bottom-line" />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Signup;
