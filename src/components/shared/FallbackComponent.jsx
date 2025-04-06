import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "./CustomButton";
import { useNavigate } from "react-router-dom";

const FallbackComponent = () => {

    const navigate = useNavigate();

    const handlelogout = () => {
        localStorage.clear();
        navigate("/login")
    }
  return (
    <>
      <Box className="fallback-container">
        <Container>
          <Box className="content-box "> 
           
            <Typography className="error-msg">
            Authentication Error: Access Expired
            </Typography>
            <Typography className="error-reason mt-18">
              We were unable to verify your
              identity. <br />
              Please double-check your credentials and try again.
            </Typography>
            <CustomButton
              title="Try to login again !"
              styles="submitButton button btn-primary mt-30"
              handleClick={handlelogout}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FallbackComponent;
