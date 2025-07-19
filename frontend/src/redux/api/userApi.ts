import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BasicUrl } from "../../constants/constants";
import type { TGetAllApiResponse } from "../../types/index";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BasicUrl.BASE_URL }),
  endpoints: (builder) => ({
    getAllUsersCountByAdmins: builder.query<TGetAllApiResponse, void>({
      query: () => "users/getAllUsersCountByAdmin",
    }),
  }),
});

export const { useGetAllUsersCountByAdminsQuery } = userApi;
