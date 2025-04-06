import { Box, Divider, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetPreviewInvoiceQuery } from "../../../services/Api";
import useAuthentication from "../../../hooks/useAuthentication";
import FullscreenLoader from "../../shared/loader/FullscreenLoader";
import SideHeader from "../../internal/layout/side-header";
import TopHeader from "../../shared/TopHeader";
import ClientDetailsSection from "../../internal/ClientDetailsSection";
import ItemDetails from "../../internal/ItemDetails";
import ShareableLink from "../../internal/ShareableLink";
import NotesDetailsSection from "../../internal/NotesDetailsSection";
import InvoiceFooter from "../../internal/InvoiceFooter";
import FallbackComponent from "../../shared/FallbackComponent";
import UserData from "../../internal/UserData";
import { getStatusColors } from "../../../services/Utils";

const InvoicePreview = () => {
  useAuthentication();
  const mobile = useMediaQuery("(max-width:600px)");
  const { id } = useParams();
  const [sent, setSent] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [shareableLink, setShareableLink] = React.useState("");
  const [getPreviewInvoice, { data, isLoading, isError }] =
    useLazyGetPreviewInvoiceQuery();

  useEffect(() => {
    getPreviewInvoice({ invoice_id: id });
    setStatusUpdate(false);
    setSent(false);
  }, [getPreviewInvoice, id, statusUpdate, sent, data, isLoading]);

  const generateShareableLink = () => {
    const uniqueLink = `${window.location.origin}/invoices/${data?.data?.invoice?.uuid}/share`;
    setShareableLink(uniqueLink);
  };
 
  const invoiceStatus = data?.data?.invoice?.status;
  const { boxBackgroundColor, textColor } = getStatusColors(invoiceStatus);

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
          <Box className="invoicePreview">
            <TopHeader
              title="Invoice"
              AddBtnTitle={"Edit invoice"}
              AddBtnURL={`/invoices/edit-invoice/${id}`}
              dropdown={true}
              id={id}
              invoiceName={data?.data?.invoice?.invoice_name}
              generateShareableLink={generateShareableLink}
              data={data}
              setStatusUpdate={setStatusUpdate}
              setSent={setSent}
            />
            <Box className="layout invoice-background">
              <Grid container>
                <Grid item xs={12} sm={12} md={8.7}>
                  {shareableLink && <ShareableLink content={shareableLink} />}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box className="invoicePreviewContainer mt-30">
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Stack direction="row" alignItems="center">
                              <Box
                                className="invoice-status"
                                sx={{
                                  backgroundColor: boxBackgroundColor,
                                  color: textColor,
                                }}
                              >
                                {data?.data?.invoice?.status}
                              </Box>
                              <Box className="invioceName ml-10">
                                {data?.data?.invoice?.invoice_name}
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
        </Grid>
      </Grid>
    </>
  );
};

export default InvoicePreview;
