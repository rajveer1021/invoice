import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import InvoiceFooter from "../../internal/InvoiceFooter";
import ItemList from "../../internal/ItemList";
import {
  useCreateInvoiceMutation,
  useLazyGetClientDeatilsQuery,
  useLazyGetClientQuery,
  useLazyGetDuplicateInvoiceQuery,
  useLazyGetUserDataInvoiceQuery,
} from "../../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuthentication";
import dayjs from "dayjs";
import TopHeader from "../../shared/TopHeader";
import { ErrorAlert } from "../../shared/Alert";
import NotesField from "../../shared/fields/NotesField";
import SideHeader from "../../internal/layout/side-header";
import TotalAmountSection from "../../internal/TotalAmountSection";
import UserData from "../../internal/UserData";
import ClientData from "../../internal/ClientData";
import ClientFields from "../../shared/fields/ClientFields";
import BackButton from "../../shared/BackButton";
import useToast from "../../../hooks/useToast";
import FallbackComponent from "../../shared/FallbackComponent";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import {
  getStatusColors,
  getUserDataFromLocalStorage,
} from "./../../../services/Utils";
import FullscreenLoader from "../../shared/loader/FullscreenLoader";
import { currencies, dueDates } from "../../../constant";
import useIsPremiumPlan from "../../../hooks/API/useIsPremiumPlan";

const DuplicateInvoice = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const { id } = useParams();
  const mobile = useMediaQuery("(max-width:600px)");
  const [Amt, setAmt] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clientErrorMessage, setClientErrorMessage] = useState("");
  const [draft, setDrafted] = useState(false);
  const [sent, setSent] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const [rateData, setRateData] = useState({});
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [clientLoading, setClientLoading] = useState(false);
  const [clientData, { data }] = useLazyGetClientQuery();
  const [userDetails, response] = useLazyGetUserDataInvoiceQuery();
  const [CreateInvoice] = useCreateInvoiceMutation();
  const [clientDetailsData] = useLazyGetClientDeatilsQuery();
  const [updateClient, setUpdateClient] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const { showErrorToast } = useToast();
  const [DuplicateData, { data: duplicateInvoiceData }] =
    useLazyGetDuplicateInvoiceQuery();
  const userData = getUserDataFromLocalStorage();

  const itemsWithoutId = duplicateInvoiceData?.data?.item?.length
    ? duplicateInvoiceData.data.item.map(({ id = null, ...rest }) => rest)
    : [];

  const { isPremium, isLoading, error } = useIsPremiumPlan();
  useEffect(() => {
    if (isLoading) return;
    if (error || !isPremium) {
      if (error) {
        showErrorToast("Failed to fetch subscription data");
        navigate("/dashboard");
      } else {
        showErrorToast("Please subscribe to a Professional or Enterprise plan");
        navigate("/invoices");
      }
    }
  }, [isLoading, isPremium, error, navigate, showErrorToast]);

useEffect(() => {
  DuplicateData({
    invoice_id: id,
  });
}, [id, DuplicateData]);

useEffect(() => {
  userDetails();
}, [userDetails]);

useEffect(() => {
  clientData();
  updateClient && setSelectedClient(updateClient?.data?.id);
}, [clientData, updateClient]);

useEffect(() => {
  setTotalAmount(Amt);
}, [Amt]);

