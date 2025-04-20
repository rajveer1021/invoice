import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FullscreenLoader from '../shared/loader/FullscreenLoader';
import { useGetSubscriptionQuery } from '../../services/Api';

const ProtectedRoute = ({ requireSubscription = true }) => {
  const location = useLocation();
  const { data, isLoading, error, isFetching, refetch } = useGetSubscriptionQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const isAuthenticated = !!JSON.parse(localStorage.getItem('userHeaderData') || 'null');
  
  useEffect(() => {
    // Refetch subscription data when component mounts or location changes
    refetch();
  }, [refetch, location.pathname]);

  // Handle loading state
  if (isLoading || isFetching) {
    return <FullscreenLoader />;
  }

  // Check authentication
  if (!isAuthenticated) {
    // Preserve the intended destination with state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle errors
  if (error) {
    if (error.status === 401 || error.status === 403) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireSubscription) {
      return <Navigate to="/error" state={{ errorType: 'subscription', from: location }} replace />;
    }
  }

  // Check subscription requirement
  if (requireSubscription && data && !data.active_subscription) {
    return <Navigate to="/subscription" state={{ from: location }} replace />;
  }

  // All checks passed - render the protected content
  return <Outlet />;
};

export default ProtectedRoute;