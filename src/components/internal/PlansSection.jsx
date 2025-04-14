import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlanCard from './PlanCard';
import { useDispatch } from 'react-redux';
import { setSelectedPlan, setBillingCycle } from '../../features/subscription/subscriptionSlice';
import { useLazyGetSubscriptionPlansQuery } from '../../services/Api';
import { THEME_COLORS } from '../../constant/index';
import FallbackComponent from '../shared/FallbackComponent';
import FullscreenLoader from '../shared/loader/FullscreenLoader';

const BillingToggle = ({ isYearly, onChange }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 1, fontWeight: isYearly ? 400 : 600 }}>Monthly</Typography>
          <Switch
            checked={isYearly}
            onChange={onChange}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: THEME_COLORS.primary,
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: THEME_COLORS.primary,
              },
            }}
          />
          <Typography sx={{ ml: 1, fontWeight: isYearly ? 600 : 400 }}>
            Yearly
            <Box component="span" sx={{
              ml: 1,
              py: 0.5,
              px: 1,
              bgcolor: THEME_COLORS.green,
              color: 'white',
              borderRadius: 1,
              fontSize: '0.75rem',
              display: 'inline-block'
            }}>
              Save 20%
            </Box>
          </Typography>
        </Box>
      }
      label=""
    />
  </FormGroup>
);

const PlansSection = ({ subscription }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getPlans, { data, isLoading, error }] = useLazyGetSubscriptionPlansQuery();
  const [formattedPlans, setFormattedPlans] = useState([]);

  const PLAN_ORDER = ['trial', 'basic', 'professional', 'enterprise'];

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  useEffect(() => {
    if (!data || !Array.isArray(data.data)) return;

    const plans = data.data;
    const uniquePlanTypes = [...new Set(plans.map(plan => plan.plan_type))];

    const transformedPlans = uniquePlanTypes.map(planType => {
      const monthlyPlan = plans.find(plan => plan.plan_type === planType && plan.interval === 'month');
      const yearlyPlan = plans.find(plan => plan.plan_type === planType && plan.interval === 'year');

      if (!monthlyPlan) return null;

      let color = THEME_COLORS.primary;
      let colorAccent = THEME_COLORS.primaryLight;
      if (planType === 'trial') {
        color = THEME_COLORS.secondary;
        colorAccent = THEME_COLORS.secondaryLight;
      }

      const highlight = planType === 'professional';

      const features = [];
      const invoiceItem = monthlyPlan.plan_items?.find(item => item.name === 'invoice');
      if (invoiceItem) {
        features.push(invoiceItem.is_unlimited ? 'Unlimited Invoices' : `${invoiceItem.quantity} Invoices`);
      }

      const clientItem = monthlyPlan.plan_items?.find(item => item.name === 'client');
      if (clientItem) {
        features.push(clientItem.is_unlimited ? 'Unlimited Clients' : `${clientItem.quantity} Clients`);
      }

      if (monthlyPlan.invoice_duplicable) {
        features.push('Recurring Invoices');
      }

      if (monthlyPlan.multi_currency_support) {
        features.push('Multiple Currency Support');
      }

      let buttonText = planType === 'trial' ? 'Start Free Trial' : `Subscribe to ${monthlyPlan.name}`;
      let disabled = false;

      if (subscription) {
        const isCurrentType = planType === subscription.planType;
        const isCurrentInterval = (isYearly && subscription.billingCycle === 'year') ||
                                 (!isYearly && subscription.billingCycle === 'month');

        if (isCurrentType && isCurrentInterval) {
          buttonText = 'Current Plan';
          disabled = true;
        } else if (isCurrentType && !isCurrentInterval) {
          buttonText = isYearly ? 'Switch to Yearly Billing' : 'Switch to Monthly Billing';
        } else {
          const currentIndex = PLAN_ORDER.indexOf(subscription.planType);
          const planIndex = PLAN_ORDER.indexOf(planType);
          if (currentIndex !== -1 && planIndex !== -1) {
            if (planIndex > currentIndex) {
              buttonText = `Upgrade to ${monthlyPlan.name}`;
            } else if (planIndex < currentIndex) {
              buttonText = `Downgrade to ${monthlyPlan.name}`;
            }
          }
        }
      }

      return {
        id: planType,
        name: monthlyPlan.name,
        tagline: planType === 'trial' ? 'Trial' :
          planType === 'professional' ? 'Most Popular' :
            planType === 'enterprise' ? 'For large teams' : 'For small businesses',
        monthlyPrice: `₹${monthlyPlan.price || 0}`,
        yearlyPrice: yearlyPlan ? `₹${yearlyPlan.price || 0}` : `₹${monthlyPlan.price || 0}`,
        color,
        colorAccent,
        buttonText,
        buttonVariant: 'contained',
        subscribed: monthlyPlan.is_subscribed,
        highlight,
        features,
        disabled 
      };
    }).filter(Boolean);

    setFormattedPlans(transformedPlans);
  }, [data, subscription, isYearly]);

  const handleBillingToggle = () => {
    setIsYearly(prev => !prev);
  };

  const handleSelectPlan = (planId) => {
    const selectedPlan = formattedPlans.find(plan => plan.id === planId);

    if (selectedPlan && data?.data) {
      const apiPlan = data.data.find(p =>
        p.plan_type === planId &&
        p.interval === (isYearly ? 'year' : 'month')
      );

      dispatch(setSelectedPlan({
        ...selectedPlan,
        apiPlanId: apiPlan?.id,
        price: apiPlan?.price,
        interval: apiPlan?.interval
      }));
      dispatch(setBillingCycle(isYearly ? 'yearly' : 'monthly'));
      navigate("/checkout");
    }
  };

  if (error) {
    return <FallbackComponent />;
  }
  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: 30,
            fontWeight: 600,
            color: 'black',
            mb: { xs: 2, sm: 0 }
          }}
        >
          Subscription Plans
        </Typography>
        <BillingToggle isYearly={isYearly} onChange={handleBillingToggle} />
      </Box>

      {isLoading ? (
        <Typography align="center">Loading plans...</Typography>
      ) : error ? (
        <Typography align="center" color="error">
          Failed to load plans. Please try again later.
        </Typography>
      ) : !data?.data || formattedPlans.length === 0 ? (
        <Typography align="center">No plans available at this time.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" marginTop={5}>
          {formattedPlans.map((plan) => (
            <Grid item xs={12} sm={6} lg={3} key={plan.id}>
              <PlanCard
                plan={plan}
                isYearly={isYearly}
                isMobile={isMobile}
                onSelect={handleSelectPlan}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PlansSection;