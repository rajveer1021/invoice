import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const AutoCompleteField = ({
  data,
  label,
  onChange,
  initialSelectedId,
  helperText,
  dataValue,
}) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const disable = initialSelectedId ? true : false;

  useEffect(() => {
    if (data && data.length > 0) {
      const initialSelectedItem = data.find(
        (item) => item.id === initialSelectedId
      );
      setSelectedItemId(initialSelectedItem ? initialSelectedItem.id : null);
    }
  }, [data, initialSelectedId]);

  useEffect(() => {
    setSelectedItemId(null);
    onChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataValue]);

  const handleSelectionChange = (event, newValue) => {
    const newSelectedItemId = newValue ? newValue.id : null;
    setSelectedItemId(newSelectedItemId);
    onChange(newSelectedItemId);
  };

  const handleOpen = () => {
    setLoading(true);

    setTimeout(() => {
      setOptions(data || []);
      setLoading(false);
    }, 1000);
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => capitalizeFirstLetter(option?.name)}
      value={data?.find((item) => item.id === selectedItemId) || null }
      loading={loading}
      onOpen={handleOpen}
      disabled={disable}
      onChange={handleSelectionChange}
      renderInput={(params) => (
        <TextField
          {...params}
          error={helperText && true}
          label={label}
          className="autoCompleteField smallField"
          fullWidth
          disabled={disable}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AutoCompleteField;
