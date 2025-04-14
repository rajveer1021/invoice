import React from 'react';
import { Navigate } from 'react-router-dom';
import useSubscriptionGuard from '../../hooks/API/useSubscriptionGuard'; // Adjust path as needed
import FullscreenLoader from '../shared/loader/FullscreenLoader';

const ProtectedRoute = ({ requireSubscription = true, children }) => {
  const { hasActiveSubscription, isLoading } = useSubscriptionGuard(requireSubscription);
  const isAuthenticated = localStorage.getItem('userHeaderData') !== null;

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireSubscription && !hasActiveSubscription) {
    return <Navigate to="/subscription" />;
  }

  return children;
};

export default ProtectedRoute;