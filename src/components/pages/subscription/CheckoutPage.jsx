import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Container,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Info as InfoIcon,
  Edit as EditIcon,
  ReceiptLong
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Header from '../../internal/layout/Header';
import PaymentButton from '../../internal/PaymentButton';
import PaymentSuccessDialog from '../../internal/dialog-box/PaymentSuccessDialog';
import {
  useLazyGetUserCompleteDataQuery,
  useCreateSubscriptionMutation,
  useUpdateUserDataMutation,
  useLazyGetPlanDetailsQuery
} from '../../../services/Api';
import FullscreenLoader from '../../shared/loader/FullscreenLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '../../../hooks/useToast';

const CheckoutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('planId');
  const billingCycle = searchParams.get('billingCycle');

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [subscriptionRazorpayId, setSubscriptionRazorpayId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [addressAdded, setAddressAdded] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const toastShownRef = useRef(false);

  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();

  const [getPlanDetails, { data: planData, isLoading: planLoading, error: planError }] = useLazyGetPlanDetailsQuery();
  const [getUserData, { data: userData, isLoading: userLoading, error: userError }] = useLazyGetUserCompleteDataQuery();
  const [createSubscription, { isLoading: subscriptionLoading, error: subscriptionError }] = useCreateSubscriptionMutation();
  const [updateUserData, { isLoading: updateLoading, error: updateError }] = useUpdateUserDataMutation();

  const [billingAddress, setBillingAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postCode: '',
    country: '',
  });

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (!planId || !billingCycle || !['monthly', 'yearly'].includes(billingCycle)) {
      navigate('/manage-subscription');
    } else {
      getPlanDetails({ plan_id: planId });
      getUserData();
    }
  }, [planId, billingCycle, navigate, getPlanDetails, getUserData]);

  useEffect(() => {
    if (planData?.data?.plan) {
      const plan = planData.data.plan;
      const priceField = plan.interval === 'year' ? 'yearlyPrice' : 'monthlyPrice';
      setSelectedPlan({
        id: plan.plan_type,
        apiPlanId: plan.id,
        name: plan.name,
        [priceField]: `₹${plan.price || 0}`,
        color: plan.plan_type === 'trial' ? '#FF9800' : '#1976D2',
        buttonText: plan.plan_type === 'trial' ? 'Start Free Trial' : `Subscribe to ${plan.name}`,
        features: [
          ...plan.plan_items.map(item =>
            item.is_unlimited ? `Unlimited ${item.name}s` : `${item.quantity} ${item.name}s`
          ),
          ...(plan.invoice_duplicable ? ['Recurring Invoices'] : []),
          ...(plan.multi_currency_support ? ['Multiple Currency Support'] : []),
        ],
      });
    }
  }, [planData]);

  useEffect(() => {
    if (userData?.data?.user) {
      const user = userData.data.user;
      setBillingAddress({
        addressLine1: user.address || '',
        addressLine2: user.address_1 || '',
        city: user.city || '',
        state: user.state || '',
        postCode: user.postal_code || '',
        country: user.country || '',
      });

      if (user.address && user.city && user.state && user.postal_code && user.country) {
        setAddressAdded(true);
      } else {
        setAddressAdded(false);
      }
      toastShownRef.current = false;
    }
  }, [userData]);

  const handleAddressChange = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    const { addressLine1, city, state, postCode, country } = billingAddress;
    if (!addressLine1 || !city || !state || !postCode || !country) {
      showErrorToast('Please fill in all required address fields');
      return false;
    }
    return true;
  };

  const addBillingAddress = async () => {
    if (!validateAddress()) {
      return;
    }

    if (isProcessing || updateLoading) {
      return;
    }

    setIsProcessing(true);
    try {
      const user = userData?.data?.user || {};
      const values = {
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        company_name: user.company_name || '',
        website_url: user.website_url || '',
        phone_no: user.phone_no || '',
        company_email_address: user.company_email_address || '',
        address: billingAddress.addressLine1,
        address_1: billingAddress.addressLine2,
        city: billingAddress.city,
        state: billingAddress.state,
        country: billingAddress.country,
        postal_code: billingAddress.postCode,
        customFields: [],
      };

      await updateUserData({ values, userLogo: null }).unwrap();
      setAddressAdded(true);

      if (!toastShownRef.current) {
        const toastMessage = userData?.data?.user?.address ? 'Billing address updated successfully' : 'Billing address added successfully';
        showSuccessToast(toastMessage);
        toastShownRef.current = true;
      }

      await getUserData();
    } catch (err) {
      console.error('Failed to update billing address:', err);
      showErrorToast('Failed to update billing address. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const proceedToPayment = async () => {
    if (!addressAdded) {
      showErrorToast('Please add your billing address first');
      return;
    }
    setIsProcessing(true);
  
    let newSubscriptionId = null;
    let subscription_id = null;
  
    try {
      const subscriptionResponse = await createSubscription({ plan_id: selectedPlan?.apiPlanId }).unwrap();
      const subscription = subscriptionResponse?.data?.subscription;
      newSubscriptionId = subscription?.razorpay_subscription;
      subscription_id = subscription?.id;
  
      if (selectedPlan?.id === 'trial') {
        setOpenSuccessDialog(true);
        setIsProcessing(false);
        return;
      }
  
      if (!newSubscriptionId) {
        throw new Error('Subscription ID not received');
      }
  
      setSubscriptionRazorpayId(newSubscriptionId);
      setSubscriptionId(subscription_id);
      setShowRazorpay(true);
    } catch (err) {
      showErrorToast('Failed to create subscription. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleSuccessDialogClose = () => {
    setOpenSuccessDialog(false);
    setSubscriptionId('');
    setSubscriptionRazorpayId('');
    setPaymentId('');
  };

  const getAmountInPaise = () => {
    if (!selectedPlan) return 0;
    const priceField = billingCycle === 'yearly' ? 'yearlyPrice' : 'monthlyPrice';
    const price = parseFloat(selectedPlan[priceField]?.replace(/[^0-9.]/g, '') || '0');
    return Math.round(price * 100);
  };

  const totalAmount = selectedPlan
    ? parseFloat((billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice)?.replace(/[^0-9.]/g, '') || '0')
    : 0;

  const primaryColor = selectedPlan?.color || theme.palette.primary.main;
  const buttonBgColor = selectedPlan?.id === 'trial' ? primaryColor : '#3366FF';

  const commonStyles = {
    sectionTitle: { variant: "subtitle1", fontWeight: 600, color: "text.secondary", mb: 2 },
    paper: { p: { xs: 2, md: 3 }, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
  };

  if (planLoading || userLoading) {
    return <FullscreenLoader />;
  }

  if (planError) {
    return <Typography align="center" color="error">Failed to load plan details.</Typography>;
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <Container maxWidth="xl" sx={{ mt: { xs: 8, md: 10 }, mb: 5 }}>
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 }, fontSize: 30, fontWeight: 600, color: 'black' }}>
            Complete Your Subscription
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={commonStyles.paper}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                  Your Subscription to {selectedPlan?.name || 'Selected Plan'}
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography sx={commonStyles.sectionTitle}>
                    1. YOUR BILLING CYCLE
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: 'divider', backgroundColor: '#FAFAFA' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 24, height: 24, bgcolor: primaryColor, borderRadius: '50%', mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ width: 10, height: 10, bgcolor: 'white', borderRadius: '50%' }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                          {billingCycle === 'yearly' ? 'Annual Billing' : 'Monthly Billing'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedPlan ? (billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice) : 'N/A'}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography sx={commonStyles.sectionTitle}>
                    2. ADD BILLING ADDRESS
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: 'divider', backgroundColor: addressAdded ? '#F8F9FA' : 'white' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address Line 1"
                          name="addressLine1"
                          value={billingAddress.addressLine1}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          InputLabelProps={{ shrink: true }}
                          disabled={addressAdded || updateLoading}
                          sx={{ mb: 1 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address Line 2 (Optional)"
                          name="addressLine2"
                          value={billingAddress.addressLine2}
                          onChange={handleAddressChange}
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                          disabled={addressAdded || updateLoading}
                          sx={{ mb: 1 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Town or City"
                          name="city"
                          value={billingAddress.city}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          InputLabelProps={{ shrink: true }}
                          disabled={addressAdded || updateLoading}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="State"
                          name="state"
                          value={billingAddress.state}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          InputLabelProps={{ shrink: true }}
                          disabled={addressAdded || updateLoading}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Post Code"
                          name="postCode"
                          value={billingAddress.postCode}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          InputLabelProps={{ shrink: true }}
                          disabled={addressAdded || updateLoading}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Country"
                          name="country"
                          value={billingAddress.country}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          InputLabelProps={{ shrink: true }}
                          disabled={addressAdded || updateLoading}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: 'right', mt: 1 }}>
                        {!addressAdded ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={addBillingAddress}
                            disabled={isProcessing || updateLoading}
                            startIcon={isProcessing || updateLoading ? <CircularProgress size={20} /> : null}
                            sx={{ px: 3, py: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                          >
                            {isProcessing || updateLoading ? 'Saving...' : 'Add Billing Address'}
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => setAddressAdded(false)}
                            disabled={isProcessing || updateLoading}
                            sx={{ px: 3, py: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                          >
                            Edit Address
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>

                {!isMobile && (
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={proceedToPayment}
                    disabled={isProcessing || !addressAdded || subscriptionLoading || updateLoading}
                    startIcon={isProcessing || subscriptionLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    sx={{
                      mt: 2,
                      mb: 1,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: buttonBgColor,
                      '&:hover': { backgroundColor: selectedPlan?.id === 'trial' ? '#115293' : '#2952CC' },
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    {isProcessing || subscriptionLoading ? 'Processing...' : (selectedPlan?.buttonText || 'Proceed to Checkout')}
                  </Button>
                )}

                {selectedPlan?.id !== 'trial' && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                    <InfoIcon fontSize="small" color="action" sx={{ mr: 1, mt: 0.2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Your payment is secure and encrypted. By proceeding, you agree to our terms and conditions.
                    </Typography>
                  </Box>
                )}

                {selectedPlan?.id !== 'trial' && (
                  <PaymentButton
                    billingAddress={billingAddress}
                    razorpay_subscription_id={subscriptionRazorpayId}
                    subscription_id={subscriptionId}
                    amount={getAmountInPaise()}
                    triggerPayment={showRazorpay}
                    onSuccess={(newPaymentId) => {
                      setOpenSuccessDialog(true);
                      setPaymentId(newPaymentId);
                      setShowRazorpay(false);
                      setIsProcessing(false);
                      setSubscriptionRazorpayId('');
                      setSubscriptionId('');
                    }}
                    onFailure={() => {
                      showErrorToast('Payment failed. Please try again.');
                      setShowRazorpay(false);
                      setIsProcessing(false);
                      setSubscriptionRazorpayId('');
                      setSubscriptionId('');
                    }}
                    userName={`${userData?.data?.user?.first_name || ''} ${userData?.data?.user?.last_name || ''}`.trim()}
                    userEmail={userData?.data?.user?.email || ''}
                    userContact={userData?.data?.user?.phone_no || ''}
                  />
                )}
                <PaymentSuccessDialog
                  open={openSuccessDialog}
                  onClose={handleSuccessDialogClose}
                  selectedPlan={selectedPlan}
                  paymentId={paymentId}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={commonStyles.paper}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F5F5', p: 2.5, borderRadius: 2, mb: 3 }}>
                  <Box sx={{ p: 1.5, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#ffffff', border: '1px solid #e0e0e0', mr: 2 }}>
                    <ReceiptLong sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
                      {selectedPlan?.name || 'Selected Plan'}
                    </Typography>
                    <MuiLink component={RouterLink} to="/subscription-plans" sx={{ color: 'text.secondary', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      Change Plan
                    </MuiLink>
                  </Box>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                    <Typography color="text.secondary">Plan Duration</Typography>
                    <Typography fontWeight={600}>{billingCycle === 'yearly' ? '1 year' : '1 month'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                    <Typography color="text.secondary">Handling Fee</Typography>
                    <Typography fontWeight={600}>₹0</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>Total Amount</Typography>
                  <Typography variant="h6" fontWeight={600} color="primary.main">₹{totalAmount || '0'}</Typography>
                </Box>

                {isMobile && (
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={proceedToPayment}
                    disabled={isProcessing || !addressAdded || subscriptionLoading || updateLoading}
                    startIcon={isProcessing || subscriptionLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    sx={{
                      mt: 2,
                      mb: 1,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: buttonBgColor,
                      '&:hover': { backgroundColor: selectedPlan?.id === 'trial' ? '#115293' : '#2952CC' },
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    {isProcessing || subscriptionLoading ? 'Processing...' : (selectedPlan?.buttonText || 'Proceed to Checkout')}
                  </Button>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F7FF', p: 2, borderRadius: 2, mt: isMobile ? 0 : 2 }}>
                  <InfoIcon color="primary" sx={{ mr: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    Your subscription will be processed securely. You can cancel anytime from your account settings.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CheckoutPage;