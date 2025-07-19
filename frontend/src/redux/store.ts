import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";

import { authApi } from "./api/authApi";
import { transactionApi } from "./api/transactionApi";
import { userApi } from "./api/userApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      transactionApi.middleware,

    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

