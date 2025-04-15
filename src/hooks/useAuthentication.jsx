import { useState, useEffect } from "react";
import { useAuthCheck } from "./API/useAuthCheck";
import { useSubscriptionData } from "./API/useSubscriptionData";
import { useProfileNavigation } from "./API/useProfileNavigation";

const useAuthentication = () => {
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  
  const { isAuthenticated, userData, isChecking } = useAuthCheck();
  
  const { isSubscriptionLoading, subscriptionStatus } = useSubscriptionData(
    isAuthenticated && !isChecking
  );
  
  useProfileNavigation(
    userData, 
    subscriptionStatus, 
    isChecking || isSubscriptionLoading
  );

  useEffect(() => {
    if (!isChecking && !isSubscriptionLoading) {
      const timer = setTimeout(() => {
        setIsFullyLoaded(true);
      }, 5);
      
      return () => clearTimeout(timer);
    }
  }, [isChecking, isSubscriptionLoading]);

  return { 
    isAuthLoading: !isFullyLoaded,
    userData,
    subscriptionStatus
  };
};

export default useAuthentication;