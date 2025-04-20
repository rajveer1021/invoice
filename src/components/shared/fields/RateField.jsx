import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const RateField = ({ id, name, label, value, disabled }) => {
  const { setFieldValue, handleBlur, touched, errors } = useFormikContext();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const newValue = Math.max(parseFloat(inputValue), 0);
    setFieldValue(name, isNaN(newValue) ? 0 : newValue);
  };

  return (
    <>
      <FormControl
        fullWidth
        error={touched[name] && !!errors[name]}
        className="smallTextField"
      >
        <TextField
          fullWidth
          id={id}
          name={name}
          label={label}
          type="number"
          value={parseFloat(value)||""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched[name] && !!errors[name]}
          disabled={disabled}
          className="smallTextField"
          sx={{ fontSize: "0.75rem" }}
          inputProps={{
            pattern: "[0-9]*",
            inputMode: "numeric",
          }}
        />
        {touched[name] && errors[name] && (
          <FormHelperText>{errors[name]}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default RateField;
