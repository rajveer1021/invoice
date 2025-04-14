import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetSubscriptionQuery } from '../../services/Api';

const useSubscriptionGuard = (requireSubscription = true) => {
  const navigate = useNavigate();
  const [checkSubscription, { data, isLoading }] = useLazyGetSubscriptionQuery();

  useEffect(() => {
    const validateSubscription = async () => {
      try {
        const result = await checkSubscription().unwrap();
        const hasActiveSubscription = result?.active_subscription;
        
        if (requireSubscription && !hasActiveSubscription) {
          navigate('/subscription');
        }
      } catch (error) {
        console.error('Subscription validation failed:', error);
        navigate('/login');
      }
    };

    validateSubscription();
  }, [checkSubscription, navigate, requireSubscription]);

  return { hasActiveSubscription: data?.active_subscription, isLoading };
};

export default useSubscriptionGuard 