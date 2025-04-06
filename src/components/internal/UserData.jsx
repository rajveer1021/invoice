import React from "react";
import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import organisation from "../../assets/images/organisation.jpeg";

const UserData = ({ response }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          {response ? (
            <Box className="user-details">
              <Typography className="user-heading">From</Typography>
              <Typography className="user-content">
                {response?.company_name}
              </Typography>
              <Typography className="user-content">
                {response?.address}
              </Typography>
              <Typography className="user-content">
                {response?.address_1}
              </Typography>
              <Typography className="user-content">
                {(() => {
                  const values = [
                    response?.city,
                    response?.state,
                    response?.postal_code,
                  ];
                  const nonEmptyValues = values.filter(Boolean);
                  return nonEmptyValues.length > 0
                    ? nonEmptyValues.join(", ")
                    : "";
                })()}
              </Typography>
              <Typography className="user-content">
                {response?.country}
              </Typography>
              {response?.custom_fields_attributes &&
                response?.custom_fields_attributes.map(
                  ({ name, value }, index) =>
                    name && (
                      <Typography key={index} className="user-content">
                        {name}: {value}
                      </Typography>
                    )
                )}
            </Box>
          ) : (
            <CircularProgress size={20} />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box className="user-logo">
            <Box className="logoBox">
              {response?.company_logo !== undefined ? (
                <img
                  alt="logo"
                  src={response?.company_logo || organisation}
                  className="logo"
                />
              ) : (
                <CircularProgress size={20} />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserData;
