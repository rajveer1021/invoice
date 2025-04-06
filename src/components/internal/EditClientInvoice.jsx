import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClientDetails from "./ClientDetails";

const EditClientInvoice = ({
  values,
  handleSelectedClient,
  data = [],
  response,
  id,
  clientDetails,
}) => {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    const selectedClient = data?.find((client) => client.id === id);
    setSelectedItem(selectedClient || null);
  }, [data, id]);

  const handleSelect = (event, newValue) => {
    setSelectedItem(newValue);
    if (newValue) {
      handleSelectedClient(newValue.id);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width={{ xs: "100%", sm: "80%" }}
      >
        <Typography className="invoiceNumber">To</Typography>
        {selectedItem && (
          <CloseIcon
            onClick={() => {
              setSelectedItem(null);
            }}
          />
        )}
      </Stack>

      <Box>
        {selectedItem ? (
          <ClientDetails
            clientDetails={clientDetails}
          />
        ) : (
          <Autocomplete
            options={data}
            getOptionLabel={(option) => option?.name}
            value={selectedItem}
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
      </Box>
    </Box>
  );
};

export default EditClientInvoice;
