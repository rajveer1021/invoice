import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormikContext, Field } from "formik";
import { invoiceUnit } from "../../../constant";

const UnitField = ({ id, name, label }) => {
  const { setFieldValue, handleBlur } = useFormikContext();
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const handleChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Unit") {
      setFieldValue(name, "");
      setIsCustomSelected(false);
    } else {
      setFieldValue(name, selectedValue);
      setIsCustomSelected(selectedValue === "custom");
    }
  };

  const handleClear = () => {
    setFieldValue(name, "");
    setIsCustomSelected(false);
  };

  const isCustomField = (value) =>
    value && !invoiceUnit.some((option) => option.value === value);

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="mt-10">
          {isCustomSelected || isCustomField(field.value) ? (
            <TextField
              label={
                <Typography sx={{ fontSize: "0.8rem" }}>Custom</Typography>
              }
              className="autoCompleteUnitField customField"
              onChange={(event) => setFieldValue(name, event.target.value)}
              onBlur={handleBlur}
              value={field.value === "custom" ? "" : field.value}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="clear custom input" edge="end">
                      <ClearIcon
                        sx={{ fontSize: "0.8rem" }}
                        onClick={handleClear}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <FormControl
              fullWidth
              className="autoCompleteUnitField smallField selectfield"
            >
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                key={field.value}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field.value}
                label="Unit"
                onChange={handleChange}
              >
                {invoiceUnit.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label === "unit"
                      ? option.label.charAt(0).toUpperCase() +
                        option.label.slice(1)
                      : option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
      )}
    </Field>
  );
};

export default UnitField;
