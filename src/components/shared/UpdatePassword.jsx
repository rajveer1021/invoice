import { Box, Container, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import messageIcon from "../../assets/icon/message.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { initialValuesForUpdatePassword } from "../../constant";
import { ValidationforUpdatePassword } from "../../schema";
import PasswordField from "./fields/PasswordField";
import { ErrorAlert } from "./Alert";
import { CustomButton } from "./CustomButton";

const UpdatePassword = ({ updatePassword, errorMessage, isLoading }) => {
  return (
    <>
      <Container>
        <Box className="forgot-password">
          <Box className="icon-container mt-50">
            <Box component="img" src={messageIcon} className="icon" />
          </Box>
          <Typography className="heading mt-30">Set new password</Typography>
          <Typography className="subHeading mt-10">
            Welcome to the set password screen. Your security is our priority.
          </Typography>
          <Box className="login-form mt-30">
            <Formik
              initialValues={initialValuesForUpdatePassword}
              validationSchema={ValidationforUpdatePassword}
              onSubmit={(values, { resetForm }) =>
                updatePassword(values, resetForm)
              }
            >
              {({ values, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Stack direction="column" spacing={1.5}>
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

                  {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                  <Box className="button-container">
                    <CustomButton
                      title={isLoading ? "Updating..." : "Update password"}
                      styles="button submitButton pnimary-btn mt-18"
                    />
                  </Box>
                </form>
              )}
            </Formik>
          </Box>

          <Typography
            component={Link}
            to={"/login"}
            className="redirect-link mt-50"
          >
            <ArrowBackIcon className="back-icon mr-10" />
            back to log in
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default UpdatePassword;
