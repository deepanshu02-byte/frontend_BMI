import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthUrl, BasicUrl, Methods } from "../../constants/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BasicUrl.BASE_URL,
  }),
  
// baseQuery: fetchBaseQuery({
//   baseUrl: BasicUrl.BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: AuthUrl.LOGIN_API_URL,
        method: Methods.POST,
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: AuthUrl.REGISTER_API_URL,
        method: Methods.POST,
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
