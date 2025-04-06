import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClientDetails from "../../internal/ClientDetails";
import CreateInvoiceClient from "../../internal/dialog-box/CreateInvoiceClient";

const ClientFields = ({
  values,
  handleSelectedClient,
  data = [],
  clientLoading,
  defaultClientId,
  clientDetails,
  setUpdateClient,
  setSelectedClient,
  updateClient,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clearFields, setClearFields] = useState(false);

  const handleSelect = (event, newValue) => {
    setSelectedItem(newValue);
    if (newValue) {
      handleSelectedClient(newValue.id);
    }
  };

  useEffect(() => {
    updateClient && setSelectedItem(updateClient?.data?.id);
    updateClient && handleSelectedClient(updateClient?.data?.id);
  }, [updateClient, handleSelectedClient]);

  useEffect(() => {
    if (defaultClientId) {
      const defaultClient = data?.find(
        (client) => client.id === defaultClientId
      );
      if (defaultClient && !clearFields) {
        setSelectedItem(defaultClient);
        handleSelectedClient(defaultClientId);
      }
    }
  }, [defaultClientId, data, handleSelectedClient, clearFields]);

  return (
    <>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={{ xs: "100%", sm: "100%" }}
          maxWidth={"350px"}
        >
          <Typography className="invoiceNumber">To</Typography>
          {selectedItem ? (
            <CloseIcon
              onClick={() => {
                setSelectedItem(null);
                setUpdateClient(null);
                setSelectedClient(null);
                setClearFields(true);
              }}
            />
          ) : (
            <CreateInvoiceClient setUpdateClient={setUpdateClient} />
          )}
        </Stack>
        <Box>
          {!selectedItem && (
            <Autocomplete
              options={data}
              getOptionLabel={(option) => option?.name}
              value={selectedItem || undefined}
              className="mt-10"
              onChange={handleSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Client"
                  variant="outlined"
                  className="smallField"
                />
              )}
            />
          )}
          {selectedItem && (
            <>
              {clientLoading ? (
                <Box className="center" height="100%">
                  <CircularProgress size={20} />
                </Box>
              ) : (
                <>
                  <ClientDetails clientDetails={clientDetails} />
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ClientFields;
