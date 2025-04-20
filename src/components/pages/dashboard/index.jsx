import { Box, Grid, Stack, useMediaQuery, Typography } from "@mui/material";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  useLazyGetDashboardQuery,
  useLazyGetInvoiceBarGrapyDataQuery,
  useIntroTourCompletedMutation,
} from "../../../services/Api";
import useAuthentication from "../../../hooks/useAuthentication";
import Heading from "./../../shared/Heading";
import TopHeader from "../../shared/TopHeader";
import SideHeader from "../../internal/layout/side-header";
import FullscreenLoader from "./../../shared/loader/FullscreenLoader";
import InfoContainer from "./../../internal/InfoContainer";
import InvoiceOverViewContainer from "./../../internal/InvoiceOverViewContainer";
import DonutChart from "./../../internal/DonutChart";
import BarGraph from "./../../internal/BarGraph";
import SharedHeader from "./../../internal/SharedHeader";
import FallbackComponent from "../../shared/FallbackComponent";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import { driver } from "driver.js";
import { steps } from "../../../constant";
import useToast from "../../../hooks/useToast";
import { Bargraph } from "../../../constant";
import { CustomButton } from "../../shared/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import SubscriptionExpiryNotice from "../../internal/SubscriptionExpiryNotice";

const Dashboard = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const mobile = useMediaQuery("(max-width:600px)");
  const [isTourActive, setIsTourActive] = useState(false);
  const [dashboardData, { data, isLoading, isError }] =
    useLazyGetDashboardQuery();

  const [introTourComplete] = useIntroTourCompletedMutation();
  const { showErrorToast } = useToast();

  useEffect(() => {
    dashboardData();
  }, [dashboardData]);

  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    setSelectedMonth(currentMonth);
  }, [currentMonth]);

  const handleChange = useCallback(
    (event) => {
      setSelectedMonth(event.target.value);
    },
    [setSelectedMonth]
  );

  const startYear = 2000;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleYearChange = useCallback(
    (event) => {
      setSelectedYear(event.target.value);
    },
    [setSelectedYear]
  );

  const [bargrapydata, { data: bargrapyValue }] =
    useLazyGetInvoiceBarGrapyDataQuery();
  useEffect(() => {
    bargrapydata({
      year: selectedYear,
      month: selectedMonth,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth]);


  useEffect(() => {
    if (!isLoading && !isError && data) {
      if (!data?.data?.intro_tour_completed) {
        const driverObj = driver({
          showProgress: true,
          steps: steps,
          nextBtnText: "Next >",
          prevBtnText: "< Previous",
          doneBtnText: "Final",
          progressText: "Step {{current}} of {{total}}",
          popoverClass: "driverjs-theme",
          onDestroyStarted: () => {
            driverObj.destroy();
            setIsTourActive(false);
            const response = introTourComplete()
            response.then((response) => (
              response?.error && showErrorToast(response.error.data.errors[0]))
            ).catch(err => showErrorToast("An error occurred while processing your request"))
          },
        });
        driverObj.drive();
        setIsTourActive(true);
        return () => {
          driverObj.destroy();
          setIsTourActive(false);
          const response = introTourComplete();
          response.then((response) => (
            response?.error && showErrorToast(response.error.data.errors[0]))
          ).catch(err => showErrorToast("An error occurred while processing your request"))
        };
      }
    }
  }, [data, isLoading, isError]);

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
          {!mobile && <SideHeader isTourActive={isTourActive} />}
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
          <TopHeader
            clientUrl={"/clients/add-client"}
            clientTitle={"Client"}
            InvoiceUrl={"/invoices/create-invoice"}
            title="Dashboard"
            isTourActive={isTourActive}
          />

          <Box className="layout">
            <Grid container>
              <Grid item xs={12}>
                {mobile && <SharedHeader content="Dashboard" />}
                <Box className="mt-30 mb-18">
                  {/* Subscription Expiry Notice */}
                  <SubscriptionExpiryNotice mt={5} />
                  <Heading title="Overview" />
                </Box>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  {data?.data?.reports_overview?.map((items, index) => (
                    <Fragment key={index}>
                      <InfoContainer
                        key={items.id}
                        title={items.title}
                        value={items.value}
                        loading={isLoading}
                        arrow={items.up_down}
                        arrowStatus={items.up_down_status}
                      />
                    </Fragment>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Box className="mt-30 mb-18">
                  <Heading title="Invoice overview" />
                </Box>
                <Box sx={{ position: "relative" }}>
                  {data?.data?.invoice_overview[0].count === 0 && (
                    <Box className="blurbox-content">
                      <Typography className="content">
                        Generate your inaugural invoice effortlessly with
                        Invoicean
                      </Typography>
                      <CustomButton
                        title={"Invoice"}
                        styles="button filterButtons mt-18"
                        url={"/invoices/create-invoice"}
                        startIcon={<AddIcon />}
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      filter:
                        data?.data?.invoice_overview[0].count === 0
                          ? "blur(8px)"
                          : "none",
                    }}
                  >
                    <Grid container spacing={2}>
                      {data?.data?.invoice_overview?.map((items, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <InvoiceOverViewContainer
                            Heading={items.title}
                            Amount={items?.value}
                            Unit={items.count}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12} sm={6} md={3}>
                        <DonutChart seriesData={data?.data?.graph_data} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={9}>
                        {bargrapyValue && (
                          <BarGraph
                            selectedYear={selectedYear}
                            selectedMonth={selectedMonth}
                            handleChange={handleChange}
                            handleYearChange={handleYearChange}
                            value={
                              data?.data?.invoice_overview[0].count === 0
                                ? Bargraph
                                : bargrapyValue?.data?.invoice
                            }
                            years={years}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box className="mb-50" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
