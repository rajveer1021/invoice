import React, { useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";

const GenericDateTimePicker = ({
  label,
  defaultValue,
  onChange,
  error,
  helperText,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState(
    dayjs(defaultValue || new Date())
  );

  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(newDateTime);
    onChange(newDateTime);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{width:"100%"}}>
        <DateTimePicker
          label={label}
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          sx={{width:"100%"}}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              className="genericDateTimePicker"
            />
          )}
          error={Boolean(error)}
          helperText={helperText}
          format="DD-MM-YYYY hh:mm A"
        />
      </LocalizationProvider>
    </>
  );
};

export default GenericDateTimePicker;
