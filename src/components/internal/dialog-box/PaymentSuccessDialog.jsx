import React, { useEffect } from 'react';
import { Dialog, DialogContent, Box, Typography, Button } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Receipt as ReceiptIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PaymentSuccessDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { selectedPlan, paymentId } = useSelector(state => state.subscription);

  const paymentDetails = {
    planName: selectedPlan?.name,
    paymentId: paymentId,
  };

  const handleCreateReport = () => {
    navigate('/dashboard');
    onClose();
  };

  const handleManagePlan = () => {
    navigate('/manage-subscription');
    onClose();
  };

  useEffect(() => {
    if (open) {
      window.history.pushState(null, null, window.location.pathname);

      const handlePopState = (event) => {
        window.history.pushState(null, null, window.location.pathname);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => { }} 
      disableEscapeKeyDown 
      disableBackdropClick 
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          maxWidth: 600,
          width: '100%',
          border: '1px solid #e0e0e0',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          backdropFilter: 'blur(4px)', 
          WebkitBackdropFilter: 'blur(4px)', 
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 3, sm: 6 }, textAlign: 'center' }}>
        <Box sx={{ bgcolor: '#e8f5e9', width: { xs: 80, sm: 100 }, height: { xs: 80, sm: 100 }, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto', mb: 3 }}>
          <CheckCircleIcon sx={{ fontSize: { xs: 50, sm: 60 }, color: '#50B077' }} />
        </Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#1A1A1A', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          Payment Successful!
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary', maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}>
          You’re now subscribed to the <strong>{paymentDetails.planName}</strong> plan. Welcome aboard!
        </Typography>
        <Box sx={{ my: 3, py: 2, px: 3, bgcolor: '#f9fafb', borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 1, border: '1px solid #eceff1' }}>
          <ReceiptIcon sx={{ fontSize: 20, color: '#78909c' }} />
          <Box textAlign="left">
            <Typography variant="body2" sx={{ fontWeight: 500 }}>Payment ID: {paymentDetails.paymentId}</Typography>
            <Typography variant="caption" color="text.secondary">Save this for your records</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleManagePlan}
            sx={{ px: 4, py: 1.25, borderRadius: 2, textTransform: 'none', fontSize: '1rem', fontWeight: 500, borderColor: '#2196F3', color: '#2196F3', transition: 'all 0.2s ease', '&:hover': { borderColor: '#1976d2', bgcolor: '#e3f2fd' }, width: { xs: '100%', sm: 'auto' } }}
          >
            Manage Subscription
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateReport}
            sx={{ px: 4, py: 1.25, borderRadius: 2, textTransform: 'none', fontSize: '1rem', fontWeight: 500, bgcolor: '#2196F3', boxShadow: 'none', transition: 'all 0.2s ease', '&:hover': { bgcolor: '#1976d2', boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)' }, width: { xs: '100%', sm: 'auto' } }}
          >
            Go to Dashboard
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, fontSize: '0.875rem' }}>
          Need help? Contact us at <Box component="span" sx={{ color: '#2196F3', cursor: 'pointer' }}>support@clecotech.com</Box>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessDialog;