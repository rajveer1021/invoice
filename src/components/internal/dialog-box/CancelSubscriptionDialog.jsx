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
    CircularProgress,
} from '@mui/material';
import { CustomButton } from '../../shared/CustomButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CancelSubscriptionDialog = ({ open, onClose, onConfirm, isCancelling }) => {
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
                <DialogTitle className="dialogTitle">Cancel Subscription?</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to cancel your subscription? This action cannot be undone, and you will lose access to premium features at the end of your current billing period.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CustomButton
                        styles="dialoge-button button outlined-dialoge-button"
                        handleClick={onClose}
                        title="Keep Subscription"
                    />
                    <CustomButton
                        styles="dialoge-button button filled-dialoge-button"
                        handleClick={onConfirm}
                        title={isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
                        disabled={isCancelling}
                        startIcon={isCancelling ? <CircularProgress size={16} color="inherit" /> : null}
                    />
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CancelSubscriptionDialog;