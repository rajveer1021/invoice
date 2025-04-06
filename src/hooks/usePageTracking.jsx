import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export const usePageTracking = () => {
  const location = useLocation();
  const trackingID = "G-ZB0MJ37G8V";

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(trackingID);
    }
  }, [location]);
};
