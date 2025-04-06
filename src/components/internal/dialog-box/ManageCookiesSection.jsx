import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import useCookiesAPI from "../../../hooks/API/useCookiesAPI";
import { getCookie, setCookie } from "../../../services/Utils";

const ManageCookiesSection = ({ isOpen, handleClose }) => {
  const [functional, setFunctional] = useState({ functional: false, guid: null });
  const syncGuidWithApi = useCookiesAPI();

  useEffect(() => {
    const storedSettings = getCookie("cookie_consent");
    if (storedSettings) {
      setFunctional(storedSettings);
    }
  }, []);

  const handleConfirm = (acceptAll) => {
    const updatedSettings = { functional: acceptAll, guid: functional.guid };
    syncGuidWithApi(acceptAll);
    setFunctional(updatedSettings);
    setCookie("cookie_consent", updatedSettings, 365);
    handleClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  const handleCookieSwitchChange = () => {
    const newSettings = {
      ...functional,
      functional: !functional.functional,
    };
    setFunctional(newSettings);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="cookiesDialogBox"
      onClick={handleBackdropClick}
      disableEscapeKeyDown={true}
    >
      <DialogTitle className="cookiesHeading center">
        Personalize your invoicing experience
      </DialogTitle>
      <Divider />
      <DialogActions className="mt-18">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          width="100%"
          spacing={2}
        >
          <Button
            onClick={() => handleConfirm(false)}
            variant="outlined"
            className="rejectBtn"
          >
            Reject All
          </Button>
          <Button
            onClick={() => handleConfirm(true)}
            variant="contained"
            className="acceptBtn"
          >
            Accept All
          </Button>
        </Stack>
      </DialogActions>
      <DialogContent>
        <Typography className="cookiesInformation">
          We use cookies – small data files – to make our website as functional,
          relevant, and helpful for you as we can. Allowing cookies means we can
          personalize your invoicing journey and give you the best Invoicean
          experience.
        </Typography>
        <Typography className="cookiesInformation mt-18">
          You can also choose to reject cookies, or manage which ones are used
          while you browse. Disabling cookies means your experience of using our
          website will be limited to essential functionality only.
        </Typography>
        <Typography className="cookiesInformation mt-18">
          You can find out more on our
          <Link to="/legal/cookies-policy" className="cookiePageLink">
            {" "}
            cookie page
          </Link>{" "}
          at any time.
        </Typography>
        <FormControlLabel
          className="mt-18"
          checked
          control={<Switch disabled />}
          label={<Typography className="toggleBtnLable">Essential</Typography>}
        />
        <Typography className="cookiesInformation">
          These cookies are needed for essential functions such as making
          payments. Standard cookies can’t be switched off and they don’t store
          any of your information.
        </Typography>
        <FormControlLabel
          className="mt-18"
          control={<Switch disabled />}
          checked
          label={<Typography className="toggleBtnLable">Analytics</Typography>}
        />
        <Typography className="cookiesInformation">
          These cookies gather information such as how many people are using our
          site or which pages are popular to help us improve customer
          experience. Switching off these cookies will mean we can’t gather
          information to improve the experience.
        </Typography>
        <FormControlLabel
          className="mt-18"
          control={
            <Switch
              checked={functional.functional}
              onChange={handleCookieSwitchChange}
            />
          }
          label={<Typography className="toggleBtnLable">Functional</Typography>}
        />
        <Typography className="cookiesInformation">
          These cookies make your shopping experience easier. They enable basic
          functions such as seeing recently viewed products or searches.
          Switching off these cookies will mean that areas of our website won't
          work properly for you.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleConfirm(functional.functional)}
          className="saveCookiesBtn"
          variant="contained"
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageCookiesSection;
