import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetSubscribedPlanQuery, useLazyGetUsageReportQuery } from "../../services/Api";
import { setSubscription } from "../../features/subscription/subscriptionSlice";

export const useSubscriptionData = (shouldFetch) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [getSubscribedPlan] = useLazyGetSubscribedPlanQuery();
  const [getUsageReport] = useLazyGetUsageReportQuery();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!shouldFetch) {
        return;
      }

      setIsLoading(true);
      
      try {
        const [subscriptionResult, usageResult] = await Promise.all([
          getSubscribedPlan().unwrap(),
          getUsageReport().unwrap(),
        ]);

        const subscriptionData = {
          plan: subscriptionResult.data.subscription.plan_name,
          status: subscriptionResult.data.subscription.status,
          invoiceQuota: {
            used: usageResult.created_invoices,
            total: usageResult.total_invoices,
          },
          clientQuota: {
            used: usageResult.created_clients,
            total: usageResult.total_clients,
          },
        };

        dispatch(setSubscription(subscriptionData));
        setSubscriptionStatus(subscriptionResult.data.subscription.status);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [shouldFetch, dispatch, getSubscribedPlan, getUsageReport]);

  return { 
    isSubscriptionLoading: !shouldFetch || isLoading, 
    subscriptionStatus 
  };
};