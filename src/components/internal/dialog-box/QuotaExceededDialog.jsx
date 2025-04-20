import React from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  DialogTitle,
  Slide,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../shared/CustomButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuotaExceededDialog = ({ open, onClose, type = 'invoice' }) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/subscription-plans');
    onClose();
  };

  return (
    <Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        className="dialogBox"
      >
        <DialogTitle className="dialogTitle">
          {`${type.charAt(0).toUpperCase() + type.slice(1)} Quota Exceeded`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You've reached the {type} creation limit for your current plan. Upgrade to a higher plan to create more {type}s.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            styles="dialoge-button button outlined-dialoge-button"
            handleClick={onClose}
            title="Cancel"
          />
          <CustomButton
            styles="dialoge-button button filled-dialoge-button"
            handleClick={handleUpgrade}
            title="Upgrade Plan"
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuotaExceededDialog;