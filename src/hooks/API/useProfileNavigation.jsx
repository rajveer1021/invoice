import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProfileNavigation = (userData, subscriptionStatus, isLoading) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !userData) return;

    if (!userData.profile_completed) {
      navigate("/business-info");
    } else if (subscriptionStatus && subscriptionStatus !== "active") {
      navigate("/subscription");
    }
  }, [userData, subscriptionStatus, isLoading, navigate]);
};