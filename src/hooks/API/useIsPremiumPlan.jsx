import { useEffect, useState, useMemo } from "react";
import { useGetSubscribedPlanQuery } from "../../services/Api";

/**
 * Custom hook to determine if the user has a premium subscription plan.
 * @returns {Object} An object containing:
 *   - isPremium: Boolean indicating if the user has a premium plan.
 *   - isLoading: Boolean indicating if the subscription data is loading.
 *   - error: Any error from the subscription query, if present.
 */
const useIsPremiumPlan = () => {
  const { data: subscriptionData, isLoading, error } = useGetSubscribedPlanQuery();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!subscriptionData || subscriptionData.error) {
      setIsPremium(false);
      return;
    }

    const planName = subscriptionData?.data?.subscription?.plan_name ?? "";
    const PREMIUM_PLANS = ["Professional Plan", "Enterprise Plan"];
    setIsPremium(PREMIUM_PLANS.includes(planName));
  }, [isLoading, subscriptionData]);

  return useMemo(
    () => ({ isPremium, isLoading, error }),
    [isPremium, isLoading, error]
  );
};

export default useIsPremiumPlan;