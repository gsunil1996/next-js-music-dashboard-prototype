import { configureStore } from "@reduxjs/toolkit";
import { petsApiSlice } from "./api/petsApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [petsApiSlice.reducerPath]: petsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, petsApiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
