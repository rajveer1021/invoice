import {
  Box,
  Grid,
  Stack,
  useMediaQuery,
  Typography,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import TopHeader from "./../../shared/TopHeader";
import { ErrorAlert } from "./../../shared/Alert";
import Heading from "./../../shared/Heading";
import SideHeader from "../../internal/layout/side-header";
import SharedHeader from "../../internal/SharedHeader";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import useAuthentication from "../../../hooks/useAuthentication";
import { ValidationforUpdatePassword } from "../../../schema/index";
import { initialValuesForUpdatePassword } from "../../../constant";
import PasswordField from "../../shared/fields/PasswordField";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { getUserDataFromLocalStorage } from "../../../services/Utils";
import { useForgotPasswordUpdateMutation } from "../../../services";
import { CustomButton } from "../../shared/CustomButton";

const SetPassword = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const navigate = useNavigate();
  const mobile = useMediaQuery("(max-width:600px)");
  const [isloading, setIsloading] = useState(false);

  const { showSuccessToast } = useToast();

  const VerificationOTP = localStorage.getItem("VerificationOTP");
  const userData = getUserDataFromLocalStorage();

  const [setPassword] = useForgotPasswordUpdateMutation();
  const [errorMessage, setErrorMessage] = useState();

  const updatePassword = async (values, resetForm) => {
    setIsloading(true);
    try {
      const params = {
        email: userData?.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        otp: VerificationOTP,
      };
      const response = await setPassword(params);
      if (response?.data) {
        showSuccessToast(response?.data?.message);
        localStorage.removeItem("VerificationOTP");
        resetForm();
        navigate("/accounts");
      } else if (response?.error) {
        setErrorMessage(response?.error?.data?.errors?.confirmation_otp[0]);
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={3} md={3} lg={2.2} xl={2}>
          a{!mobile && <SideHeader />}
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
          <Formik
            initialValues={initialValuesForUpdatePassword}
            validationSchema={ValidationforUpdatePassword}
            onSubmit={(values, { resetForm }) =>
              updatePassword(values, resetForm)
            }
          >
            {({ values, handleSubmit }) => (
              <form>
                <TopHeader
                  title="Set password"
                  RedirectButtonTttle={
                    isloading ? "loading..." : "Set Password"
                  }
                />
                <Box className="layout change-password">
                  {mobile && <SharedHeader content="Set Password" />}
                  <Grid container>
                    <Grid item xs={12}>
                      <Box className="mt-30">
                        <Alert severity="warning" className="mb-30">
                          <strong>Note :</strong> Set your password to keep your
                          account secure. Do not share your password with
                          anyone.
                        </Alert>
                        <Heading title={"Set Password"} />
                        <Typography className="mt-18">
                          Unlock Your Account's Potential: Set Your Password
                          Below!
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className="change-password-container">
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                          alignItems="center"
                        >
                          <Box className="password-field">
                            <PasswordField
                              id="password"
                              name="password"
                              label="Password"
                              styles="mt-18"
                              value={values.password}
                            />
                            <PasswordField
                              id="password_confirmation"
                              name="password_confirmation"
                              label="Confirm Password"
                              styles="mt-18"
                              value={values.password_confirmation}
                            />
                          </Box>
                        </Stack>

                        {errorMessage && (
                          <ErrorAlert errorMessage={errorMessage} />
                        )}
                        <CustomButton
                          title={
                            isloading ? "Setting Password..." : "Set Password"
                          }
                          styles="button submitButton mt-18"
                          handleClick={handleSubmit}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default SetPassword;
