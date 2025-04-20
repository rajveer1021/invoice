import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import TopHeader from '../../shared/TopHeader';
import SideHeader from '../../internal/layout/side-header';
import useAuthentication from '../../../hooks/useAuthentication';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PLAN_THEME_COLORS as THEME_COLORS } from '../../../constant/index';
import PlansSection from '../../internal/PlansSection';
import CurrentSubscriptionCard from '../../internal/CurrentSubscriptionCard';
import SubscriptionUsage from '../../internal/SubscriptionUsage';
import { useGetSubscribedPlanQuery, useGetUsageReportQuery, useCancelSubscriptionMutation } from '../../../services/Api';
import SubscriptionExpiryNotice from '../../internal/SubscriptionExpiryNotice';
import { mapSubscriptionData, mapUsageData, getErrorMessage } from '../../../services/Utils';
import CancelSubscriptionDialog from '../../../components/internal/dialog-box/CancelSubscriptionDialog';

// Custom Hook
const useSubscriptionAndUsage = (forceRefresh) => {
  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    error: subscriptionError,
    refetch: refetchSubscription,
  } = useGetSubscribedPlanQuery(forceRefresh, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: usageData,
    isLoading: usageLoading,
    error: usageError,
    refetch: refetchUsage,
  } = useGetUsageReportQuery(forceRefresh, {
    refetchOnMountOrArgChange: true,
  });

  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    if (subscriptionLoading) return;
    setSubscription(mapSubscriptionData(subscriptionData));
  }, [subscriptionData, subscriptionLoading]);

  useEffect(() => {
    if (usageLoading || !usageData) return;
    setUsage(mapUsageData(usageData, subscription?.renewalDate));
  }, [usageData, usageLoading, subscription]);

  useEffect(() => {
    if (!subscriptionLoading && !usageLoading && !initialLoadComplete) {
      setInitialLoadComplete(true);
    }
  }, [subscriptionLoading, usageLoading, initialLoadComplete]);

  const refreshData = useCallback(() => {
    refetchSubscription();
    refetchUsage();
  }, [refetchSubscription, refetchUsage]);

  return {
    subscription,
    usage,
    subscriptionLoading,
    usageLoading,
    subscriptionError,
    usageError,
    initialLoadComplete,
    refreshData,
  };
};

// Main Component
const ManageSubscriptionPage = () => {
  useAuthentication();
  const mobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const location = useLocation();
  const locationKey = React.useRef(location.key || 'default');
  const [forceRefresh, setForceRefresh] = useState(Date.now());
  const [cancelSubscription, { isLoading: isCancelling, isSuccess, isError, error }] = useCancelSubscriptionMutation();

  // State for the confirmation dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState(null);

  const {
    subscription,
    usage,
    subscriptionLoading,
    usageLoading,
    subscriptionError,
    usageError,
    initialLoadComplete,
    refreshData,
  } = useSubscriptionAndUsage(forceRefresh);

  useEffect(() => {
    if (locationKey.current !== location.key) {
      locationKey.current = location.key;
      setForceRefresh(Date.now());
    }
  }, [location.key]);

  // Effect to refresh data after successful cancellation
  useEffect(() => {
    if (isSuccess) {
      refreshData();
    }
  }, [isSuccess, refreshData]);

  const handleChangePlan = useCallback(() => {
    document
      .getElementById('subscription-plans-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleManagePayments = useCallback(() => {
    navigate('/manage-payments');
  }, [navigate]);

  // Open confirmation dialog
  const handleOpenCancelDialog = useCallback((subscriptionId) => {
    if (!subscriptionId) {
      return;
    }
    setSubscriptionToCancel(subscriptionId);
    setDialogOpen(true);
  }, []);

  // Close dialog without action
  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSubscriptionToCancel(null);
  }, []);

  // Process with cancellation after confirmation
  const handleConfirmCancellation = useCallback(async () => {
    if (!subscriptionToCancel) {
      setDialogOpen(false);
      return;
    }
    try {
      await cancelSubscription({ id: subscriptionToCancel }).unwrap();
    } catch (err) {
    } finally {
      setDialogOpen(false);
      setSubscriptionToCancel(null);
    }
  }, [subscriptionToCancel, cancelSubscription]);

  const showLoading = !initialLoadComplete && (subscriptionLoading || usageLoading);

  return (
    <Grid container sx={{ bgcolor: THEME_COLORS.white, minHeight: '100vh' }}>
      <Grid item xs={12} sm={3} md={3} lg={2.2} xl={2}>
        {!mobile && <SideHeader />}
      </Grid>
      <Grid item xs={12} sm={9} md={9} lg={9.8} xl={10}>
        <TopHeader
          title="Plan & Billing"
          clientUrl={'/clients/add-client'}
          clientTitle={'Client'}
          InvoiceUrl={'/invoices/create-invoice'}
        />
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            bgcolor: THEME_COLORS.white,
          }}
        >
          {showLoading ? (
            <Stack spacing={2}>
              <Skeleton variant="rectangular" height={100} />
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="rectangular" height={300} />
            </Stack>
          ) : subscriptionError || usageError ? (
            <Box>
              <Typography color="error" gutterBottom>
                {getErrorMessage(subscriptionError || usageError)}
              </Typography>
              <Typography
                role="button"
                tabIndex={0}
                color="primary"
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={refreshData}
                onKeyDown={(e) => e.key === 'Enter' && refreshData()}
              >
                Click here to try again
              </Typography>
            </Box>
          ) : (
            <Stack spacing={3}>
              <Box>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Manage Subscription
                </Typography>
                <Typography variant="body2" color={THEME_COLORS.tertiary}>
                  Review and manage your Invoicean subscription and usage
                </Typography>
              </Box>

              <SubscriptionExpiryNotice />

              {subscriptionLoading && initialLoadComplete && (
                <Box py={1}>
                  <Typography color="text.secondary" display="flex" alignItems="center">
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    Refreshing plan data...
                  </Typography>
                </Box>
              )}

              {subscription ? (
                <CurrentSubscriptionCard
                  subscription={subscription}
                  onChangePlan={handleChangePlan}
                  onManagePayments={handleManagePayments}
                  onCancelSubscription={handleOpenCancelDialog}
                />
              ) : (
                <Box>
                  <Typography gutterBottom>
                    No active subscription found.
                  </Typography>
                  <Typography
                    role="button"
                    tabIndex={0}
                    color="primary"
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={handleChangePlan}
                    onKeyDown={(e) => e.key === 'Enter' && handleChangePlan()}
                  >
                    Choose a plan
                  </Typography>
                </Box>
              )}

              {usage && <SubscriptionUsage usage={usage} />}

              <div id="subscription-plans-section">
                <PlansSection subscription={subscription} />
              </div>
            </Stack>
          )}
        </Container>
      </Grid>

      <CancelSubscriptionDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmCancellation}
        isCancelling={isCancelling}
      />
    </Grid>
  );
};

export default ManageSubscriptionPage;