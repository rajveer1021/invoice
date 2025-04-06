import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import PropTypes from "prop-types";

const InputField = ({
  id,
  name,
  label,
  type = "text",
  disabled = false,
  max,
}) => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext();
    const maxWidthStyle = max ? { maxWidth: "500px" } : { maxWidth: "none" };

  return (
    <>
      <FormControl fullWidth error={touched[name] && !!errors[name]} sx={maxWidthStyle} >
        <TextField
          fullWidth
          id={id}
          name={name}
          label={label}
          type={type}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched[name] && !!errors[name]}
          inputMode={name === "otp_code" ? "numeric" : type}
          disabled={disabled}
        />
        {touched[name] && errors[name] && (
          <FormHelperText>{errors[name]}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
};

export default InputField;
