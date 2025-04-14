import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
  } from '@mui/material';
  import CheckIcon from '@mui/icons-material/Check';
  
  const THEME_COLORS = {
    primary: '#2196F3',
    primaryLight: '#E3F2FD',
    secondary: '#50B077',
    secondaryLight: '#E8F5E9',
    tertiary: '#9E9E9E',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    darkGray: '#333333',
    text: '#333333',
    green: '#50B077',
  };
  
  const PlanFeature = ({ feature, color }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
      <CheckIcon
        fontSize="small"
        sx={{
          color,
          mr: 1,
          fontSize: 18
        }}
      />
      <Typography variant="body2">{feature}</Typography>
    </Box>
  );
  
  const PlanCard = ({ plan, isYearly, isMobile, onSelect }) => {
    const featureColor = plan.id === 'trial' ? THEME_COLORS.secondary : THEME_COLORS.primary;
    const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  
    return (
      <Card
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: plan.highlight ? `2px solid ${THEME_COLORS.primary}` : `1px solid ${plan.color}`,
          position: 'relative',
          transform: !isMobile && plan.highlight ? 'scale(1.05)' : 'none',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {plan.highlight && (
          <Box sx={{
            position: 'absolute',
            top: 15,
            right: -30,
            transform: 'rotate(45deg)',
            bgcolor: THEME_COLORS.primary,
            px: 4,
            py: 0.5,
            zIndex: 1
          }}>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
              POPULAR
            </Typography>
          </Box>
        )}
  
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              p: 3,
              pb: 2,
              backgroundColor: plan.colorAccent,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Box sx={{ zIndex: 1 }}>
              <Typography variant="body2" color="black" gutterBottom>
                {plan.tagline}
              </Typography>
              <Typography variant="h6" color="black" fontWeight={600}>
                {plan.name}
              </Typography>
              <Typography variant="h4" color="black" fontWeight={700} sx={{ mb: 1 }}>
                {currentPrice}
              </Typography>
              <Typography variant="body2" color="black">
                /{isYearly ? 'month, (billed annually)' : 'month'}
              </Typography>
            </Box>
          </Box>
        </Box>
  
        <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ px: 3, pt: 3, pb: 2, flexGrow: 1 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
              What's included
            </Typography>
  
            {plan.features.map((feature, idx) => (
              <PlanFeature key={idx} feature={feature} color={featureColor} />
            ))}
          </Box>
  
          <Box sx={{ px: 3, pb: 3 }}>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              disabled={plan.disabled}
              onClick={() => onSelect(plan.id)}
              sx={{
                py: 1.5,
                textTransform: 'none',
                borderRadius: 2,
                bgcolor: plan.id === 'trial' ? THEME_COLORS.secondary : THEME_COLORS.primary,
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: plan.id === 'trial' ? THEME_COLORS.secondary : THEME_COLORS.primary,
                  opacity: 0.9,
                }
              }}
            >
              {plan.buttonText}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  export default PlanCard;