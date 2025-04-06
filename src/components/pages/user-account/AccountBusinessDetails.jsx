import { Box, Button, Stack } from "@mui/material";
import React from "react";
import Heading from "../../shared/Heading";
import InputField from "../../shared/fields/InputField";
import CustomField from "../../internal/CustomFields";

const AccountBusinessDetails = ({
  initialValues,
  handleChange,
  setFieldValue,
  values,
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
    <Box className="mt-30">
      <Heading title={"Business information"} />
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        className="mt-18"
      >
        <InputField
          id="company_name"
          name="company_name"
          label="Company name"
          value={initialValues.company_name}
          max={true}
        />

        <InputField
          id="company_email_address"
          name="company_email_address"
          label="Company email"
          type="email"
          value={initialValues.company_email_address}
          max={true}
        />
        <InputField
          id="website_url"
          name="website_url"
          label="Website url"
          value={initialValues.website_url}
          max={true}
        />
        <InputField
          id="phone_no"
          name="phone_no"
          label="Phone number"
          value={initialValues.phone_no}
          max={true}
        />
        <InputField
          id="address"
          name="address"
          label="Address 1"
          value={initialValues.address}
          max={true}
        />
        <InputField
          id="address_1"
          name="address_1"
          label="Address 2"
          value={initialValues.address}
          max={true}
        />
        <InputField
          id="postal_code"
          name="postal_code"
          label="Postal code"
          value={initialValues.postal_code}
          max={true}
        />
        <InputField
          id="city"
          name="city"
          label="City"
          value={initialValues.city}
          max={true}
        />
        <InputField
          id="state"
          name="state"
          label="State"
          value={initialValues.state}
          max={true}
        />
        <InputField
          id="country"
          name="country"
          label="Country"
          value={initialValues.country}
          max={true}
        />
      </Stack>
      <Box className="mt-18 ">
        <Heading title={"Custom Fields"} />
      </Box>

      <Box>
        {values.customFields?.map((field, index) => (
          <CustomField
            field={field}
            index={index}
            onChange={handleChange}
            onRemove={() => handleRemoveField(index)}
            showRemoveButton={values.customFields.length > 1}
          />
        ))}
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
      </Box>
    </Box>
  );
};

export default AccountBusinessDetails;
