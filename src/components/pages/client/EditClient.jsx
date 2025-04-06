import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constant";
import useAuthentication from "../../../hooks/useAuthentication";
import { getAuthDataFromLocalStorage } from "../../../services/Utils";
import { useLazyGetClientDeatilsQuery } from "../../../services/Api";
import { ValidationforAddclient } from "../../../schema";
import TopHeader from "../../shared/TopHeader";
import Heading from "../../shared/Heading";
import BackButton from "../../shared/BackButton";
import { ErrorAlert } from "../../shared/Alert";
import SideHeader from "../../internal/layout/side-header";
import DynamicFormSection from "../../internal/DynamicFormSection";
import FallbackComponent from "../../shared/FallbackComponent";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import DynamicCustomFieldSection from "../../internal/DynamicCustomFieldSection";

const EditClient = () => {
  const { id } = useParams();
  useAuthentication();
  useCheckProfileCompletion();
  const navigate = useNavigate();
  const mobile = useMediaQuery("(max-width:600px)");

  const [clientInfo, { data, isError }] = useLazyGetClientDeatilsQuery();

  useEffect(() => {
    clientInfo({ client_id: id });
  }, [clientInfo, id]);

  const initialValuesForAddclient = {
    company_name: (data && data?.data?.company_name) || "",
    website_url: (data && data?.data?.website_url) || "",
    email: (data && data?.data?.email) || "",
    address1: (data && data?.data?.address_1) || "",
    address2: (data && data?.data?.address_2) || "",
    postel_code: (data && data?.data?.postal_code) || "",
    state: (data && data?.data?.state) || "",
    city: (data && data?.data?.city) || "",
    country: (data && data?.data?.country) || "",
    phone_no: (data && data?.data?.phone_number) || "",
    fax_no: (data && data?.data?.fax_number) || "",
    gstin_no: (data && data?.data?.tax_identification_number) || "",
    customFields:
      data && data?.data?.custom_fields_attributes.length > 0
        ? data?.data?.custom_fields_attributes
        : [{ name: "", value: "" }],
  };

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
      const response = await axios.patch(
        `${BASE_URL}/clients/${id}.json`,
        params,
        {
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            "access-token": access_token,
            client: client,
          },
        }
      );
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
      {
        id: "postel_code",
        name: "postel_code",
        label: "Postal code",
        value: values.postel_code,
      },
      { id: "state", name: "state", label: "State", value: values.state },
      { id: "city", name: "city", label: "City", value: values.city },
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

  if (isError) {
    return <FallbackComponent />;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={3} md={3} lg={2.2} xl={2}>
          {!mobile && <SideHeader />}
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
          <Formik
            initialValues={initialValuesForAddclient}
            enableReinitialize
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
                      isLoading ? "Updating..." : "Update client"
                    }
                    submit={true}
                    handleUpdateButton={handleSubmit}
                  />
                  <Box className="layout">
                    <Box className="mt-30">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <BackButton />
                        </Grid>
                        <Grid item xs={12}>
                          <Box className="mt-18">
                            <Heading title={`Update ${values.company_name}`} />
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
                          <BasicInfo
                            initialValues={initialValuesForAddclient}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Address initialValues={initialValuesForAddclient} />
                        </Grid>
                        <Grid item xs={12}>
                          <BusinessInfo
                            initialValues={initialValuesForAddclient}
                          />
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

export default EditClient;
