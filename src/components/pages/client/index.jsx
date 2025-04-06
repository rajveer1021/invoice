import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useLazyGetClientInfoQuery,
  useLazyGetFilteredClientsQuery,
} from "../../../services/Api";
import useAuthentication from "../../../hooks/useAuthentication";
import FullscreenLoader from "../../shared/loader/FullscreenLoader";
import SideHeader from "../../internal/layout/side-header";
import TopHeader from "../../shared/TopHeader";
import AddIcon from "@mui/icons-material/Add";
import SearchAutoComplete from "../../shared/fields/SearchAutoComplete";
import ClientCard from "../../internal/ClientCard";
import { CustomButton } from "./../../shared/CustomButton";
import SharedHeader from "../../internal/SharedHeader";
import useToast from "../../../hooks/useToast";
import FallbackComponent from "../../shared/FallbackComponent";
import useCheckProfileCompletion from "../../../hooks/useCheckProfileCompletion";
import { Link } from "react-router-dom";

const ClientPage = () => {
  useAuthentication();
  useCheckProfileCompletion();
  const { showErrorToast } = useToast();

  const mobile = useMediaQuery("(max-width:600px)");

  const [clientInfo, { isLoading, data, isError }] =
    useLazyGetClientInfoQuery();
  const [filterData] = useLazyGetFilteredClientsQuery();

  const [filterValue, setFilterValue] = useState();
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setFilterValue();
    try {
      const { data } = await filterData({
        client_id: filterState?.id || "",
      });
      setFilterValue(data?.data);
    } catch (error) {
      showErrorToast("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clientInfo();
  }, [clientInfo]);

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState]);

  if (isError) {
    return <FallbackComponent />;
  }

  if (isLoading || loading) {
    return <FullscreenLoader />;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={3} md={3} lg={2.2} xl={2}>
          {!mobile && <SideHeader />}
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
          <Box className="client">
            <TopHeader
              title="Client"
              clientUrl={"/clients/add-client"}
              clientTitle={"Client"}
            />
            <Box className="layout">
              {mobile && <SharedHeader content="Clients" />}
              <Box className="mt-30">
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <SearchAutoComplete
                      options={data?.data?.clients}
                      setSelectedOption={setFilterState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Link
                      onClick={() => setFilterState(null)}
                      className="text-primary font-14 "
                    >
                      Reset Search Filter
                    </Link>
                  </Grid>
                </Grid>

                {filterValue?.length > 0 ? (
                  <Box className="mt-30">
                    <Grid container spacing={2}>
                      {filterValue?.map((item, index) => (
                        <Grid item xs={12} sm={12} md={5.5} xl={4} key={index}>
                          <ClientCard
                            client={item}
                            handleClientData={handleSubmit}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Stack
                    className="center"
                    sx={{
                      height: "80vh",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    <Typography className="mb-18">
                      Create a new client
                    </Typography>
                    <CustomButton
                      url="/clients/add-client"
                      styles={"button submitButton"}
                      startIcon={<AddIcon />}
                      title="Client"
                    />
                  </Stack>
                )}
              </Box>
              <Box className="mb-50" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ClientPage;
