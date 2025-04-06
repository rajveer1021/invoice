import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../constant";
import { Box, Grid, useMediaQuery, Divider } from "@mui/material";
import {
  useLazyGetAllreportsQuery,
  useLazyGetFilteredAllreportsQuery,
} from "../../../services/Api";
import useAuthentication from "../../../hooks/useAuthentication";
import Filtersection from "./Filtersection";
import Reportsdata from "./Reportsdata";
import SideHeader from "../../internal/layout/side-header";
import TopHeader from "../../shared/TopHeader";
import FullscreenLoader from "../../shared/loader/FullscreenLoader";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { CustomButton } from "../../shared/CustomButton";
import TableSkeleton from "../../shared/loader/TableSkeleton";
import SharedHeader from "../../internal/SharedHeader";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";

const Reports = () => {
  useAuthentication();
  useCheckProfileCompletion();

  const mobile = useMediaQuery("(max-width:600px)");
  const [filterValue, setFilterValue] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState({
    startDate: undefined,
    endDate: undefined,
    selectedClient: "",
    invoice_number: "",
    invoice_status: "",
  });

  const getStatus = (paymentStatus) => {
    switch (paymentStatus) {
      case "1":
        return "paid";
      case "2":
        return "unpaid";
      case "3":
        return "due";
      case "4":
        return "draft";
      default:
        return "";
    }
  };

  const [allReportsData, { isLoading, data }] = useLazyGetAllreportsQuery();
  const [filterData] = useLazyGetFilteredAllreportsQuery();

  useEffect(() => {
    allReportsData();
  }, [allReportsData]);

  const [dataValue, setData] = useState(false);
  const handleClearFilter = () => {
    setFilterState({
      startDate: null,
      endDate: null,
      selectedClient: null,
      invoice_status: null,
      invoice_number: null,
    });
    setFilterState((prevState) => ({
      ...prevState,
      selectedClient: null,
      invoice_status: null,
      invoice_number: null,
    }));

    setData((prevDataValue) => !prevDataValue);
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setLoading(true);
    setFilterValue();

    // Check if any filter is selected
    if (
      !filterState.startDate &&
      !filterState.endDate &&
      !filterState.selectedClient &&
      !filterState.invoice_number &&
      !filterState.invoice_status
    ) {
      setErrorMessage("Please select the filters");
      setLoading(false);
      return;
    }

    try {
      const { data, error, isSuccess, isError } = await filterData({
        client_id: filterState?.selectedClient || "",
        invoice_id: filterState?.invoice_number || "",
        status: getStatus(filterState?.invoice_status) || "",
        start_date: filterState?.startDate
          ? filterState?.startDate.format("DD-MM-YYYY")
          : "",
        end_date: filterState?.endDate
          ? filterState?.endDate.format("DD-MM-YYYY")
          : "",
      });
      if (isSuccess) {
        setFilterValue(data?.data);
      } else if (isError) {
        setErrorMessage(error?.data?.message || "An error occurred");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const [loadingCSV, setLoadingCSV] = useState(false);
  const storedData = localStorage.getItem("userHeaderData");
  const headerAuth = JSON.parse(storedData);

  const downloadCSV = async () => {
    setLoadingCSV(true);
    try {
      const response = await fetch(
        `${BASE_URL}/reports/download_csv?client_id=${
          filterState?.selectedClient || ""
        }&status=${getStatus(filterState?.invoice_status) || ""}&invoice_id=${
          filterState?.invoice_number || ""
        }&start_date=${
          filterState?.startDate
            ? filterState?.startDate.format("DD-MM-YYYY")
            : ""
        }&end_date=${
          filterState?.endDate ? filterState?.endDate.format("DD-MM-YYYY") : ""
        }&client_id=${filterState?.selectedClient || ""}`,
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
      const filename = `Report.csv`;
      downloadFile(csvData, filename);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setLoadingCSV(false);
    }
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
          <TopHeader
            clientUrl={"/clients"}
            clientTitle={"Client"}
            InvoiceUrl={"/invoices"}
            title="Reports"
          />
          <Box className="layout">
            {mobile && <SharedHeader content="Reports" />}
            <Grid container>
              <Grid item xs={12}>
                <Filtersection
                  filterState={filterState}
                  setFilterState={setFilterState}
                  InvoiceNumber={data && data?.data?.invoice_numbers}
                  InvoiceStatus={data && data?.data?.invoice_status_option}
                  clientList={data && data?.data?.clients}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isloading={loading}
                  handleSubmit={handleSubmit}
                  dataValue={dataValue}
                  handleClearFilter={handleClearFilter}
                />
                <Divider sx={{ width: "100%" }} className="mt-18" />
              </Grid>
              {filterValue || !loading ? (
                <>
                  <Grid item xs={12}>
                    <Reportsdata
                      invoiceData={filterValue?.invoices}
                      loadingCSV={loadingCSV}
                      downloadCSV={downloadCSV}
                    />
                    {filterValue && filterValue?.invoices?.length !== 0 && (
                      <>
                        <Grid container>
                          <Grid item xs={12} sm={6} />
                          <Grid item xs={12} sm={6}>
                            <Box className="mt-18">
                              <Box className="align-right">
                                <CustomButton
                                  title={
                                    loadingCSV
                                      ? "Downloading..."
                                      : "Export reports"
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
                            </Box>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </>
              ) : (
                <Box
                  sx={{ width: "100%" }}
                  padding="0.6875rem"
                  className="border mt-18"
                >
                  <TableSkeleton />
                </Box>
              )}
            </Grid>
            <Box className="mb-50" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Reports;
