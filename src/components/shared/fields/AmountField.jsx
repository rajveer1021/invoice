import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";

const AmountField = ({
  id,
  name,
  label,
  type,
  rows,
  data,
  rate,
  quantity,
  currency,
  disabled,
}) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const [amt, setAmt] = useState(data || "");

  const handlemultiply = () => {
    if (
      rate !== undefined &&
      rate > "0.00" &&
      quantity !== undefined &&
      quantity > 0
    ) {
      const amount = (rate || 0) * (quantity || 0);
      setAmt(amount.toFixed(2));
      setFieldValue(name, amount.toFixed(2));
    } else {
      setFieldValue(name, amt);
    }
  };

  useEffect(() => {
    handlemultiply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate, quantity]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (
      (rate === undefined || rate === "0.0") &&
      (quantity === undefined || quantity === 0)
    ) {
      setAmt(value);
      setFieldValue(name, value);
    } else {
      const amount = (rate || 0) * (quantity || 0);
      setAmt(amount.toFixed(2));
      setFieldValue(name, amount.toFixed(2));
    }
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
          multiline
          rows={rows}
          value={amt}
          disabled={disabled}
          onChange={handleInputChange}
          onBlur={handlemultiply}
          error={touched[name] && !!errors[name]}
          className="smallTextField"
          sx={{ fontSize: "0.75rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography className="font-12"> {currency}</Typography>
              </InputAdornment>
            ),
          }}
        />

        {touched[name] && errors[name] && (
          <FormHelperText>{errors[name]}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default AmountField;
