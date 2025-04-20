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
  const [getPlans, { data, isLoading, error }] = useLazyGetSubscriptionPlansQuery();
  const [formattedPlans, setFormattedPlans] = useState([]);

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

      // Determine button text based on current subscription
      let buttonText = planType === 'trial' ? 'Start Free Trial' : `Subscribe to ${monthlyPlan.name}`;
      let buttonVariant = 'contained';
      let disabled = false;

      if (subscription && subscription.planType === planType && 
          ((isYearly && subscription.billingCycle === 'year') || (!isYearly && subscription.billingCycle === 'month'))) {
        buttonText = 'Current Plan';
        buttonVariant = 'outlined';
        disabled = true;
      } else if (subscription) {
        const currentPlanPrice = subscription.price;
        const planPrice = isYearly && yearlyPlan ? yearlyPlan.price : monthlyPlan.price;
        
        if (currentPlanPrice < planPrice) {
          buttonText = 'Upgrade Plan';
        } else if (currentPlanPrice > planPrice) {
          buttonText = `Downgrade to ${monthlyPlan.name}`;
        }
      }

      return {
        id: planType,
        apiPlanId: isYearly && yearlyPlan ? yearlyPlan.id : monthlyPlan.id,
        name: monthlyPlan.name,
        tagline: planType === 'trial' ? 'Trial' :
          planType === 'professional' ? 'Most Popular' :
            planType === 'enterprise' ? 'For large teams' : 'For small businesses',
        monthlyPrice: `₹${monthlyPlan.price || 0}`,
        yearlyPrice: yearlyPlan ? `₹${yearlyPlan.price || 0}` : `₹${monthlyPlan.price || 0}`,
        color,
        colorAccent,
        buttonText,
        buttonVariant,
        subscribed: monthlyPlan.is_subscribed,
        highlight,
        features,
        disabled
      };
    }).filter(Boolean);

    setFormattedPlans(transformedPlans);
  }, [data, isYearly, subscription]);

  const handleBillingToggle = () => {
    setIsYearly(prev => !prev);
  };

  const handleSelectPlan = (planId) => {
    const selectedPlan = formattedPlans.find(plan => plan.id === planId);
    if (selectedPlan && !selectedPlan.disabled) {
      navigate(`/checkout?planId=${selectedPlan.apiPlanId}&billingCycle=${isYearly ? 'yearly' : 'monthly'}`);
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
    </Container>
  );
};

export default PlansSection;