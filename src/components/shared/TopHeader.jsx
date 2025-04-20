import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import MobileSideHeader from "./../internal/layout/side-header/MobileSideHeader";
import SelectAction from "./../internal/drop-down/SelectAction";
import { getUserDataFromLocalStorage } from "../../services/Utils";
import { CustomButton } from "./CustomButton";
import { useInvoiceQuota } from "../../hooks/API/useInvoiceQuota";

const TopHeader = ({
  clientUrl,
  InvoiceUrl,
  clientTitle,
  title,
  AddBtnTitle,
  AddBtnURL,
  handleClick,
  RedirectButtonTttle,
  draftTitle,
  setDrafted,
  dropdown,
  id,
  generateShareableLink,
  data,
  setStatusUpdate,
  handleSaveAndPreview,
  setSent,
  handleUpdateButton,
  invoiceName,
  isTourActive,
}) => {
  const mobile = useMediaQuery("(max-width:600px)");
  const handleDraftClick = (event) => {
    event.preventDefault();
    setDrafted(true);
    handleSaveAndPreview();
  };

  const userData = getUserDataFromLocalStorage();

  const { canCreateInvoice, canCreateClient, isLoading, error } = useInvoiceQuota(true);

  const isInvoiceQuotaExceeded = !canCreateInvoice;
  const isClientQuotaExceeded = !canCreateClient;

  const RemoveDupilcateData = () => localStorage.removeItem("duplicateData");

  return (
    <>
      <Box className="TopHeader" id="targetElement">
        <MobileSideHeader />
        <Typography className="heading">
          {!mobile && `${userData?.company_name} - ${title}`}
        </Typography>

        <Stack
          direction={{ xs: "row", sm: "row" }}
          spacing={1.5}
          alignItems="center"
          justifyContent="center"
        >
          {clientUrl && (
            <CustomButton
              title={clientTitle}
              styles="button-primary button"
              startIcon={<AddIcon />}
              id={"createClient"}
              url={clientUrl}
              disabled={isTourActive || isClientQuotaExceeded || isLoading || !!error}
            />
          )}
          {InvoiceUrl && (
            <CustomButton
              title={"Invoice"}
              styles="button-primary button"
              startIcon={<AddIcon />}
              id="createInvoice"
              url={InvoiceUrl}
              disabled={isTourActive || isInvoiceQuotaExceeded || isLoading || !!error}
              handleClick={RemoveDupilcateData}
            />
          )}
          {AddBtnTitle && (
            <CustomButton
              title={AddBtnTitle}
              styles="button-primary button"
              url={AddBtnURL}
              handleClick={RemoveDupilcateData}
            />
          )}
          {handleClick && (
            <CustomButton
              title={RedirectButtonTttle}
              styles="button-primary button"
              url={AddBtnURL}
              handleClick={handleClick}
            />
          )}
          {handleUpdateButton && (
            <CustomButton
              title={RedirectButtonTttle}
              styles="button-primary button"
              handleClick={handleUpdateButton}
            />
          )}

          {draftTitle && (
            <CustomButton
              title={draftTitle}
              styles="button-warning button"
              handleClick={handleDraftClick}
            />
          )}
          {handleSaveAndPreview && (
            <CustomButton
              title={RedirectButtonTttle}
              styles="saveButton button"
              handleClick={handleSaveAndPreview}
            />
          )}

          {dropdown && id ? (
            <SelectAction
              id={id}
              invoiceData={data}
              generateShareableLink={generateShareableLink}
              setStatusUpdate={setStatusUpdate}
              setSent={setSent}
              invoiceName={invoiceName}
            />
          ) : null}
        </Stack>
      </Box>
      <Box sx={{ backgroundColor: "#fff" }}>
        <Divider
          sx={{
            marginInline: "1rem",
          }}
        />
      </Box>
    </>
  );
};

export default TopHeader;