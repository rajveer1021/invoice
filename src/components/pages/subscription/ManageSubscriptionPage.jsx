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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
import { useLazyGetSubscribedPlanQuery } from '../../../services/Api';

const ManageSubscriptionPage = () => {
  useAuthentication();
  const mobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getSubscribedPlan, { data, isLoading, error }] = useLazyGetSubscribedPlanQuery();
  const [subscription, setSubscription] = useState(null);  

  const [usage] = useState({
    invoices: { used: 100, total: 2000 },
    clients: { used: 1, total: 3 },
    nextRenewal: 'May 08, 2025',
  });

  useEffect(() => {
    getSubscribedPlan();
  }, [getSubscribedPlan]);

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
        planType :
          subData.plan_name === "Trial" ? "trial" :
            subData.plan_name === "Basic Plan" ? "basic" :
              subData.plan_name === "Professional Plan" ? "professional" :
                subData.plan_name === "Enterprise Plan" ? "enterprise" :
                  "unknown",
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
          {isLoading ? (
            <Typography>Loading subscription...</Typography>
          ) : error ? (
            <Typography color="error">
              Failed to load subscription: {error?.data?.message || 'Please try again.'}
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
              {subscription.expiresInDays <= 7 && subscription.status === 'Active' && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor: THEME_COLORS.warningLight,
                    border: `1px solid ${THEME_COLORS.warning}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ color: THEME_COLORS.warning, mr: 1.5 }} />
                    <Typography variant="body2" fontWeight={500} color={THEME_COLORS.darkGray}>
                      Your plan will expire in {subscription.expiresInDays} day
                      {subscription.expiresInDays !== 1 ? 's' : ''}. Renew now to continue using all features.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleRenewPlan}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 1.5,
                      bgcolor: THEME_COLORS.warning,
                      '&:hover': {
                        bgcolor: THEME_COLORS.warning,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Renew Plan
                  </Button>
                </Paper>
              )}

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