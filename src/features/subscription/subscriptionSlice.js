import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPlan: null,
  billingCycle: 'monthly', 
  paymentStatus: null, 
  paymentId: null
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    setBillingCycle: (state, action) => {
      state.billingCycle = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setPaymentId: (state, action) => {
      state.paymentId = action.payload;
    },
    resetSubscription: (state) => {
      return initialState;
    }
  }
});

export const { 
  setSelectedPlan, 
  setBillingCycle, 
  setPaymentStatus, 
  setPaymentId, 
  resetSubscription 
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;