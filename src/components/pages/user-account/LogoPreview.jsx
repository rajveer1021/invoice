import React from "react";
import { useFormikContext } from "formik";
import { InputLabel, Box, Input } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const LogoPreview = ({ companyLogoPreview, handleUpdatecompanyLogo }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <Box className="profile">
        <Box className="profile-container">
          <Box
            component="img"
            alt="organisation-logo"
            src={companyLogoPreview}
            className="profile-icon"
            variant="square"
          />
          <Box className="update-profile-btn">
            <InputLabel className="image-upload" htmlFor="file-input">
              <UploadIcon />
            </InputLabel>

            <Input
              id="file-input"
              type="file"
              accept="image/*"
              className="file"
              sx={{ display: "none" }}
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                setFieldValue("company_logo", file);
                handleUpdatecompanyLogo(file);
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LogoPreview;
