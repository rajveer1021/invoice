import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { PLAN_THEME_COLORS as THEME_COLORS } from '../../constant/index';

const CurrentSubscriptionCard = ({
  subscription,
  onChangePlan,
  onManagePayments,
  onCancelSubscription,
}) => {
  const handleCancelClick = () => {
    if (subscription && subscription.subscriptionId) {
      onCancelSubscription(subscription.subscriptionId);
    } else {
      console.error("Cannot cancel subscription: Invalid or missing subscription ID");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        mb: 4,
        border: `1px solid ${THEME_COLORS.border}`,
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight={600} color={THEME_COLORS.text}>
              Current Plan
            </Typography>
            <Typography variant="body2" color={THEME_COLORS.tertiary}>
              Your subscription details and payment information
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={onChangePlan}
              sx={{
                textTransform: 'none',
                borderRadius: 1.5,
                borderColor: THEME_COLORS.border,
                color: THEME_COLORS.text,
                '&:hover': {
                  borderColor: THEME_COLORS.tertiary,
                  bgcolor: 'transparent',
                },
              }}
            >
              Change plan
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={onManagePayments}
              sx={{
                textTransform: 'none',
                borderRadius: 1.5,
                bgcolor: THEME_COLORS.blue,
                '&:hover': {
                  bgcolor: THEME_COLORS.blue,
                  opacity: 0.9,
                },
              }}
              endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
            >
              Manage payments
            </Button>
          </Box>
        </Box>

        {/* Plan and Payment Details */}
        <Grid container spacing={3}>
          {/* Plan Details */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: THEME_COLORS.blueLight,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: { xs: 2, md: 0 },
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip
                    label={subscription.name}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      bgcolor: THEME_COLORS.blue,
                      color: 'white',
                      height: 24,
                      mr: 1,
                    }}
                  />
                  <Chip
                    label={subscription.status}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      bgcolor: THEME_COLORS.secondaryLight,
                      color: THEME_COLORS.secondary,
                      height: 24,
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Typography variant="h5" fontWeight={700} color={THEME_COLORS.text}>
                  ₹{subscription.price}
                  <Typography component="span" variant="body2" color={THEME_COLORS.tertiary}>
                    /{subscription.billingCycle === 'yearly' ? 'year' : 'month'}
                  </Typography>
                </Typography>
                <Typography variant="body2" color={THEME_COLORS.tertiary}>
                  Billed {subscription.billingCycle === 'month' ? 'Montly' : 'Yearly'}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color={THEME_COLORS.tertiary}>
                  Renews on
                </Typography>
                <Typography variant="body1" fontWeight={500} color={THEME_COLORS.text}>
                  {subscription.renewalDate}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Payment Method */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: THEME_COLORS.lightGray,
                height: '100%',
              }}
            >
              <Typography variant="body2" color={THEME_COLORS.tertiary} mb={2}>
                Payment Method
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    px: 1.5, 
                    height: 28,
                    bgcolor: '#1A1F71',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Typography variant="caption" fontWeight={600} color="white">
                    {subscription.paymentMethod.type}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={500} color={THEME_COLORS.text}>
                    •••• •••• •••• {subscription.paymentMethod.lastFour}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer Actions */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleCancelClick} // Use our new handler
            sx={{
              textTransform: 'none',
              borderRadius: 1.5,
              borderColor: THEME_COLORS.danger,
              color: THEME_COLORS.danger,
              '&:hover': {
                borderColor: THEME_COLORS.danger,
                bgcolor: 'rgba(239, 68, 68, 0.04)',
              },
            }}
          >
            Cancel Subscription
          </Button>

          <Typography variant="body2" color={THEME_COLORS.tertiary}>
            Next billing amount:{' '}
            <Typography component="span" fontWeight={600} color={THEME_COLORS.text}>
              ₹{subscription.nextBillingAmount}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CurrentSubscriptionCard;