import React, { useState, useEffect, useRef } from "react";
import TestimonialSection from "../../internal/marketing-components/TestimonialSection";
import MarketingFooter from "../../internal/layout/MarketingFooter";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import BannerSection from "../../internal/marketing-components/BannerSection";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import {
  GOOGLE_RECAPTCHA_SITEKEY,
  initialValuesForFeedback,
} from "../../../constant";
import { ValidationforFeedback } from "../../../schema";
import InputField from "../../shared/fields/InputField";
import { CustomButton } from "../../shared/CustomButton";
import NotesField from "./../../shared/fields/NotesField";
import { useFeedbackMutation } from "../../../services";
import useToast from "../../../hooks/useToast";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const navigation = useNavigate();
  const [token, setToken] = useState();
  const recaptchaRef = useRef(null);

  const [Feedback] = useFeedbackMutation();

  const { showErrorToast, showSuccessToast } = useToast();

  useEffect(() => {
    if (!token && recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  }, [token]);

  const handleFormSubmit = async (values) => {
    const response = await Feedback({
      values: values,
      token: token,
    });

    if (response?.data?.status === "success") {
      showSuccessToast(response?.data?.message);
      navigation("/");
    } else {
      recaptchaRef.current.reset();
      setToken(null);
      showErrorToast(response?.error?.data?.errors[0]);
    }
  };

  const onChange = (recaptchaToken) => {
    setToken(recaptchaToken);
  };

  return (
    <>
      <MarketingHeader
        content={"Return to the "}
        url={"/"}
        buttonTitle={"Return to the Home page"}
      />
      <BannerSection
        heading="Share Your Thoughts with Us !"
        content="Your feedback matters to us! We strive to continuously improve
        our service, and your insights play a crucial role in helping
        us achieve this goal."
      />
      <Box className="feedback-container">
        <Container>
          <Box className="feedback-wrapper">
            <Typography className="heading">
              Share Your Thoughts with Us !
            </Typography>
            <Typography className="subheading mt-18">
              Thank you for taking the time to provide us with your feedback.
              Your insights are invaluable to us as we strive to improve our
              services and better meet your needs.
            </Typography>
            <Typography className="subheading mt-18">
              Please fill out the form below to share your thoughts,
              suggestions, or concerns with us. Your feedback will help us
              continue to enhance our products and services to serve you better.
            </Typography>
            <Typography className="subheading mt-18 mb-30">
              We appreciate your input and thank you for being a valued member
              of our community.
            </Typography>

            <Grid container spacing={{ xs: 0, md: 2 }} rowSpacing={0}>
              <Grid item xs={12} md={10}>
                <Formik
                  initialValues={initialValuesForFeedback}
                  validationSchema={ValidationforFeedback}
                  onSubmit={(values) => handleFormSubmit(values)}
                >
                  {({ values, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
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
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        className="mt-10"
                      >
                        <InputField
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          value={values.email}
                        />
                        <InputField
                          id="job_title"
                          name="job_title"
                          label="Job title"
                          type="text"
                          value={values.job_title}
                        />
                      </Stack>
                      <Stack direction="column" spacing={1} className="mt-10">
                        <NotesField
                          minRows={3}
                          name="description"
                          value={values.description || ""}
                          state={"100%"}
                          id="description"
                          label="Your thoughts"
                        />
                      </Stack>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={GOOGLE_RECAPTCHA_SITEKEY}
                        onChange={onChange}
                      />
                      <CustomButton
                        title={"Share my thoughts"}
                        styles="submitButton button button-primary mt-18"
                      />
                    </form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <TestimonialSection />
      <MarketingFooter />
    </>
  );
};

export default FeedbackPage;
