import { Box, Container, Divider, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetShareInvoiceDataQuery } from "../../../services";
import FullscreenLoader from "../../shared/loader/FullscreenLoader";
import ShareHeaderLink from "../../internal/layout/ShareHeaderLink";
import ItemDetails from "../../internal/ItemDetails";
import ClientDetailsSection from "../../internal/ClientDetailsSection";
import NotesDetailsSection from "../../internal/NotesDetailsSection";
import InvoiceFooter from "../../internal/InvoiceFooter";
import UserData from "../../internal/UserData";
import { getStatusColors } from "../../../services/Utils";

const ShareInvoice = () => {
  const { id } = useParams();

  const [getShareInvoiceData, { data, isLoading }] =
    useLazyGetShareInvoiceDataQuery();

  useEffect(() => {
    getShareInvoiceData({ uuid: id });
  }, [getShareInvoiceData, id]);

  const invoiceStatus = data?.data?.invoice?.status;
  const { boxBackgroundColor, textColor } = getStatusColors(invoiceStatus);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <>
      <ShareHeaderLink data={data} />
      <Box className="front-screen-container">
        <Container maxWidth="md">
          <Box className="invoicePreview">
            <Box className="invoice-background">
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box className="invoicePreviewContainer">
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Stack direction="row" alignItems="center">
                              <Box className="invioceName">
                                <strong>
                                  {data?.data?.invoice?.invoice_name}
                                </strong>
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Box className="mt-30">
                          <UserData response={data?.data?.business_info} />
                        </Box>
                        <Divider
                          sx={{ width: "100%" }}
                          className="mt-18 mb-18"
                        />
                        <ClientDetailsSection
                          client={data?.data?.client}
                          invoice={data?.data?.invoice}
                        />

                        <Divider
                          sx={{ width: "100%" }}
                          className="mt-18 mb-18"
                        />
                        <ItemDetails
                          boxBackgroundColor={boxBackgroundColor}
                          itemInfo={data?.data?.item}
                          invoice={data?.data?.invoice}
                          textColor={textColor}
                          data={data?.data}
                        />

                        {data?.data?.invoice?.note && (
                          <>
                            <NotesDetailsSection
                              notesContent={data?.data?.invoice?.note}
                            />
                          </>
                        )}
                        <Divider
                          sx={{ width: "100%" }}
                          className="mt-18 mb-18"
                        />
                        <InvoiceFooter
                          email={
                            data?.data?.business_info?.company_email_address
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box className="mb-50" />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ShareInvoice;
