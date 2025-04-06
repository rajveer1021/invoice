import {
  Box,
  Grid,
  Stack,
  useMediaQuery,
  Typography,
  Divider,
  Alert,
  Button,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import LogoPreview from "./LogoPreview";
import {
  useLazyGetUserCompleteDataQuery,
  useUpdateUserDataMutation,
} from "../../../services/Api";
import FullscreenLoader from "./../../shared/loader/FullscreenLoader";
import TopHeader from "./../../shared/TopHeader";
import Heading from "./../../shared/Heading";
import InputField from "../../shared/fields/InputField";
import SideHeader from "../../internal/layout/side-header";
import AccountBusinessDetails from "./AccountBusinessDetails";
import SharedHeader from "../../internal/SharedHeader";
import FallbackComponent from "../../shared/FallbackComponent";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import useAuthentication from "../../../hooks/useAuthentication";
import { ValidationforUserAccount } from "../../../schema/index";
import organisation from "../../../assets/images/organisation.jpeg";
import { CustomButton } from "../../shared/CustomButton";
import DeleteAccountDialog from "../../internal/dialog-box/DeleteAccountDialog";
import useToast from "../../../hooks/useToast";
import { useForgotPasswordEmailMutation } from "../../../services";
import OTPConfirmationDialog from "../../internal/dialog-box/OTPConfirmationDialog";

const Accounts = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const mobile = useMediaQuery("(max-width:600px)");
  const [isloading, setIsloading] = useState(false);
  const [otploading, setOTPLoading] = useState(false);
  const [dialogeOpen, setDialogeOpen] = useState(false);
  const [OTPdialogeOpen, setOTPDialogeOpen] = useState(false);
  const [userDataValue, { data, isLoading, isError }] =
    useLazyGetUserCompleteDataQuery();

  useEffect(() => {
    userDataValue();
  }, [userDataValue, data]);

  const initialValuesForUser = {
    first_name: data?.data?.user?.first_name || "",
    last_name: data?.data?.user?.last_name || "",
    email: data?.data?.user?.email || "",
    company_name: data?.data?.user?.company_name || "",
    website_url: data?.data?.user?.website_url || "",
    phone_no: data?.data?.user?.phone_no || "",
    company_email_address: data?.data?.user?.company_email_address || "",
    address: data?.data?.user?.address || "",
    address_1: data?.data?.user?.address_1 || "",
    postal_code: data?.data?.user?.postal_code || "",
    city: data?.data?.user?.city || "",
    state: data?.data?.user?.state || "",
    country: data?.data?.user?.country || "",
    company_logo: data?.data?.user?.company_logo || organisation,
    customFields:
      data?.data?.user?.custom_fields_attributes &&
      data.data.user.custom_fields_attributes.length > 0
        ? data.data.user.custom_fields_attributes
        : [{ name: "", value: "" }],
  };
  const [companyLogoPreview, setCompanyLogoPreview] = useState();
  const [companyLogo, setCompanyLogo] = useState(
    data?.data?.user?.company_logo
  );

  const handleUpdatecompanyLogo = (file) => {
    if (file) {
      setCompanyLogoPreview(URL.createObjectURL(file));
      setCompanyLogo(file);
    } else {
      setCompanyLogoPreview(null);
      setCompanyLogo(data?.data?.user?.company_logo);
    }
  };

  const handleDeleteDialog = () => {
    setDialogeOpen(!dialogeOpen);
  };
  const handleOTPConfirmationDialog = () => {
    setOTPDialogeOpen(!OTPdialogeOpen);
  };

  const [updateData] = useUpdateUserDataMutation();

  const { showSuccessToast, showErrorToast } = useToast();

  const handleAddClient = async (values) => {
    setIsloading(true);
    try {
      const response = await updateData({
        values: values,
        userLogo: companyLogo || null,
      });

      if (response?.data) {
        localStorage.setItem(
          "userData",
          JSON.stringify(response?.data?.data?.user)
        );
        showSuccessToast(response?.data?.message[0]);
      } else if (response?.error) {
        showErrorToast(
          response?.error?.errors ||
            "An error occurred while processing your request."
        );
      }
    } catch (error) {
      showErrorToast("An error occurred while processing your request.");
    } finally {
      setIsloading(false);
    }
  };

  const [emailConfirmation] = useForgotPasswordEmailMutation();

  const handleSentOTP = async () => {
    setOTPLoading(true);
    try {
      const params = {
        email: data?.data?.user?.email,
      };
      const response = await emailConfirmation(params).unwrap();
      showSuccessToast(response?.data?.message);
      handleOTPConfirmationDialog();
    } catch (error) {
      showErrorToast(
        error?.data?.message ||
          error?.data?.errors[0] ||
          "An error occurred while processing your request."
      );
    } finally {
      setOTPLoading(false);
    }
  };

  if (isError) {
    return <FallbackComponent />;
  }

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={3} md={3} lg={2.2} xl={2}>
          {!mobile && <SideHeader />}
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
          <TopHeader title="Profile" />
          <Box className="layout account-section">
            {mobile && <SharedHeader content="Accounts" />}
            <Grid container>
              <Formik
                initialValues={initialValuesForUser}
                enableReinitialize
                validationSchema={ValidationforUserAccount}
                onSubmit={(values, { resetForm }) =>
                  handleAddClient(values, resetForm)
                }
              >
                {({ values, handleSubmit, handleChange, setFieldValue }) => (
                  <form>
                    <Grid item xs={12}>
                      <Box className="mt-30">
                        <Heading title={"Basic information"} />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="account-details-container mt-18">
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                          alignItems="center"
                        >
                          <Box className="fields-container">
                            <InputField
                              id="first_name"
                              name="first_name"
                              label="First name"
                              value={values.first_name}
                              max={true}
                            />
                            <Box className="mt-18">
                              <InputField
                                id="last_name"
                                name="last_name"
                                label="Last name"
                                value={values.last_name}
                                max={true}
                              />
                            </Box>
                            <Box className="mt-18">
                              <InputField
                                id="email"
                                name="email"
                                label="Email"
                                value={values.email}
                                disabled={true}
                                max={true}
                              />
                            </Box>
                          </Box>
                          <LogoPreview
                            companyLogoPreview={
                              companyLogoPreview
                                ? companyLogoPreview
                                : data?.data?.user?.company_logo || organisation
                            }
                            handleUpdatecompanyLogo={handleUpdatecompanyLogo}
                          />
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <AccountBusinessDetails
                        initialValues={initialValuesForUser}
                        values={values}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <CustomButton
                      title={isloading ? "Updating..." : "Update profile"}
                      styles="button submitButton mt-18"
                      handleClick={handleSubmit}
                    />
                  </form>
                )}
              </Formik>
            </Grid>
            <Divider sx={{ width: "100%" }} className="mt-50 mb-18" />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  className="action-box"
                >
                  <Heading title={"Enhance Your Account Security"} />

                  <Typography className="subheading">
                    {data?.data?.user?.has_password
                      ? "Changing your password regularly is a proactive step towards safeguarding your account."
                      : "In today's world, where digital threats are on the rise, it's essential to prioritize the security of your online accounts."}
                  </Typography>
                  {data?.data?.user?.has_password ? (
                    <CustomButton
                      title="Change Password"
                      styles="button submitButton"
                      url="/accounts/change-password"
                    />
                  ) : (
                    <CustomButton
                      title={otploading ? "loading..." : "Set Password"}
                      styles="button submitButton"
                      handleClick={handleSentOTP}
                    />
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  className="action-box"
                >
                  <Heading
                    title={"Ready to Delete Your Account?"}
                    dangerText={true}
                  />

                  <Typography className="subheading">
                    It removes your personal data from our system, helping you
                    maintain control over your online presence.
                  </Typography>

                  <CustomButton
                    title={"Delete Account"}
                    styles="button dangerButton"
                    handleClick={handleDeleteDialog}
                    disabled={!data?.data?.user?.has_password}
                    tooltipMessage={
                      !data?.data?.user?.has_password &&
                      "Before proceeding with the deletion of your account, please ensure that you've set your password."
                    }
                  />
                </Stack>
                <DeleteAccountDialog
                  dialogeOpen={dialogeOpen}
                  setDialogeOpen={setDialogeOpen}
                />
                <OTPConfirmationDialog
                  dialogeOpen={OTPdialogeOpen}
                  setDialogeOpen={setOTPDialogeOpen}
                />
              </Grid>
              {!data?.data?.user?.has_password && (
                <Grid item xs={12}>
                  <Alert severity="warning" className="mt-18">
                    <strong>Note :</strong> Before proceeding with the{" "}
                    <strong>deletion of your account</strong>, please ensure
                    that you've set your password. This step is crucial to
                    completing the deletion process.
                  </Alert>
                </Grid>
              )}
            </Grid>
            <Box className="mb-50" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Accounts;
