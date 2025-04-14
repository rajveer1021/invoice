import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { PLAN_THEME_COLORS as THEME_COLORS } from '../../constant/index';

const SubscriptionUsage = ({ usage }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 2,
      border: `1px solid ${THEME_COLORS.border}`,
      mb: 4,
    }}
  >
    <Typography variant="h6" fontWeight={600} color={THEME_COLORS.text} mb={3}>
      Usage Statistics
    </Typography>

    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color={THEME_COLORS.tertiary} sx={{ display: 'flex', alignItems: 'center' }}>
              Invoice Credits
              <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, color: THEME_COLORS.tertiary }} />
            </Typography>
            <Typography variant="body2" color={THEME_COLORS.text} fontWeight={500}>
              {usage?.invoices.used} of {usage?.invoices.total}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: 6, bgcolor: THEME_COLORS.lightGray, borderRadius: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                width: `${(usage?.invoices.used / usage?.invoices.total) * 100}%`,
                height: '100%',
                bgcolor: THEME_COLORS.green,
                borderRadius: 3,
              }}
            />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color={THEME_COLORS.tertiary} sx={{ display: 'flex', alignItems: 'center' }}>
              Clients
              <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, color: THEME_COLORS.tertiary }} />
            </Typography>
            <Typography variant="body2" color={THEME_COLORS.text} fontWeight={500}>
              {usage?.clients.used} of {usage?.clients.total}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: 6, bgcolor: THEME_COLORS.lightGray, borderRadius: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                width: `${(usage?.clients.used / usage?.clients.total) * 100}%`,
                height: '100%',
                bgcolor: THEME_COLORS.blue,
                borderRadius: 3,
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>

    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <AccessTimeIcon sx={{ fontSize: 16, color: THEME_COLORS.tertiary, mr: 1 }} />
      <Typography variant="body2" color={THEME_COLORS.tertiary}>
        Your usage is renewed every month. Next renewal:{' '}
        <Typography component="span" fontWeight={500} color={THEME_COLORS.text}>
          {usage?.nextRenewal || 'May 08, 2025'}
        </Typography>
      </Typography>
    </Box>
  </Paper>
);

export default SubscriptionUsage;