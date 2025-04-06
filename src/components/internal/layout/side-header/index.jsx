import { Box, Stack, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import logo from "../../../../assets/logo/logo-dark.png";
import { getUserDataFromLocalStorage } from "../../../../services/Utils";
import LogoutDialog from "./../../dialog-box/LogoutDialog";
import organsisation from "../../../../assets/images/organisation.jpeg";

const getCategoryFromPath = (path) => {
  if (
    path.startsWith("/invoices") ||
    path.startsWith("/invoices/create-invoice") ||
    path.startsWith("/preview") ||
    path.startsWith("/invoices/edit-invoice")
  ) {
    return "/invoices";
  } else if (path.startsWith("/dashboard")) {
    return "/dashboard";
  } else if (
    path.startsWith("/clients") ||
    path.startsWith("/clients/add-client") ||
    path.startsWith("/clients/edit-client")
  ) {
    return "/clients";
  } else if (path.startsWith("/accounts")) {
    return "/accounts";
  } else if (path.startsWith("/reports")) {
    return "/reports";
  }
  return "";
};

const SideHeader = ({ isTourActive }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState("");
  const navItems = [
    {
      path: "/dashboard",
      text: "Dashboard",
      icon: <BarChartOutlinedIcon />,
      id: "dashboard",
    },
    {
      path: "/invoices",
      text: "Invoices",
      icon: <DescriptionOutlinedIcon />,
      id: "invoices",
    },
    {
      path: "/reports",
      text: "Reports",
      icon: <PieChartOutlineOutlinedIcon />,
      id: "reports",
    },
    {
      path: "/clients",
      text: "Clients",
      icon: <PeopleAltOutlinedIcon />,
      id: "clients",
    },
    {
      path: "/accounts",
      text: "Accounts",
      icon: <SettingsOutlinedIcon />,
      id: "accounts",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [dialogeOpen, setDialogeOpen] = React.useState(false);

  const userData = getUserDataFromLocalStorage();

  const handleMenu = (event) => {
    setOpen(!open);
  };

  useEffect(() => {
    const category = getCategoryFromPath(location.pathname);

    if (category) {
      localStorage.setItem("activePath", category);
      setActivePath(category);
    }
  }, [location.pathname]);

  useEffect(() => {
    const storedActivePath = localStorage.getItem("activePath");
    if (storedActivePath) {
      setActivePath(storedActivePath);
    }
  }, []);

  return (
    <>
      <Box className="sideHeader" id="sideHeader">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          className="invoiceanLogo"
        >
          <Link to="/">
            <Box className="imageContainer center">
              <Box component="img" src={logo} alt="Logo" className="logo" />
            </Box>
          </Link>
        </Stack>
        <Divider sx={{ width: "100%" }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          paddingTop="1.125rem"
        >
          <Box className="user-logo-container">
            <Box
              component="img"
              className="user-logo"
              src={userData?.company_logo || organsisation}
              alt="company-logo"
            />
          </Box>
          <Box className="user-logo-content">
            <Typography className="heading">
              {userData?.company_name}
            </Typography>
            <Typography className="sub-heading">{userData?.country}</Typography>
          </Box>
        </Stack>
        <Divider sx={{ width: "100%" }} className="mt-18" />
        <Stack direction="column" className="mt-18">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              id={item.id}
              className={` mt-18 ${
                activePath === item.path ? "active" : "dashboard-container"
              }`}
              onClick={(e) => {
                if (isTourActive) {
                  e.preventDefault();
                } else {
                  setActivePath(item.path);
                }
              }}
            >
              <Box className="dashboard-icon center">{item.icon}</Box>
              <Typography className="dashboard-content">{item.text}</Typography>
            </Link>
          ))}
          <Box
            className="dashboard-container mt-18"
            onClose={handleMenu}
            onClick={(e) => {
              if (isTourActive) {
                e.preventDefault();
              } else {
                handleMenu();
                setDialogeOpen(true);
              }
            }}
            id="logout"
          >
            <Box className="logout-icon center">
              <LogoutOutlinedIcon />
            </Box>
            <Typography className="dashboard-content">Logout</Typography>
          </Box>
        </Stack>
        <LogoutDialog
          dialogeOpen={dialogeOpen}
          setDialogeOpen={setDialogeOpen}
        />
      </Box>
    </>
  );
};

export default SideHeader;
