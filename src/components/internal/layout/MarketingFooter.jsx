import {
  Box,
  Container,
  Divider,
  Grid,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InvoiceanLogo from "../../..//assets/logo/logo-light.png";
import { Link } from "react-router-dom";
import { footerLinksGeneral, footerLinksLegal } from "../../../constant";
import ManageCookiesSection from "../dialog-box/ManageCookiesSection";

const MarketingFooter = () => {
  const [manageOpen, setManageOpen] = useState(false);
  const handleManageOpen = () => {
    setManageOpen(true);
  };
  return (
    <>
      <Box className="footer-section">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="footer-logo mb-30">
                <Link to="/">
                  <Box
                    component="img"
                    src={InvoiceanLogo}
                    className="logo"
                    alt="about invoicean logo"
                  />
                </Link>
              </Box>
              <Typography className="content">
                Discover the power of Invoicean – your ultimate invoicing
                solution. Simplify your billing process, manage clients
                effortlessly, and stay organized with our intuitive platform.
              </Typography>
            </Grid>
            <Grid item xs={0} sm={6} md={2} />

            <Grid item xs={12} sm={6} md={3}>
              <Box className="footer-links mt-18">
                <Typography className="heading">General</Typography>
                <MenuList>
                  {footerLinksGeneral.map((link, index) => (
                    <MenuItem
                      key={index}
                      component={Link}
                      to={link.path}
                      className="links"
                    >
                      {link.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="footer-links mt-18">
                <Typography className="heading">Legal</Typography>
                <MenuList>
                  {footerLinksLegal.map((link, index) => (
                    <MenuItem
                      key={index}
                      component={Link}
                      to={link.path}
                      className="links"
                    >
                      {link.label}
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleManageOpen} className="links">
                    Manage Cookies
                  </MenuItem>
                </MenuList>
              </Box>
            </Grid>
          </Grid>
          <Divider className="mb-18 mt-18 divider" />
          <Typography className="footer-content" textAlign="end">
            Copyright © 2024 Invoicean
          </Typography>
        </Container>
        {manageOpen && (
          <ManageCookiesSection
            isOpen={manageOpen}
            handleClose={() => setManageOpen(false)}
          />
        )}
      </Box>
    </>
  );
};

export default MarketingFooter;
