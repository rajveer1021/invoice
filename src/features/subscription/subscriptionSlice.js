import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPlan: null,
  billingCycle: 'monthly',
  paymentStatus: null,
  paymentId: null,
  status: 'idle', 
  invoiceQuota: { used: 0, total: 0 }, 
  clientQuota: { used: 0, total: 0 }, 
  error: null, 
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // Existing reducers
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
    // New reducers
    setSubscription(state, action) {
      state.selectedPlan = action.payload.plan;
      state.status = action.payload.status;
      state.invoiceQuota = action.payload.invoiceQuota;
      state.clientQuota = action.payload.clientQuota;
    },
    updateInvoiceQuota(state, action) {
      state.invoiceQuota.used = action.payload.used;
    },
    updateClientQuota(state, action) {
      state.clientQuota.used = action.payload.used;
    },
    resetSubscription(state) {
      return {
        ...initialState,
        billingCycle: state.billingCycle, 
      };
    },
  },
});

export const {
  setSelectedPlan,
  setBillingCycle,
  setPaymentStatus,
  setPaymentId,
  setSubscription,
  updateInvoiceQuota,
  updateClientQuota,
  resetSubscription,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;