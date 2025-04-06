import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const SearchAutoComplete = ({ options=[], setSelectedOption }) => {
  const handleSelectionChange = (event, newValue) => {
    setSelectedOption(newValue);
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option?.name}
      onChange={handleSelectionChange}
      size="small"
      style={{ height: "48px", maxWidth: "29.6875rem" }}
      renderInput={(params) => (
        <TextField
          {...params}
          style={{ height: "48px" }}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <SearchIcon />
                {params.InputProps.startAdornment}
              </>
            ),
          }}
          placeholder="Search by Client Name"
        />
      )}
    />
  );
};

export default SearchAutoComplete;
