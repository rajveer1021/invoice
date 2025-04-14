import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./services/Api";
import { Apiwithoutheaders } from "./services";
import subscriptionReducer from './features/subscription/subscriptionSlice';

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    [Apiwithoutheaders.reducerPath]: Apiwithoutheaders.reducer,
    subscription: subscriptionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware).concat(Apiwithoutheaders.middleware),
});
