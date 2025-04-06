import { FormControl, FormHelperText } from "@mui/material";
import { useFormikContext } from "formik";
import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordField = ({ id, name, label, value,styles }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleChange, handleBlur, touched, errors } = useFormikContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl fullWidth variant="outlined" error={touched[name] && !!errors[name]} className={styles}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
         fullWidth
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          label={label}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          
          error={touched[name] && !!errors[name]}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched[name] && errors[name] && (
          <FormHelperText>{errors[name]}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};
PasswordField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
};

export default PasswordField;
