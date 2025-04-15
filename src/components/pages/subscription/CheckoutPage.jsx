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
import { useNavigate } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentStatus, setPaymentId } from '../../../features/subscription/subscriptionSlice';
import Header from '../../internal/layout/Header';
import PaymentButton from '../../internal/PaymentButton';
import PaymentSuccessDialog from '../../internal/dialog-box/PaymentSuccessDialog';
import { useLazyGetUserCompleteDataQuery, useCreateSubscriptionMutation, useUpdateUserDataMutation } from '../../../services/Api';
import FullscreenLoader from '../../shared/loader/FullscreenLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '../../../hooks/useToast';
import { useSubscriptionData } from '../../../hooks/API/useSubscriptionData';

const CheckoutPage = () => {
  const auth = useSubscriptionData();
  console.log("subs data", auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [subscriptionRazorpayId, setSubscriptionRazorpayId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [addressAdded, setAddressAdded] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addressError, setAddressError] = useState('');
  const toastShownRef = useRef(false); // Track if toast has been shown

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPlan, billingCycle } = useSelector(state => state.subscription);
  const { showSuccessToast, showErrorToast } = useToast(); // Use the toast hook

  useEffect(() => {
    if (!selectedPlan) {
      navigate('/subscription-plans');
    }
  }, [selectedPlan, navigate]);

  const [getUserData, { data, isLoading, error }] = useLazyGetUserCompleteDataQuery();
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

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    if (data?.data?.user) {
      const user = data.data.user;
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
    }
    // Reset toast flag when user data changes
    toastShownRef.current = false;
  }, [data]);

  const handleAddressChange = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
    setAddressError('');
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
      const user = data?.data?.user || {};
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
      setAddressError('');

      // Show toast only if it hasn't been shown
      if (!toastShownRef.current) {
        const toastMessage = data?.data?.user?.address ? 'Billing address updated successfully' : 'Billing address added successfully';
        showSuccessToast(toastMessage);
        toastShownRef.current = true;
      }

      // Refetch user data
      await getUserData();
    } catch (err) {
      console.error('Failed to update billing address:', err);
      showErrorToast('Failed to update billing address. Please try again.'); // Use hook's error toast
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

    if (selectedPlan.id === 'free') {
      const freePaymentId = 'free_plan_' + Date.now();
      dispatch(setPaymentId(freePaymentId));
      dispatch(setPaymentStatus('success'));
      setOpenSuccessDialog(true);
      setIsProcessing(false);
    } else {
      try {
        const subscriptionResponse = await createSubscription({ plan_id: selectedPlan?.apiPlanId }).unwrap();
        const newSubscriptionId = subscriptionResponse?.data?.subscription?.razorpay_subscription;
        const subscription_id = subscriptionResponse?.data?.subscription?.id;

        if (!newSubscriptionId) {
          throw new Error('Subscription ID not received');
        }
        setSubscriptionRazorpayId(newSubscriptionId);
        setSubscriptionId(subscription_id);
        dispatch(setPaymentStatus('pending'));
        setShowRazorpay(true);
      } catch (err) {
        console.error('Subscription creation failed:', err);
        showErrorToast('Failed to create subscription. Please try again.');
        dispatch(setPaymentStatus('failed'));
        setIsProcessing(false);
      }
    }
  };

  const handleSuccessDialogClose = () => {
    setOpenSuccessDialog(false);
    setSubscriptionId('');
    setSubscriptionRazorpayId('');
  };

  const getAmountInPaise = () => {
    if (!selectedPlan || !selectedPlan.yearlyPrice || !selectedPlan.monthlyPrice) return 0;
    const price = billingCycle === 'yearly'
      ? parseFloat(selectedPlan.yearlyPrice.replace(/[^0-9.]/g, '') || '0')
      : parseFloat(selectedPlan.monthlyPrice.replace(/[^0-9.]/g, '') || '0');
    return Math.round(price * 100);
  };

  const baseAmount = selectedPlan && selectedPlan[billingCycle === 'yearly' ? 'yearlyPrice' : 'monthlyPrice']
    ? parseFloat((billingCycle === 'yearly'
      ? selectedPlan.yearlyPrice
      : selectedPlan.monthlyPrice).replace(/[^0-9.]/g, '') || '0')
    : 0;
  const adjustedBaseAmount = billingCycle === 'yearly' ? baseAmount : baseAmount;
  const totalAmount = adjustedBaseAmount;

  const primaryColor = selectedPlan?.color || theme.palette.primary.main;
  const buttonBgColor = selectedPlan?.id === 'free' ? primaryColor : '#3366FF';

  const commonStyles = {
    sectionTitle: { variant: "subtitle1", fontWeight: 600, color: "text.secondary", mb: 2 },
    paper: { p: { xs: 2, md: 3 }, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
  };

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <Container maxWidth="xl" sx={{ mt: { xs: 8, md: 10 }, mb: 5 }}>
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <Typography variant="h4" sx={{ mb: { xs: 2, sm: 0, md: 3 }, fontSize: 30, fontWeight: 600, color: 'black' }}>
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
                          {billingCycle === 'yearly' ? selectedPlan?.yearlyPrice : `₹ ${baseAmount} per month`}
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
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <>
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
                        {addressError && (
                          <Typography color="error" sx={{ mt: 2 }}>
                            {addressError}
                          </Typography>
                        )}
                      </>
                    )}
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
                      '&:hover': { backgroundColor: selectedPlan?.id === 'free' ? '#115293' : '#2952CC' },
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    {isProcessing || subscriptionLoading ? 'Processing...' : (selectedPlan?.buttonText || 'Proceed to Checkout')}
                  </Button>
                )}

                {selectedPlan?.id !== 'free' && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                    <InfoIcon fontSize="small" color="action" sx={{ mr: 1, mt: 0.2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Your payment is secure and encrypted. By proceeding, you agree to our terms and conditions.
                    </Typography>
                  </Box>
                )}

                {selectedPlan?.id !== 'free' && (
                  <PaymentButton
                    billingAddress={billingAddress}
                    razorpay_subscription_id={subscriptionRazorpayId}
                    subscription_id={subscriptionId}
                    amount={getAmountInPaise()}
                    triggerPayment={showRazorpay}
                    onSuccess={(paymentId) => {
                      setOpenSuccessDialog(true);
                      dispatch(setPaymentId(paymentId));
                      dispatch(setPaymentStatus('success'));
                      setShowRazorpay(false);
                      setIsProcessing(false);
                      setSubscriptionRazorpayId('');
                      setSubscriptionId('');
                    }}
                    onFailure={() => {
                      dispatch(setPaymentStatus('failed'));
                      setShowRazorpay(false);
                      setIsProcessing(false);
                      setSubscriptionRazorpayId('');
                      setSubscriptionId('');
                    }}
                    userName={`${data?.data?.user?.first_name || ''} ${data?.data?.user?.last_name || ''}`.trim()}
                    userEmail={data?.data?.user?.email || ''}
                    userContact={data?.data?.user?.phone_no || ''}
                  />
                )}
                <PaymentSuccessDialog open={openSuccessDialog} onClose={handleSuccessDialogClose} />
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
                      {selectedPlan?.name || 'Premium Plan'}
                    </Typography>
                    <MuiLink component={RouterLink} to="/subscription-plans" sx={{ color: 'text.secondary', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>
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
                  <Typography variant="h6" fontWeight={600} color="primary.main">₹{totalAmount || '260'}</Typography>
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
                      '&:hover': { backgroundColor: selectedPlan?.id === 'free' ? '#115293' : '#2952CC' },
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    {isProcessing || subscriptionLoading ? 'Processing...' : 'Proceed to Checkout'}
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