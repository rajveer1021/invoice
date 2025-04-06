import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateField = ({ label, value, onChange  }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="dateField"
            label={label}
            value={value}
            name="date"
            fullWidth
            onChange={onChange}
          />
      </LocalizationProvider>
    </>
  );
};

export default DateField;
