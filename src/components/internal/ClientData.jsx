import React from "react";
import { Autocomplete, TextField, Box, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { currencies, dueDates } from "../../constant/index";

const ClientData = ({
  selectedDueDate,
  setSelectedDueDate,
  handleDateChange,
  selectedDate,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  return (
    <>
      <Box className="align-right">
        <Box className="logoContainer ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="dateField mt-10"
              padding={0}
              label="Invoice Date"
              value={selectedDate}
              name="date"
              fullWidth
              format="DD/MM/YYYY"
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <Autocomplete
            options={dueDates}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            className="currencyField mt-10"
            fullWidth
            value={selectedDueDate !== undefined && selectedDueDate}
            getOptionLabel={(option) => `${option.label}`}
            renderOption={(props, option) => (
              <MenuItem {...props}>{option.label}</MenuItem>
            )}
            onChange={(event, newValue) => {
              setSelectedDueDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Due Date" />}
          />

          <Autocomplete
            fullWidth
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            className="currencyField mt-10"
            value={selectedCurrency !== undefined && selectedCurrency}
            onChange={(event, newSelectedCurrency) => {
              setSelectedCurrency(newSelectedCurrency);
            }}
            options={currencies}
            getOptionLabel={(option) => `${option.label}-${option.code}`}
            renderOption={(props, option) => (
              <MenuItem {...props}>
                {option.label}-{option.code}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Currency"
                variant="outlined"
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
};

export default ClientData;
