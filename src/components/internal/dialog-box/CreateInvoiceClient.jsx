import React, { useState } from "react";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Collapse from "@mui/material/Collapse";
import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  Address,
  BASE_URL,
  BasicInfo,
  BusinessInfo,
  initialValuesForAddclient,
} from "../../../constant";
import { ValidationforAddclient } from "../../../schema";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../../shared/Alert";
import axios from "axios";
import { getAuthDataFromLocalStorage } from "../../../services/Utils";

const CreateInvoiceClient = ({ setUpdateClient }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [addressCollapse, setAddressCollapse] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddressCollapse(false);
    setInvalid(false);
    setErrorMessage("");
  };

  const toggleAddressCollapse = () => {
    setAddressCollapse((prev) => !prev);
  };


const { access_token, uid, client } = getAuthDataFromLocalStorage();
  const handleAddClient = async (
    values,
    resetForm,
    setIsloading,
    navigate,
    setInvalid,
    setErrorMessage,
    handleClose,
    setUpdateClient
  ) => {
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
        navigate("/invoices/create-invoice");
        handleClose();
        setUpdateClient(response?.data);
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
  
  return (
    <Box className="createInvoiceClient">
      <Box onClick={handleOpen} className="addClientBtn">
        Add Client
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        className="createInvoiceClientDialogBox"
      >
        <Formik
          initialValues={initialValuesForAddclient}
          validationSchema={ValidationforAddclient}
          onSubmit={(values, { resetForm }) =>
            handleAddClient(
              values,
              resetForm,
              setIsloading,
              navigate,
              setInvalid,
              setErrorMessage,
              handleClose,
              setUpdateClient
            )
          }
        >
          {({ values, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle>Create New Client</DialogTitle>
              <Divider />
              <DialogContent>
                <BasicInfo values={values} />
                <Box
                  onClick={toggleAddressCollapse}
                  className="toggleBtn mt-10 mb-10"
                >
                  {addressCollapse ? (
                    <Typography className="toggleContent">Show Less</Typography>
                  ) : (
                    <Typography className="toggleContent">Show More</Typography>
                  )}
                </Box>
                <Collapse in={addressCollapse}>
                  <Box>
                    <Address values={values} />
                  </Box>
                  <Box className="mt-10">
                    <BusinessInfo values={values} />
                  </Box>
                </Collapse>
                <DialogActions>
                  <Button
                    type="submit"
                    className="submitBtn button-primary button"
                    variant="contained "
                  >
                    {isLoading ? "Adding..." : "Add client"}
                  </Button>
                  <Button
                    onClick={handleClose}
                    className="closeBtn"
                    variant="outlined"
                    color="error"
                  >
                    Close
                  </Button>
                </DialogActions>
                {invalid && errorMessage && (
                  <Stack direction="row" width="100%" justifyContent="center">
                    <ErrorAlert errorMessage={errorMessage} />
                  </Stack>
                )}
              </DialogContent>
            </form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default CreateInvoiceClient;
