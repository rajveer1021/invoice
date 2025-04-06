import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import {
  useLazyGetFilteredInvoiceQuery,
  useLazyGetInvoiceQuery,
} from "../../../services/Api";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuthentication";
import { BASE_URL } from "../../../constant";
import ShowInvoiceData from "../../internal/ShowInvoiceData";
import FullscreenLoader from "../../shared/loader/FullscreenLoader";
import SideHeader from "../../internal/layout/side-header";
import TopHeader from "../../shared/TopHeader";
import Heading from "../../shared/Heading";
import InvoiceOverViewContainer from "./../../internal/InvoiceOverViewContainer";
import SearchAutoComplete from "../../shared/fields/SearchAutoComplete";
import DeleteInvoiceDialog from "../../internal/dialog-box/DeleteInvoice";
import { CustomButton } from "../../shared/CustomButton";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import TableSkeleton from "../../shared/loader/TableSkeleton";
import SharedHeader from "../../internal/SharedHeader";
import useToast from "../../../hooks/useToast";
import FallbackComponent from "../../shared/FallbackComponent";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import { useDownloadInvoicePDF } from "../../../hooks/useDownloadInvoicePDF";

const Invoice = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const navigate = useNavigate();
  const mobile = useMediaQuery("(max-width:600px)");
  const [dialogeOpen, setDialogeOpen] = React.useState(false);
  const [invoiceData, { isLoading, data, isError }] = useLazyGetInvoiceQuery();
  const [filterData] = useLazyGetFilteredInvoiceQuery();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filterValue, setFilterValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, statusUpdate] = useState(false);
  const [downloadId, setDownloadId] = React.useState();
  const [loadingCSV, setLoadingCSV] = useState(false);
  const statusValue = selectedStatus === "all" ? "" : selectedStatus;
  const storedData = localStorage.getItem("userHeaderData");
  const headerAuth = JSON.parse(storedData);
  const { showErrorToast } = useToast();

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, selectedOption]);

  useEffect(() => {
    invoiceData();
  }, [invoiceData, status]);

  useEffect(() => {
    handleSubmit();
    statusUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dialogeOpen]);

  const handleEditClick = (id) => {
    navigate(`/invoices/edit-invoice/${id}`);
  };
  const handlePreviewClick = (id) => {
    navigate(`/invoices/preview/${id}`);
  };

  const handleDeleteInvoice = (id) => {
    setDialogeOpen(true);
    setDownloadId(id);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setFilterValue();
    try {
      const { data, error, isSuccess, isError } = await filterData({
        client_id: selectedOption?.id || "",
        status: selectedStatus === "all" ? "" : selectedStatus || "",
      });
      if (isSuccess) {
        setFilterValue(data?.data);
      } else if (isError) {
        showErrorToast(error?.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoicePDF = useDownloadInvoicePDF();

  const handleButtonClick = (status) => {
    setSelectedStatus(status);
  };

  const downloadFile = (data, filename) => {
    const blob = new Blob([data], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  const downloadCSV = async () => {
    setLoadingCSV(true);

    try {
      const response = await fetch(
        `${BASE_URL}/invoices/download_csv?client_id=${
          selectedOption?.id || ""
        }&status=${statusValue}`,
        {
          headers: {
            "Content-Type": "text/csv",
            Authorization: headerAuth.authorization,
          },
          follow: "follow",
        }
      );

      if (!response.ok) {
        console.error(`Failed to download CSV. Status: ${response.status}`);
        return;
      }

      const csvData = await response.text();
      const filename = `Invoice_Report.csv`;
      downloadFile(csvData, filename);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setLoadingCSV(false);
    }
  };

  const statusOptions = ["all", "paid", "unpaid", "sent", "draft"];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
          <>
            <TopHeader InvoiceUrl="/invoices/create-invoice" title="Invoice" />
            <Box className="layout">
              <Grid container spacing={2}>
                {}
                <Grid item xs={12}>
                  {mobile && <SharedHeader content="Invoice" />}
                  <Box className="mt-30 mb-18">
                    <Heading title="Invoice overview" />
                  </Box>
                  <Grid container spacing={2}>
                    {data?.data?.invoice_overview?.map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <InvoiceOverViewContainer
                          Heading={item?.title}
                          Amount={item?.value}
                          Unit={item?.count}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Box className="mt-18">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <SearchAutoComplete
                            options={data?.data?.clients}
                            setSelectedOption={setSelectedOption}
                          />
                        </Box>
                      </Grid>
                      {!mobile && (
                        <Grid item xs={12} sm={6}>
                          {filterValue?.length > 0 && (
                            <Box className="align-right">
                              <CustomButton
                                title={
                                  loadingCSV
                                    ? "Downloading..."
                                    : "Export invoices"
                                }
                                handleClick={downloadCSV}
                                styles={"exportIconContainer button"}
                                startIcon={
                                  !loadingCSV && (
                                    <FileDownloadOutlinedIcon className="shareIcon mr-5" />
                                  )
                                }
                              />
                            </Box>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      border: "1px solid #e2e2e2",
                      padding: "1rem 0.6875rem",
                      borderRadius: "0.3125rem",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                    >
                      {statusOptions?.map((status) => (
                        <Fragment key={status}>
                          <CustomButton
                            title={capitalizeFirstLetter(status)}
                            styles={
                              selectedStatus === status
                                ? "filterButtons button"
                                : "filterButtonsNotselected button"
                            }
                            handleClick={() => handleButtonClick(status)}
                          />
                        </Fragment>
                      ))}
                    </Stack>

                    {filterValue || !loading ? (
                      <ShowInvoiceData
                        filterValue={filterValue}
                        isloading={loading}
                        title="Reports"
                        onEditClick={handleEditClick}
                        handlePreviewClick={handlePreviewClick}
                        setLoading={setLoading}
                        statusUpdate={statusUpdate}
                        handleDownload={downloadInvoicePDF}
                        handleDeleteInvoice={handleDeleteInvoice}
                      />
                    ) : (
                      <TableSkeleton />
                    )}
                  </Box>
                </Grid>
                {mobile && (
                  <Grid item xs={12} sm={6}>
                    {filterValue?.length > 0 && (
                      <Box className="align-right">
                        <CustomButton
                          title={
                            loadingCSV ? "Downloading..." : "Export invoices"
                          }
                          handleClick={downloadCSV}
                          styles={"exportIconContainer button"}
                          startIcon={
                            !loadingCSV && (
                              <FileDownloadOutlinedIcon className="shareIcon mr-5" />
                            )
                          }
                        />
                      </Box>
                    )}
                  </Grid>
                )}
              </Grid>
              <Box className="mb-50" />
            </Box>
          </>
        </Grid>
      </Grid>
      <DeleteInvoiceDialog
        dialogeOpen={dialogeOpen}
        setDialogeOpen={setDialogeOpen}
        id={downloadId}
      />
    </>
  );
};

export default Invoice;
