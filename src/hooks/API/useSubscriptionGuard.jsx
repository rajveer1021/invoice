import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSubscriptionQuery } from '../../services/Api';

const useSubscriptionGuard = (requireSubscription = true) => {
  const navigate = useNavigate();
  const { data, isLoading, error, isFetching } = useGetSubscriptionQuery();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if ((!hasCheckedRef.current || data || error) && !isLoading && !isFetching) {
      hasCheckedRef.current = true;
      
      if (data) {
        const isActive = !!data.active_subscription;
        if (requireSubscription && !isActive) {
          navigate('/subscription');
        }
      } else if (error) {
        navigate('/login');
      }
    }
    
  }, [data, error, navigate, requireSubscription, isLoading, isFetching]);

  return {
    hasActiveSubscription: !!data?.active_subscription,
    isLoading: isLoading || isFetching,
    error,
  };
};

export default useSubscriptionGuard;