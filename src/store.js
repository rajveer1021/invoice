import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./services/Api";
import { Apiwithoutheaders } from "./services";
export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    [Apiwithoutheaders.reducerPath]: Apiwithoutheaders.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware).concat(Apiwithoutheaders.middleware),
});
