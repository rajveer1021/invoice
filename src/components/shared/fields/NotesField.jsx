import React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { FormControl, FormHelperText } from "@mui/material";
import { useFormikContext } from "formik";

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  max-width:100%;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 11px;
border-color: #CACED5;
border-radius:0.3125rem;
white-space: pre-line;
`
);

export default function NotesField({
  id,
  name,
  label,
  value,
  minRows,
  state,
  disabled = false,
}) {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
  };

  return (
    <FormControl
      fullWidth
      error={touched[name] && !!errors[name]}
      sx={{ borderColor: "#CACED5" }}
    >
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