useEffect(() => {
  if (selectedClient) {
    ClientDetails();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedClient, updateClient]);

useEffect(() => {
  const currencyCode = duplicateInvoiceData?.data?.invoice?.currency;

  if (currencyCode) {
    const foundCurrency = currencies.find((obj) => obj.code === currencyCode);
    setSelectedCurrency(foundCurrency);
  }

  const foundDueDate = dueDates.find((obj) => obj.value === "7");
  setSelectedDueDate(foundDueDate);
}, [duplicateInvoiceData]);

const register = (values) => {
  const totalAmount = values.item.reduce((total, item) => {
    return total + parseFloat(item.amount);
  }, 0);
  const updatedValues = {
    ...values,
    subtotal: totalAmount.toFixed(2),
    total: TotalAmount,
  };
  setRateData(updatedValues);
};

const handleSelectedClient = (item) => {
  setSelectedClient(item);
  setClientErrorMessage("");
};

const handleDateChange = (date) => {
  setSelectedDate(date);
};

const ClientDetails = async () => {
  setClientLoading(true);
  try {
    const { data } = await clientDetailsData({
      client_id: selectedClient,
    });
    if (data) {
      setClientLoading(false);
      setClientDetails(data?.data);
    }
  } catch (error) {
    showErrorToast(error);
    setClientLoading(false);
  }
  setClientLoading(false);
};

const CreateInvoiceAPI = async (values, draft) => {
  const { data, error } = await CreateInvoice({
    item: values?.item,
    invoice: {
      invoice_number: values?.invoice_number,
      subtotal: Amt,
      tax: 0,
      total: TotalAmount,
      client_address: values?.address,
      client_email: values?.email,
      client_number: values?.number,
      client_id: selectedClient,
      user_id: userData?.id,
      invoice_date: selectedDate,
      due_date: selectedDueDate?.value || "7",
      currency: selectedCurrency?.code || "USD",
      status: draft ? "draft" : "unpaid",
      invoice_name: values.invoice_name,
      note: values.Notes || "",
      sent: sent,
    },
  });

  if (data?.status === "success") {
    rateData && navigate(`/invoices/preview/${data?.data?.invoice?.id}`);
    localStorage.removeItem("duplicateData");
  } else {
    setErrorMessage(error?.data?.message[0]);
  }
};

const invoiceStatus = "draft";
const { boxBackgroundColor, textColor } = getStatusColors(invoiceStatus);

if (response.isError) {
  return <FallbackComponent />;
}
if (response.isLoading) {
  return <FullscreenLoader />;
}

return (
  <>
    <Grid container>
      <Grid item xs={12} sm={3} md={3} lg={2.2} xl={2}>
        {!mobile && <SideHeader />}
      </Grid>
      <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
        {duplicateInvoiceData && (
          <Formik
            initialValues={{
              item:
                itemsWithoutId.length > 0
                  ? itemsWithoutId
                  : selectedOption === "expense"
                    ? [{ title: "", amount: "", line_type: "expense" }]
                    : [
                      {
                        title: "",
                        quantity: "",
                        rate: "",
                        amount: "",
                        unit: "",
                        line_type: "item",
                      },
                    ],
              subtotal: 0,
              total: 0,
              gst_total: 0,
              address: "",
              email: "",
              number: "",
              invoice_name:
                duplicateInvoiceData?.data?.invoice?.invoice_name || "",
              invoice_number:
                duplicateInvoiceData?.data?.invoice?.invoice_number || "",
              Notes: duplicateInvoiceData?.data?.invoice?.note,
            }}
            onSubmit={(values, { resetForm }) => {
              if (selectedClient == null) {
                setClientErrorMessage("Please select Client");
              } else {
                register(values, resetForm);
                CreateInvoiceAPI(values, draft);
              }
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              touched,
              errors,
              setFieldValue,
            }) => {
              if (
                clientDetails &&
                values.address !== clientDetails.address_1
              ) {
                values.address = clientDetails.address_1;
              }
              if (clientDetails && values.email !== clientDetails.email) {
                values.email = clientDetails.email;
              }
              if (
                clientDetails &&
                values.number !== clientDetails.phone_number
              ) {
                values.number = clientDetails.phone_number;
              }
              let sum = 0;
              values?.item?.forEach((item) => {
                if (item.amount) {
                  sum += parseFloat(item.amount);
                }
              });
              setAmt(sum.toFixed(2));

              const handleAddItem = () => {
                const newItem = {
                  title: "",
                  quantity: "",
                  rate: "",
                  amount: "",
                  unit: "",
                  line_type: "item",
                };

                setFieldValue("item", [...values.item, newItem]);
              };

              const handleAddExpence = () => {
                const newExpense = { title: "", amount: "", line_type: "expense", };
                setFieldValue("item", [...values.item, newExpense]);
              };

              const handleDeleteItem = (index) => {
                if (values.item.length > 1) {
                  const updatedItemValues = [...values.item];

                  updatedItemValues.splice(index, 1);

                  let sum = 0;
                  updatedItemValues.forEach((item) => {
                    if (item.amount) {
                      sum += parseFloat(item.amount);
                    }
                  });
                  setAmt(sum.toFixed(2));
                  setFieldValue("item", updatedItemValues);
                }
              };
              return (
                <form>
                  <TopHeader
                    title="Invoice"
                    RedirectButtonTttle={"Save"}
                    submit={true}
                    handleSaveAndPreview={handleSubmit}
                    draftTitle="Save as draft"
                    setDrafted={setDrafted}
                    setSent={setSent}
                  />
                  <Box className="layout invoice-background">
                    <Grid container>
                      <Grid item xs={12} sm={12} md={8.7}>
                        <Box className="createInvoice mt-30">
                          <Grid container>
                            <Grid item xs={12}>
                              <BackButton />
                            </Grid>
                            <Grid item xs={12}>
                              <Box className="mt-18">
                                {clientErrorMessage ? (
                                  <ErrorAlert
                                    errorMessage={clientErrorMessage}
                                  />
                                ) : (
                                  <>
                                    {errorMessage && (
                                      <ErrorAlert
                                        errorMessage={errorMessage}
                                      />
                                    )}
                                  </>
                                )}
                                <Box className="createInvoice-container mt-18">
                                  <Box className="invoiceNumberContainer">
                                    <Box className="topHeader">
                                      <Box
                                        className="invoice-status mr-10"
                                        sx={{
                                          backgroundColor: boxBackgroundColor,
                                          border: `1px solid boxBackgroundColor`,
                                          color: textColor,
                                        }}
                                      >
                                        Draft
                                      </Box>
                                      <TextField
                                        fullWidth
                                        id="invoice_name"
                                        name="invoice_name"
                                        label="Invoice"
                                        type="text"
                                        value={values.invoice_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                          touched.invoice_name &&
                                          !!errors.invoice_name
                                        }
                                        inputProps={{
                                          style: {
                                            height: "16px",
                                          },
                                        }}
                                      />
                                    </Box>
                                    <TextField
                                      fullWidth
                                      id="invoice_number"
                                      name="invoice_number"
                                      label="Invoice Number"
                                      type="text"
                                      value={values.invoice_number}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={mobile ? "mt-18" : null}
                                      error={
                                        touched.invoice_number &&
                                        !!errors.invoice_number
                                      }
                                      inputProps={{
                                        style: {
                                          height: "16px",
                                        },
                                      }}
                                    />
                                  </Box>

                                  <Box className="addressContainer">
                                    <Box className="invoiceContainer">
                                      <UserData
                                        dupicateData={
                                          duplicateInvoiceData?.data
                                        }
                                        response={
                                          response?.data?.data?.business_info
                                        }
                                      />
                                      <Divider
                                        sx={{ width: "100%" }}
                                        className="mt-18 mb-18"
                                      />
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                          <ClientFields
                                            values={values}
                                            handleSelectedClient={
                                              handleSelectedClient
                                            }
                                            data={data?.data}
                                            response={
                                              response?.data?.data?.invoice
                                            }
                                            clientLoading={clientLoading}
                                            defaultClientId={
                                              duplicateInvoiceData &&
                                              duplicateInvoiceData.data
                                                ?.invoice?.client_id
                                            }
                                            clientDetails={clientDetails}
                                            setUpdateClient={setUpdateClient}
                                            updateClient={updateClient}
                                            setSelectedClient={
                                              setSelectedClient
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                          <ClientData
                                            selectedDueDate={selectedDueDate}
                                            setSelectedDueDate={
                                              setSelectedDueDate
                                            }
                                            handleDateChange={
                                              handleDateChange
                                            }
                                            selectedDate={selectedDate}
                                            selectedCurrency={
                                              selectedCurrency
                                            }
                                            setSelectedCurrency={
                                              setSelectedCurrency
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    </Box>

                                    <Divider
                                      sx={{ width: "100%" }}
                                      className="mt-18 mb-18"
                                    />

                                    <ItemList
                                      itemFields={values.item}
                                      values={values && values}
                                      handleDeleteItem={handleDeleteItem}
                                      selectedCurrency={
                                        selectedCurrency && selectedCurrency
                                      }
                                      selectedOption={selectedOption}
                                    />
                                    <Box paddingLeft={!mobile && "1rem"}>
                                      <FormControl
                                        className="mt-10 "
                                        sx={{
                                          minWidth: 120,
                                          fontSize: "0.8rem",
                                        }}
                                        size="small"
                                      >
                                        <InputLabel
                                          id="select-option"
                                          sx={{ fontSize: "0.8rem" }}
                                        >
                                          New Line
                                        </InputLabel>
                                        <Select
                                          labelId="select-option"
                                          id="option"
                                          value={selectedOption}
                                          label="New Line"
                                          sx={{ fontSize: "0.8rem" }}
                                          onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                          }
                                        >
                                          <MenuItem
                                            value="Item"
                                            onClick={() => handleAddItem()}
                                          >
                                            Item
                                          </MenuItem>
                                          <MenuItem
                                            value="Expense"
                                            onClick={() => handleAddExpence()}
                                          >
                                            Expense
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Box>

                                    <Divider
                                      sx={{ width: "100%" }}
                                      className="mt-18 mb-18"
                                    />

                                    <TotalAmountSection
                                      sum={sum}
                                      TotalAmount={TotalAmount}
                                      selectedCurrency={selectedCurrency}
                                      boxBackgroundColor={boxBackgroundColor}
                                      textColor={textColor}
                                    />

                                    <Box className="mt-30">
                                      <Typography sx={{ fontWeight: "500" }}>
                                        Invoice Note
                                      </Typography>
                                      <Box className="mt-5">
                                        <NotesField
                                          minRows={2}
                                          name="Notes"
                                          value={values.Notes || ""}
                                          state={"100%"}
                                          id="Notes"
                                        />
                                      </Box>
                                    </Box>
                                    <Divider
                                      sx={{ width: "100%" }}
                                      className="mt-18 mb-18"
                                    />
                                    <InvoiceFooter
                                      email={
                                        response?.data?.data?.invoice
                                          ?.company_email_address
                                      }
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                          <Box className="mb-50" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              );
            }}
          </Formik>
        )}
      </Grid>
    </Grid>
  </>
);
};

export default DuplicateInvoice;
