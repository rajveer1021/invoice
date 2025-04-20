import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PLAN_THEME_COLORS as THEME_COLORS } from '../../constant/index';
import { useLazyGetSubscribedPlanQuery } from '../../services/Api';

const SubscriptionExpiryNotice = ({ onRenew }) => {
    const [getSubscribedPlan, { data, isLoading, error }] = useLazyGetSubscribedPlanQuery();
    const [expiresInDays, setExpiresInDays] = useState(null);

    useEffect(() => {
        getSubscribedPlan();
    }, [getSubscribedPlan]);

    useEffect(() => {
        if (data?.status === 'success' && data?.data?.subscription) {
            const subData = data?.data?.subscription;            
            const currentPeriodEnd = new Date(subData.current_period_end);
            const now = new Date();
            const timeDiff = currentPeriodEnd - now;
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            setExpiresInDays(daysRemaining > 0 ? daysRemaining : 0);
        }
    }, [data]);

    const handleRenew = () => {
        if (onRenew) {
            onRenew();
        } else {
            window.location.href = '/checkout';
        }
    };

    if (isLoading || error || !expiresInDays) {
        return null;
    }

    if (expiresInDays > 7) {
        return null;
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: THEME_COLORS.warningLight,
                border: `1px solid ${THEME_COLORS.warning}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
            }}
            role="alert"
            aria-live="polite"
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ color: THEME_COLORS.warning, mr: 1.5 }} aria-hidden="true" />
                <Typography variant="body2" fontWeight={500} color={THEME_COLORS.darkGray}>
                    Your plan will expire in {expiresInDays} day{expiresInDays !== 1 ? 's' : ''}. Renew now to continue using all features.
                </Typography>
            </Box>
            <Button
                variant="contained"
                size="small"
                onClick={handleRenew}
                aria-label="Renew subscription plan"
                sx={{
                    textTransform: 'none',
                    borderRadius: 1.5,
                    bgcolor: THEME_COLORS.warning,
                    '&:hover': { bgcolor: THEME_COLORS.warning, opacity: 0.9 },
                }}
            >
                Renew Plan
            </Button>
        </Paper>
    );
};

export default SubscriptionExpiryNotice;