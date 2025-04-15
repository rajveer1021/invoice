import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedPlan, setBillingCycle } from '../../../features/subscription/subscriptionSlice';
import TopHeader from '../../shared/TopHeader';
import SideHeader from '../../internal/layout/side-header';
import useAuthentication from '../../../hooks/useAuthentication';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PLAN_THEME_COLORS as THEME_COLORS } from '../../../constant/index';
import PlansSection from '../../internal/PlansSection';
import CurrentSubscriptionCard from '../../internal/CurrentSubscriptionCard';
import SubscriptionUsage from '../../internal/SubscriptionUsage';
import { useLazyGetSubscribedPlanQuery, useLazyGetUsageReportQuery } from '../../../services/Api';
import SubscriptionExpiryNotice from '../../internal/SubscriptionExpiryNotice';

const ManageSubscriptionPage = () => {
  useAuthentication();
  const mobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getSubscribedPlan, { data, isLoading, error }] = useLazyGetSubscribedPlanQuery();
  const [getUsageReport, { data: usageData, isLoading: usageLoading, error: usageError }] = useLazyGetUsageReportQuery();
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    getSubscribedPlan();
    getUsageReport();
  }, [getSubscribedPlan, getUsageReport]);

  useEffect(() => {
    if (data?.status === 'success' && data?.data?.subscription) {
      const subData = data.data.subscription;

      const currentPeriodEnd = new Date(subData.current_period_end);
      const now = new Date();
      const timeDiff = currentPeriodEnd - now;
      const expiresInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      setSubscription({
        planId: subData.razorpay_subscription,
        name: subData.plan_name,
        planType:
          subData.plan_name === 'Trial' ? 'trial' :
            subData.plan_name === 'Basic Plan' ? 'basic' :
              subData.plan_name === 'Professional Plan' ? 'professional' :
                subData.plan_name === 'Enterprise Plan' ? 'enterprise' :
                  'unknown',
        status: subData.status.charAt(0).toUpperCase() + subData.status.slice(1),
        billingCycle: subData.interval,
        price: parseFloat(subData.price),
        renewalDate: new Date(subData.next_cycle_at).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        }),
        paymentMethod: {
          type: subData.card_brand || 'Unknown',
          lastFour: subData.card_last_digit || '****',
          expiry: 'N/A',
        },
        nextBillingAmount: subData.interval === 'month' ? parseFloat(subData.price) : parseFloat(subData.price) * 12,
        expiresInDays: expiresInDays > 0 ? expiresInDays : 0,
      });
    }
  }, [data]);

  useEffect(() => {
    if (usageData) {
      setUsage({
        invoices: { used: usageData.created_invoices, total: usageData.total_invoices },
        clients: { used: usageData.created_clients, total: usageData.total_clients },
        nextRenewal: subscription?.renewalDate || 'May 08, 2025',
      });
    }
  }, [usageData, subscription]);

  const handleChangePlan = () => {
    document.getElementById('subscription-plans-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleManagePayments = () => {
    navigate('/manage-payments');
  };

  const handleCancelSubscription = () => {
    // Note: This should ideally call an API to cancel the subscription
    setSubscription((prev) => ({ ...prev, status: 'Cancelled' }));
  };

  const handleRenewPlan = () => {
    if (subscription) {
      dispatch(
        setSelectedPlan({
          planId: subscription.planId,
          name: subscription.name,
          price: subscription.price,
          interval: subscription.billingCycle,
        })
      );
      dispatch(setBillingCycle(subscription.billingCycle));
      navigate('/checkout');
    }
  };

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
          {isLoading || usageLoading ? (
            <Typography>Loading subscription...</Typography>
          ) : error || usageError ? (
            <Typography color="error">
              Failed to load data: {error?.data?.message || usageError?.data?.message || 'Please try again.'}
            </Typography>
          ) : !subscription ? (
            <Typography>No active subscription found.</Typography>
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

              {/* Subscription Expiry Notice */}
                <SubscriptionExpiryNotice/>

              {/* Current Subscription */}
              <CurrentSubscriptionCard
                subscription={subscription}
                onChangePlan={handleChangePlan}
                onManagePayments={handleManagePayments}
                onCancelSubscription={handleCancelSubscription}
              />

              {/* Usage Statistics */}
              <SubscriptionUsage usage={usage} />

              {/* Available Plans */}
              <div id="subscription-plans-section">
                <PlansSection subscription={subscription} />
              </div>
            </Stack>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default ManageSubscriptionPage;