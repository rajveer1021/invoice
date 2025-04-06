import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, initialValuesForAddclient } from "../../../constant";
import { ValidationforAddclient } from "../../../schema";
import useAuthentication from "../../../hooks/useAuthentication";
import { getAuthDataFromLocalStorage } from "../../../services/Utils";
import TopHeader from "./../../shared/TopHeader";
import BackButton from "./../../shared/BackButton";
import Heading from "./../../shared/Heading";
import { ErrorAlert } from "./../../shared/Alert";
import SideHeader from "../../internal/layout/side-header";
import DynamicFormSection from "../../internal/DynamicFormSection";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import DynamicCustomFieldSection from "../../internal/DynamicCustomFieldSection";

const CreateClient = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const navigate = useNavigate();
  const mobile = useMediaQuery("(max-width:600px)");
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const { access_token, uid, client } = getAuthDataFromLocalStorage();

  const handleAddClient = async (values, resetForm) => {
    setIsloading(true);

    const params = {
      company_name: values.company_name,
      website_url: values.website_url,
      email: values.email,
      address_1: values.address1,
      address_2: values.address2,
      postal_code: values.postel_code,
      state: values.state,
      city: values.city,
      country: values.country,
      phone_number: values.phone_no,
      fax_number: values.fax_no,
      tax_identification_number: values.gstin_no,
      custom_fields_attributes: values.customFields,
    };

    try {
      const response = await axios.post(`${BASE_URL}/clients.json`, params, {
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          "access-token": access_token,
          client: client,
        },
      });

      if (response?.data && response?.status === 200) {
        resetForm();
        navigate("/clients");
      } else if (response?.data && response?.data?.status === "error") {
        setInvalid(true);
        setErrorMessage(response?.data?.message);
      }
    } catch (error) {
      setInvalid(true);
      setErrorMessage(error?.response?.data?.message || "An error occurred");
    } finally {
      setIsloading(false);
    }
  };

  const BasicInfo = (values) => {
    const basicInfoFields = [
      {
        id: "company_name",
        name: "company_name",
        label: "Company Name",
        value: values.company_name,
      },
      {
        id: "website_url",
        name: "website_url",
        label: "Website URL",
        value: values.website_url,
      },
      { id: "email", name: "email", label: "Email", value: values.email },
    ];

    return (
      <DynamicFormSection
        sectionTitle="Basic Information"
        fields={basicInfoFields}
      />
    );
  };

  const Address = (values) => {
    const addressFields = [
      {
        id: "address1",
        name: "address1",
        label: "Address1",
        value: values.address1,
      },
      {
        id: "address2",
        name: "address2",
        label: "Address2",
        value: values.address2,
      },
      { id: "city", name: "city", label: "City", value: values.city },
      {
        id: "postel_code",
        name: "postel_code",
        label: "Postal code",
        value: values.postel_code,
      },
      { id: "state", name: "state", label: "State", value: values.state },

      {
        id: "country",
        name: "country",
        label: "Country",
        value: values.country,
      },
    ];

    return (
      <DynamicFormSection
        sectionTitle="Office Address"
        fields={addressFields}
      />
    );
  };

  const BusinessInfo = (values) => {
    const businessInfoFields = [
      {
        id: "phone_no",
        name: "phone_no",
        label: "Phone number",
        value: values.phone_no,
      },
      {
        id: "fax_no",
        name: "fax_no",
        label: "Fax number",
        value: values.fax_no,
      },
      {
        id: "gstin_no",
        name: "gstin_no",
        label: "Tax identification number",
        value: values.gstin_no,
      },
    ];

    return (
      <DynamicFormSection
        sectionTitle="Contact and Business Information"
        fields={businessInfoFields}
      />
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={3} md={3} lg={2.2} xl={2}>
          {!mobile && <SideHeader />}
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
          <Formik
            initialValues={initialValuesForAddclient}
            validationSchema={ValidationforAddclient}
            onSubmit={(values, { resetForm }) =>
              handleAddClient(values, resetForm)
            }
          >
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
              <form>
                <Box className="invoice">
                  <TopHeader
                    title="Client"
                    RedirectButtonTttle={
                      isLoading ? "Saving..." : "Save Client"
                    }
                    handleClick={handleSubmit}
                  />
                  <Box className="layout">
                    <Box className="mt-30">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <BackButton />
                        </Grid>
                        <Grid item xs={12}>
                          <Box className="mt-18">
                            <Heading title={"Client Details"} />
                          </Box>
                        </Grid>

                        {invalid && errorMessage && (
                          <Stack
                            direction="row"
                            width="100%"
                            justifyContent="center"
                          >
                            <ErrorAlert errorMessage={errorMessage} />
                          </Stack>
                        )}
                        <Grid item xs={12}>
                          <BasicInfo values={values} />
                        </Grid>
                        <Grid item xs={12}>
                          <Address values={values} />
                        </Grid>
                        <Grid item xs={12}>
                          <BusinessInfo values={values} />
                        </Grid>
                        <Grid item xs={12}>
                          <DynamicCustomFieldSection
                            sectionTitle="Custom Fields"
                            values={values}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="mb-50" />
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateClient;
