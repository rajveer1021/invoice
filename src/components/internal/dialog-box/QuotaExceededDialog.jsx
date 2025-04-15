import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuotaExceededDialog = ({ open, onClose, type = 'invoice' }) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/subscription-plans');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{`${type.charAt(0).toUpperCase() + type.slice(1)} Quota Exceeded`}</DialogTitle>
      <DialogContent>
        <Typography>
          You've reached the {type} creation limit for your current plan. Upgrade to a higher plan to create more {type}s.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="outlined-dialoge-button">
          Cancel
        </Button>
        <Button onClick={handleUpgrade} className="filled-dialoge-button" color="primary">
          Upgrade Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuotaExceededDialog;