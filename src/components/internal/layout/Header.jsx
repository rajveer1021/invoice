import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Logo from "../../../assets/logo/logo-dark.png";
import LogoutDialog from "../dialog-box/LogoutDialog";
import { CustomButton } from "../../shared/CustomButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Header = () => {
  const [dialogeOpen, setDialogeOpen] = React.useState(false);

  const handlelogut = () => {
    setDialogeOpen(true);
  };
  return (
    <>
      <Box position="fixed" className="header">
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={6} sm={8} className="headerContainer">
              <Link to="/">
                <Box className="logoContainer">
                  <Box component="img" alt="logo" src={Logo} className="logo" />
                </Box>
              </Link>
            </Grid>
            <Grid item xs={6} sm={4} className="headerContainerLogout">
              <CustomButton
                handleClick={handlelogut}
                styles={"logoutButton logout"}
                title={"Logout"}
                startIcon={<LogoutIcon sx={{ fontSize: "1.3rem" }} />}
              />
              <LogoutDialog
                dialogeOpen={dialogeOpen}
                setDialogeOpen={setDialogeOpen}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Header;
