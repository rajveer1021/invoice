import React from 'react';
import {
  Button,
  DialogContent,
  Grid,
  Box,
  Stack,
  Typography,
  useTheme,
  Container
} from '@mui/material';
import Header from '../../internal/layout/Header';
import invoiceImage from '../../../assets/images/invoice.svg'
import { useNavigate } from "react-router-dom";
import {TRIAL_FEATURES} from '../../../constant/index';
import { CreditCardOff as CreditCardOffIcon } from '@mui/icons-material';

const TrialPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleStartTrial = () => {
    navigate("/dashboard")
  };

  const handleRedirect = () => {
    navigate("/subscription-plans")
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid container sx={{ background: '#fff', mt: 15 }}>
          {/* Left section with trial info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pt: 10, pb: 10, pl: 5, pr: 5 }}>
              <DialogContent sx={{ p: 0 }}>
                <Typography variant="h4" color="textPrimary" fontWeight={600}>
                  Try premium features (for free)
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ mt: 4 }}
                  fontWeight={600}
                  color="text.secondary"
                >
                  Get started with a free trial and enjoy the benefits:
                </Typography>

                {/* Feature list */}
                {TRIAL_FEATURES.map((feature, index) => (
                  <Stack
                    key={`trial-feature-${index}`}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: index === 0 ? 4 : 2 }}
                  >
                    {feature.icon}
                    <Typography color="text.secondary" variant="body1">
                      {feature.content}
                    </Typography>
                  </Stack>
                ))}
              </DialogContent>

              {/* CTA Section */}
              <Stack
                direction="column"
                alignItems="center"
                sx={{ width: '100%', mt: 5 }}
              >
                <Button
                  variant="contained"
                  onClick={handleStartTrial}
                  sx={{
                    borderRadius: '4px',
                    backgroundColor: 'primary-btn',
                    '&:hover': { backgroundColor: '#0c0c60' },
                    maxWidth: '240px',
                    width: '100%',
                    fontSize: 16,
                    textTransform: 'none',
                    py: 1
                  }}
                >
                  Start Free Trial
                </Button>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 3 }}
                >
                  <CreditCardOffIcon sx={{ fontSize: 22, color: '#3f3f46' }} />
                  <Typography variant="body2" color="text.secondary">
                    No credit card. No commitment.
                  </Typography>
                </Stack>

                <Typography color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                  Or
                </Typography>

                <Button
                  variant="text"
                  onClick={handleRedirect}
                  aria-label="View subscription plans"
                  sx={{
                    color: '#3f3f46',
                    textDecoration: 'underline',
                    fontSize: 16,
                    textTransform: 'none'
                  }}
                >
                  Get started directly with Basic or Professional
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* Right section with image */}
          <Grid item xs={12} md={6}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '100%',
                height: '100%',
                background: `radial-gradient(
                  60.05% 178.67% at 20.03% 110.01%,
                  ${theme.palette.primary.light || '#3d85c6'} 0%,
                  ${theme.palette.primary.main || '#1565c0'} 100%
                )`
              }}
            >
              <Box
                component="img"
                src={invoiceImage}
                alt="Invoice management dashboard preview"
                loading="lazy"
                sx={{
                  width: '80%',
                  height: '80%',
                  objectFit: 'contain',
                  maxHeight: '600px'
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TrialPage;