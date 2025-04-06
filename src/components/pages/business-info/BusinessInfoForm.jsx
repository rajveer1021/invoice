import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constant";
import { ValidationforBusinessInfo } from "../../../schema";
import { getEmailBusinessName, getHeaderDataFromLocalStorage,getUserDataFromLocalStorage } from "../../../services/Utils";
import InputField from "../../shared/fields/InputField";
import { ErrorAlert } from "./../../shared/Alert";
import { CustomButton } from "../../shared/CustomButton";

const BusinessInfoForm = () => {
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const navigate = useNavigate();
  const { authorization } = getHeaderDataFromLocalStorage();
  const userData = getUserDataFromLocalStorage();
  const companyName = `${userData.first_name} ${userData.last_name}`;

  const initialValuesForBusinessInfo = {
    company_name: getEmailBusinessName(userData?.email,companyName),
    company_email_address: userData.email || "",
    country: userData.country|| "India",
    company_logo: "",
  };

  const handleUpdateBusinessInfo = async (values) => {
    setIsloading(true);

    try {
      const formData = new FormData();

      formData.append("business_info[company_name]", values.company_name);
      formData.append(
        "business_info[company_email_address]",
        values.company_email_address
      );
      values.company_logo && formData.append("business_info[company_logo]", values.company_logo);
      formData.append("business_info[country]", values.country);

      
      const response = await axios.post(
        `${BASE_URL}/business_info.json`,
        formData,
        {
          headers: {
            Authorization: authorization,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
        localStorage.setItem(
          "userData",
          JSON.stringify(response?.data?.data?.user)
        );
        localStorage.setItem(
          "business_logo",
          JSON.stringify(response?.data?.data?.business_info)
        );
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message[0]
      ) {
        setErrorMessage(error.response.data.message[0]);
      } else {
        setErrorMessage("An unexpected error occurred");
      }

      setInvalid(true);
    } finally {
      setIsloading(false);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <Box className="detail-wrapper">
        <Box className="businessdetails-form mt-10">
          <Formik
            initialValues={initialValuesForBusinessInfo}
            validationSchema={ValidationforBusinessInfo}
            onSubmit={(values, { resetForm }) =>
              handleUpdateBusinessInfo(values, resetForm)
            }
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <InputField
                    id="company_name"
                    name="company_name"
                    label="Company name"
                    value={values.company_name}
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  className="mt-18"
                >
                  <InputField
                    id="company_email_address"
                    name="company_email_address"
                    label="Company email"
                    type="email"
                    value={values.company_email_address}
                  />
                </Stack>
          
                
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  className="mt-18"
                >
                  <InputField
                    id="country"
                    name="country"
                    label="Country"
                    value={values.country}
                  />
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  className="mt-18"
                  alignItems="center"
                >
                  <Button
                    component="label"
                    className="uploadbutton button "
                    startIcon={<FileUploadIcon />}
                  >
                    Upload logo
                    <VisuallyHiddenInput
                      type="file"
                      name="company_logo"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("company_logo", file);
                        setImagePreview(URL.createObjectURL(file));
                      }}
                    />
                  </Button>
                  <Box>
                    {values.company_logo !== "" && imagePreview !== "" ? (
                      <img
                        src={imagePreview}
                        alt="logo"
                        className="company_logo_preview"
                      />
                    ) : null}
                  </Box>
                </Stack>

                {invalid && errorMessage && (
                  <ErrorAlert errorMessage={errorMessage} />
                )}
                <Box className="submitBtnContainer">
                  <Box className="submitBtnBusiness">
                    <CustomButton
                      title={isLoading ? "Updating..." : "Update business info"}
                      styles="button submitButton mt-18"
                    />
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default BusinessInfoForm;
