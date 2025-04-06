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
import TotalAmountSection from "../../internal/TotalAmountSection";
import ItemList from "../../internal/ItemList";
import {
  useLazyGetClientDeatilsQuery,
  useLazyGetClientQuery,
  useLazyGetPreviewInvoiceQuery,
  useLazyGetUserDataInvoiceQuery,
  useUpdateInvoiceMutation,
} from "../../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import EditClientInvoice from "../../internal/EditClientInvoice";
import FullscreenLoader from "../../shared/loader/FullscreenLoader";
import TopHeader from "../../shared/TopHeader";
import { ErrorAlert } from "../../shared/Alert";
import NotesField from "../../shared/fields/NotesField";
import SideHeader from "../../internal/layout/side-header";
import InvoiceFooter from "../../internal/InvoiceFooter";
import ClientData from "../../internal/ClientData";
import UserData from "../../internal/UserData";
import BackButton from "../../shared/BackButton";
import useToast from "../../../hooks/useToast";
import FallbackComponent from "../../shared/FallbackComponent";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import useAuthentication from "../../../hooks/useAuthentication";
import {
  getStatusColors,
  getUserDataFromLocalStorage,
} from "../../../services/Utils";
import { currencies, dueDates } from "../../../constant";

const EditInvoice = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const { id } = useParams();
  const mobile = useMediaQuery("(max-width:600px)");
  const [errorMessage, setErrorMessage] = useState("");
  const [clientErrorMessage, setClientErrorMessage] = useState("");
  const [clientData, { data }] = useLazyGetClientQuery();
  const [userDetails, response] = useLazyGetUserDataInvoiceQuery();
  const [updateInvoice] = useUpdateInvoiceMutation();
  const [clientDetailsData] = useLazyGetClientDeatilsQuery();
  const [sent, setSent] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [draft, setDrafted] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const navigate = useNavigate();
  const { showErrorToast } = useToast();
  const [selectedOption, setSelectedOption] = useState("");
  const [getPreviewInvoice, invoiceResponse, { isLoading }] =
    useLazyGetPreviewInvoiceQuery();
  const [Amt, setAmt] = useState(
    invoiceResponse?.data?.data?.invoice?.subtotal
  );
  const [TotalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    getPreviewInvoice({ invoice_id: id });
  }, [getPreviewInvoice, id]);

  useEffect(() => {
    clientData();
    userDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedClient, setSelectedClient] = useState(
    invoiceResponse?.data?.data?.invoice?.client_id
  );
  const handleSelectedClient = (item) => {
    setSelectedClient(item);
    setClientErrorMessage("");
  };

  useEffect(() => {
    if (invoiceResponse?.data?.data?.invoice?.client_id) {
      setSelectedClient(invoiceResponse?.data?.data?.invoice.client_id);
    }
    if (invoiceResponse?.data?.data?.invoice?.date) {
      setSelectedDate(
        dayjs(invoiceResponse?.data?.data?.invoice?.invoice_date)
      );
    }
  }, [invoiceResponse]);

  const ClientDetails = async () => {
    try {
      const { data } = await clientDetailsData({
        client_id: selectedClient,
      });
      setClientDetails(data?.data);
    } catch (error) {
      showErrorToast(error);
    }
  };

  useEffect(() => {
    if (selectedClient) {
      ClientDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClient, invoiceResponse]);

  const InvoiceInitialvalues = {
    item:
      invoiceResponse?.data?.data?.item &&
      invoiceResponse.data.data.item.length > 0
        ? invoiceResponse.data.data.item
        : selectedOption === "expense"
        ? [{ title: "", amount: "",line_type: "expense", }]
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
    address_1: clientDetails?.address_1,
    address_2: clientDetails?.address_2,
    email: clientDetails?.email,
    number: clientDetails?.phone_number,
    invoice_name: invoiceResponse?.data?.data?.invoice.invoice_name || "",
    invoice_number: invoiceResponse?.data?.data?.invoice.invoice_number || "",
    Notes: invoiceResponse?.data?.data?.invoice.note || "",
    status: invoiceResponse?.data?.data?.invoice?.status || "",
  };

  useEffect(() => {
    setTotalAmount(Amt);
  }, [Amt]);

  const [selectedDueDate, setSelectedDueDate] = React.useState(null);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    const currencyCode = invoiceResponse?.data?.data?.invoice?.currency;
    const dueDatavalue = invoiceResponse?.data?.data?.invoice?.due_date;

    if (currencyCode) {
      const foundCurrency = currencies.find((obj) => obj.code === currencyCode);
      setSelectedCurrency(foundCurrency);
    }
    if (dueDatavalue) {
      const foundDueDate = dueDates.find((obj) => obj.value === dueDatavalue);
      setSelectedDueDate(foundDueDate);
    }
  }, [invoiceResponse]);

  const userData = getUserDataFromLocalStorage();

  const UpdateInvoiceAPI = async (values) => {
    setInvoiceLoading(true);
    const { data, error } = await updateInvoice({
      invoice_id: id,
      item: values?.item,
      invoice: {
        invoice_number: values?.invoice_number,
        subtotal: Amt,
        total: TotalAmount,
        is_received: true,
        client_id: invoiceResponse?.data?.data?.invoice?.client_id,
        user_id: userData?.id,
        invoice_date:
          selectedDate.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD"),
        due_date: selectedDueDate?.value,
        currency: selectedCurrency?.code,
        status: draft
          ? "draft"
          : "unpaid",
        invoice_name: values.invoice_name || "",
        note: values.Notes || "",
        sent: sent,
      },
    });
    if (data?.status === "success") {
      setInvoiceLoading(false);
      navigate(`/invoices/preview/${data?.data?.invoice?.id}`);
    } else {
      setInvoiceLoading(false);
      setErrorMessage(error?.data?.message[0]);
    }
  };

  const invoiceStatus = invoiceResponse?.data?.data?.invoice?.status;
  const { boxBackgroundColor, textColor } = getStatusColors(invoiceStatus);

  if (response.isError) {
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
          <Formik
            enableReinitialize
            initialValues={InvoiceInitialvalues}
            onSubmit={(values) => {
              UpdateInvoiceAPI(values);
            }}
          >
            {({
              values,
              handleSubmit,
              setFieldValue,
              handleBlur,
              handleChange,
              errors,
              touched,
            }) => {
              let sum = 0;
              values.item.forEach((item) => {
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
                  unit: "",
                  line_type: "item",
                  amount: "",
                };
                setFieldValue("item", [...values.item, newItem]);
              };

              const handleAddExpence = () => {
                const newExpense = { title: "", amount: "" ,line_type: "expense",};
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
                <>
                  <form className="">
                    <TopHeader
                      title="Edit invoice"
                      RedirectButtonTttle={
                        !draft
                          ? invoiceLoading
                            ? "Saving..."
                            : "Save"
                          : "Save"
                      }
                      handleSaveAndPreview={handleSubmit}
                      draftTitle={
                        invoiceResponse?.data?.data?.invoice?.status ===
                          "draft" &&
                        (draft
                          ? invoiceLoading
                            ? "Saving..."
                            : "Save as draft"
                          : "Save as draft")
                      }
                      setSent={setSent}
                      setDrafted={setDrafted}
                    />
                    <Box className="layout invoice-background">
                      <Grid container>
                        <Grid item xs={12} sm={12} md={8.7}>
                          <Box className="createInvoice mt-30">
                            <Grid container>
                              <Grid item xs={12}>
                                <Box className="createInvoice-topContainer">
                                  <BackButton />
                                </Box>
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
                                          className="invoice-status  mr-10"
                                          sx={{
                                            backgroundColor: boxBackgroundColor,
                                            border: `1px solid boxBackgroundColor`,
                                            color: textColor,
                                          }}
                                        >
                                          {
                                            invoiceResponse?.data?.data?.invoice
                                              ?.status
                                          }
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
                                          response={
                                            invoiceResponse?.data?.data
                                              ?.business_info
                                          }
                                        />
                                        <Divider
                                          sx={{ width: "100%" }}
                                          className="mt-18 mb-18"
                                        />
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} sm={6}>
                                            <Box>
                                              <EditClientInvoice
                                                values={values}
                                                handleSelectedClient={
                                                  handleSelectedClient
                                                }
                                                data={data?.data}
                                                response={
                                                  response?.data?.data?.invoice
                                                }
                                                id={
                                                  invoiceResponse?.data?.data
                                                    ?.invoice?.client_id
                                                }
                                                clientDetails={clientDetails}
                                              />
                                            </Box>
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
                                        values={values}
                                        handleDeleteItem={handleDeleteItem}
                                        selectedCurrency={selectedCurrency}
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
                                              value="item"
                                              onClick={() => handleAddItem()}
                                            >
                                              Item
                                            </MenuItem>
                                            <MenuItem
                                              value="expense"
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
                                      <Box className="mt-18 mb-18">
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
                                          response?.data?.data?.business_info
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
                        <Grid item xs={0} sm={0} md={3}></Grid>
                      </Grid>
                    </Box>
                  </form>
                </>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default EditInvoice;
