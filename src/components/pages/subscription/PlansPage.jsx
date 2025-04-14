import React from 'react';
import Header from '../../internal/layout/Header';
import PlansSection from '../../internal/PlansSection';
import { Container } from '@mui/material';

const PlansPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{mt:15}}>
        <PlansSection />
      </Container>
    </>
  );
};

export default PlansPage;