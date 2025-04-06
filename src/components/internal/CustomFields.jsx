import React from "react";
import { TextField, Box, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomField = ({
  field,
  index,
  onChange,
  onRemove,
  showRemoveButton,
}) => {
  return (
    <Box className="mt-18">
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        className="mt-18"
      >
        <TextField
          name={`customFields[${index}].name`}
          label="Custom Field Name"
          variant="outlined"
          fullWidth
          value={field.name || ""}
          onChange={onChange}
          sx={{ maxWidth: "31.25rem" }}
        />
        <TextField
          name={`customFields[${index}].value`}
          label="Custom Field Value"
          variant="outlined"
          fullWidth
          value={field.value || ""}
          onChange={onChange}
          sx={{ maxWidth: "31.25rem" }}
        />
        {showRemoveButton && (
          <Box className="deleteIconLayout">
            <DeleteIcon
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => onRemove(index)}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default CustomField;
