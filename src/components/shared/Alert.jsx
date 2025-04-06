import React from "react";
import { Alert } from "@mui/material";

export const ErrorAlert = ({ errorMessage }) => {
  return (
    <Alert severity="error" className="mt-18">
      {errorMessage}
    </Alert>
  );
};

export const SuccessAlert = ({ successMessage }) => {
  return (
    <Alert severity="success" className="mt-18">
      {successMessage}
    </Alert>
  );
};
