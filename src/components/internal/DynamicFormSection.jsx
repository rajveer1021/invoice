import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import InputField from "../shared/fields/InputField";

const DynamicFormSection = ({ sectionTitle, fields }) => (
  <>
    <Typography className="clientUpdateHeading">{sectionTitle}</Typography>
    <Box className="fieldsContainer mt-18">
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        className="mt-18"
      >
        {fields.map((field, index) => (
          <InputField
            id={field.id}
            name={field.name}
            label={field.label}
            value={field.value}
            max={true}
          />
        ))}
      </Stack>
    </Box>
  </>
);

export default DynamicFormSection;
