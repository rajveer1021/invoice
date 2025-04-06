import React from "react";
import { Formik } from "formik";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ForgotpasswordIcon from "../../assets/icon/forgotPassword.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { initialValuesForEmail } from "../../constant";
import { ValidationforEmail } from "../../schema";
import InputField from "./fields/InputField";
import { ErrorAlert } from "./Alert";
import { CustomButton } from "./CustomButton";

const EmailVerification = ({
  sentVerification,
  errorMessage,
  isLoading,
  Content,
}) => {
  return (
    <>
      <Container>
        <Box className="forgot-password">
          <Box className="icon-container mt-50">
            <Box component="img" src={ForgotpasswordIcon} className="icon" />
          </Box>
          <Typography className="heading mt-30"> {Content}</Typography>
          <Typography className="subHeading mt-10">
            No worries, we'll send you {Content} instructions.
          </Typography>
          <Box className="login-form mt-30">
            <Formik
              initialValues={initialValuesForEmail}
              validationSchema={ValidationforEmail}
              onSubmit={(values, { resetForm }) =>
                sentVerification(values, resetForm)
              }
            >
              {({ values, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <InputField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                  />

                  {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                  <Box className="button-container">
                    <CustomButton
                      title={isLoading ? "Proceeding..." : "Proceed"}
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

export default EmailVerification;
