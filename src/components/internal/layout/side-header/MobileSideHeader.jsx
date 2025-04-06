import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import SideHeader from ".";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

const MobileSideHeader = () => {
  const mobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      {mobile && <MenuIcon onClick={toggleDrawer(true)} className="mr-5" />}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="sideBarDrawer"
      >
        <SideHeader toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default MobileSideHeader;
