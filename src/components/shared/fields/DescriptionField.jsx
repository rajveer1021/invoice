import React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { FormControl, FormHelperText } from "@mui/material";
import { useFormikContext } from "formik";

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  max-width:30.875rem;
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  padding: 8px;
  border-color: #CACED5;
  border-radius:0.3125rem;

`
);

export default function DescriptionField({
  name,
  label,
  value,
  minRows,
  selectedOption,
  line_type_name,
}) {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
    setFieldValue(
      line_type_name,
      selectedOption ? selectedOption.toLowerCase() : "item"
    );
  };

  return (
    <FormControl fullWidth error={touched[name] && !!errors[name]}>
      <TextareaAutosize
        aria-label="empty textarea"
        minRows={minRows}
        name={name}
        placeholder={label}
        value={value}
        onChange={handleChange}
        onBlur={() => setFieldTouched(name, true)}
      />
      {touched[name] && errors[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
}
