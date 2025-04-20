import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const QuantityField = ({ id, name, label, value, disabled }) => {
  const { handleBlur, setFieldValue, touched, errors } = useFormikContext();

  const handleQuantityChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue, 10);

   if (inputValue === "") {
    setFieldValue(name, 0); 
  } else if (!isNaN(numericValue)) {
    const newValue = Math.max(numericValue, 0);
    setFieldValue(name, newValue);
  }
  };

  return (
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
        onChange={handleQuantityChange}
        onBlur={handleBlur}
        error={touched[name] && !!errors[name]}
        disabled={disabled}
        className="smallTextField"
        inputProps={{
          pattern: "[0-9]*",
          inputMode: "numeric",
        }}
      />
      {touched[name] && errors[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default QuantityField;
