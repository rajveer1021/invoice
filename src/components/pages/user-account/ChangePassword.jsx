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
import { useChangePasswordMutation } from "../../../services/Api";
import TopHeader from "./../../shared/TopHeader";
import { ErrorAlert } from "./../../shared/Alert";
import Heading from "./../../shared/Heading";
import SideHeader from "../../internal/layout/side-header";
import SharedHeader from "../../internal/SharedHeader";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import useAuthentication from "../../../hooks/useAuthentication";
import { ValidationforChangePassword } from "../../../schema/index";
import { initialValuesForChangePassword } from "../../../constant";
import PasswordField from "../../shared/fields/PasswordField";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../shared/CustomButton";

const ChangePassword = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const navigate = useNavigate();
  const mobile = useMediaQuery("(max-width:600px)");
  const [isloading, setIsloading] = useState(false);

  const { showSuccessToast } = useToast();

  const [changePassword] = useChangePasswordMutation();
  const [errorMessage, setErrorMessage] = useState();

  const handleChangePassword = async (values, resetForm) => {
    setIsloading(true);
    try {
      const params = {
        current_password: values.current_password,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
      const response = await changePassword(params);
      if (response?.data) {
        showSuccessToast(response?.data?.message);
        resetForm();
        navigate("/accounts");
      } else if (response?.error) {
        setErrorMessage(response?.error?.data?.errors?.full_messages[0]);
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
          {!mobile && <SideHeader />}
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
          <Formik
            initialValues={initialValuesForChangePassword}
            enableReinitialize
            validationSchema={ValidationforChangePassword}
            onSubmit={(values, { resetForm }) =>
              handleChangePassword(values, resetForm)
            }
          >
            {({ values, handleSubmit }) => (
              <form>
                <TopHeader
                  title="Change password"
                  RedirectButtonTttle={
                    isloading ? "Changing..." : "Change Password"
                  }
                />
                <Box className="layout change-password">
                  {mobile && <SharedHeader content="Change Password" />}
                  <Grid container>
                    <Grid item xs={12}>
                      <Box className="mt-30">
                        <Alert severity="warning" className="mb-30">
                          <strong>Note :</strong> Changing your password
                          regularly helps keep your account secure. Do not share
                          your password with anyone.
                        </Alert>
                        <Heading title={"Change Password"} />
                        <Typography className="mt-18">
                          Empower Your Security: Update Your Password Now!
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
                              id="current_password"
                              name="current_password"
                              label="Current Password"
                              styles="mt-18"
                              value={values.current_password}
                            />
                            <PasswordField
                              id="new_password"
                              name="password"
                              label="New Password"
                              styles="mt-18"
                              value={values.password}
                            />
                            <PasswordField
                              id="confirm_new_password"
                              name="password_confirmation"
                              label="Confirm new Password"
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
                            isloading
                              ? "Changing Password..."
                              : "Change Password"
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

export default ChangePassword;
