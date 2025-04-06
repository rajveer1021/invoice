import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CustomField from "./CustomFields";

const DynamicCustomFieldSection = ({
  sectionTitle,
  values,
  handleChange,
  setFieldValue,
}) => {
  const handleRemoveField = (idx) => {
    if (values.customFields.length <= 1) {
      return;
    }
    const newFields = [...values.customFields];
    newFields.splice(idx, 1);
    setFieldValue("customFields", newFields);
  };

  return (
    <>
      <Typography className="clientUpdateHeading">{sectionTitle}</Typography>
      <Box className="fieldsContainer mt-18">
        {values.customFields?.map((field, index) => (
          <CustomField
            field={field}
            index={index}
            onChange={handleChange}
            onRemove={() => handleRemoveField(index)}
            showRemoveButton={values.customFields.length > 1}
          />
        ))}
        <Grid item xs={12}>
          <Button
            type="button"
            variant="outlined"
            className="addCustomFieldBtn mt-18"
            onClick={() => {
              setFieldValue("customFields", [
                ...values.customFields,
                { name: "", value: "" },
              ]);
            }}
          >
            New Custom Field
          </Button>
        </Grid>
      </Box>
    </>
  );
};

export default DynamicCustomFieldSection;
