import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Container,
} from "@mui/material";
import React from "react";
import { Formik } from "formik";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import {
  initialValuesForLogin,
  unregisteredlinks,
} from "./../../../../constant/index";
import { validationForLogin } from "./../../../../schema/index";
import FullscreenLoader from "./../../../shared/loader/FullscreenLoader";
import InputField from "../../../shared/fields/InputField";
import PasswordField from "../../../shared/fields/PasswordField";
import { ErrorAlert } from "../../../shared/Alert";
import SideBox from "./../../../internal/side-box/index";
import UnregisteredHeader from "../../../internal/layout/UnregisteredHeader";
import { CustomButton } from "../../../shared/CustomButton";
import AuthSection from "../../../internal/AuthSection";
import useCheckLoginDetails from "../../../../hooks/useCheckLoginDetails";
import useLogin from "../../../../hooks/API/useLogin";
import useSocialMediaLogin from "../../../../hooks/API/useSocialMediaLogin";

const Login = () => {
  const { invalidScreen } = useCheckLoginDetails();

  const isMobile = useMediaQuery("(max-width:900px)");

  const { login, isLoading, errorMessage } = useLogin();

  const { socialMediaLogin, SocialMediaLoading } = useSocialMediaLogin();

  if (SocialMediaLoading) {
    return <FullscreenLoader />;
  }

  if (invalidScreen) {
    return <FullscreenLoader />;
  }

  return (
    <>
      <Box className="unregistered-wrapper">
        <Grid container spacing={{ xs: 0, md: 2 }} rowSpacing={0}>
          <Grid item xs={12} md={6}>
            <Box className="content-container">
              <UnregisteredHeader />
              <Box className="form-details-container">
                <Container>
                  <Box className="form-container">
                    <Typography className="heading">
                      Hello ! Welcome back!
                    </Typography>
                    <Typography className="subHeading mt-10 mb-30">
                      Login with your data that your entered during
                      registration.
                    </Typography>

                    <Formik
                      initialValues={initialValuesForLogin}
                      validationSchema={validationForLogin}
                      onSubmit={(values, { resetForm }) =>
                        login(values, resetForm)
                      }
                    >
                      {({ values, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          <Stack direction="column" spacing={1.5}>
                            <InputField
                              id="email"
                              name="email"
                              label="Email"
                              type="email"
                              value={values.email}
                            />
                            <PasswordField
                              id="password"
                              name="password"
                              label="Password"
                              value={values.password}
                            />
                          </Stack>
                          {errorMessage && (
                            <ErrorAlert errorMessage={errorMessage} />
                          )}
                          <CustomButton
                            title={isLoading ? "Loading..." : "Login"}
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
                    <Box className="mt-30">
                      {unregisteredlinks.map((link, index) => (
                        <Box className="forgot-password-link" key={index}>
                          <Link to={link.to} className="link">
                            <ArrowRightAltIcon
                              sx={{
                                fontSize: "2rem",
                                marginRight: "0.5rem",
                              }}
                            />
                            {link.text}
                          </Link>
                        </Box>
                      ))}
                    </Box>
                    {isMobile && (
                      <Box className="mt-30 font-14">
                        Don’t have an account?{" "}
                        <span>
                          <Link to="/signup" className="text-primary">
                            Signup
                          </Link>
                        </span>
                      </Box>
                    )}
                  </Box>
                </Container>
              </Box>
              {isMobile && <Box className="bottom-line" />}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <SideBox
              content="Don’t have an account?"
              url="/signup"
              btnTitle="Signup"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
