import { useEffect, useState } from 'react';
import { useUpdateSubscriptionMutation } from '../../services/Api';
import { Box, CircularProgress, Typography } from '@mui/material';

const PaymentButton = ({
  billingAddress,
  subscription_id = '',
  razorpay_subscription_id = '',
  triggerPayment,
  onSuccess,
  onFailure,
  userName,
  userEmail,
  userContact,
  companyName = 'Invoicean',
  description = 'Subscription plans',
  logoUrl = 'https://github.com/rajveermehta-clecotech/sample-images/blob/main/logo-square-dark.png',
}) => {
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  let paymentObjectRef = null;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!subscription_id) {
      console.error('Subscription ID is missing');
      onFailure && onFailure();
      return;
    }

    setProcessingPayment(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setProcessingPayment(false);
      onFailure && onFailure();
      return;
    }

    const options = {
      key: process.env.RAZORPAY_KEY || 'rzp_test_3DXkvRQuMCu83V',
      subscription_id: razorpay_subscription_id,
      currency: 'INR',
      name: companyName,
      description: description,
      image: logoUrl,
      handler: async function (response) {
        setPaymentCompleted(true);
        setPaymentId(response.razorpay_payment_id);
        
        try {
          await updateSubscription({
            subscription_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
          }).unwrap();
          
        } catch (error) {
          console.error('Update subscription failed:', error);
          setTimeout(() => {
            setProcessingPayment(false);
            onFailure && onFailure();
          }, 500);
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userContact,
      },
      notes: {
        address: JSON.stringify(billingAddress),
      },
      theme: {
        color: '#528FF0',
      },
      modal: {
        ondismiss: function () {
          if (!paymentCompleted) {
            setProcessingPayment(false);
            onFailure && onFailure();
          }
        },
      },
    };

    paymentObjectRef = new window.Razorpay(options);
    paymentObjectRef.open();
  };

  useEffect(() => {
    if (triggerPayment && subscription_id && !processingPayment && !paymentCompleted) {
      handlePayment();
    }
  }, [triggerPayment, subscription_id]);
  
  useEffect(() => {
    if (paymentCompleted && paymentId) {
      const successTimer = setTimeout(() => {
        setProcessingPayment(false);
        onSuccess && onSuccess(paymentId);
        setPaymentCompleted(false);
        setPaymentId('');
      }, 1000);
      
      return () => clearTimeout(successTimer);
    }
  }, [paymentCompleted, paymentId]);

  if (processingPayment && paymentCompleted) {
    return (
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgba(255,255,255,0.8)', 
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="h6">Processing your payment...</Typography>
      </Box>
    );
  }

  return null;
};

export default PaymentButton;