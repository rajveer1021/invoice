import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import InputField from "../shared/fields/InputField";

const DynamicFormSectionCreateClient = ({ sectionTitle, fields }) => (
  <>
    <Typography className="clientUpdateHeading">{sectionTitle}</Typography>
    <Box className="fieldsContainer mt-18">
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid key={index} item xs={12} sm={12} xl={12}>
            <InputField
              id={field.id}
              name={field.name}
              label={field.label}
              value={field.value}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  </>
);

export default DynamicFormSectionCreateClient;
