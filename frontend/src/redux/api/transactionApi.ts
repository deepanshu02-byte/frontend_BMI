import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BasicUrl } from "../../constants/constants";
import type { TGetAllApiResponse } from "../../types/index";
import type { ITransactionInput, ITransactionResponse } from "../../types/transaction"; // adjust path if needed


export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: BasicUrl.BASE_URL }),
  endpoints: (builder) => ({
    getAllTransactionCountByAdmin: builder.query<TGetAllApiResponse, void>({
      query: () => "transactions/getAllTransactionCountByAdmin",
    }),
    getAllLastFourMonthsTransactionsByAdmin: builder.query<
      TGetAllApiResponse,
      void
    >({
      query: () => "transactions/getAllLastFourMonthsTransactionsByAdmin",
    }),

    getAllTransactionDetailsByAdmin: builder.query<TGetAllApiResponse, any>({
      query: ({
        startDate,
        endDate,
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      }) => {
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (limit) params.append("limit", limit.toString());
        if (offset) params.append("offset", offset.toString());
        return `/transactions/getAllTransactionDetailsByAdmin?${params.toString()}`;
      },
    }),

    // ✅ Create Transaction Mutation
    createTransaction: builder.mutation<ITransactionResponse, ITransactionInput>({
      query: (transactionData) => ({
        url: "transactions/create",
        method: "POST",
        body: transactionData,
      }),
    }),

    // updateSchedule: builder.mutation<ISchedule, ISchedule>({
    //   query: (schedule) => ({
    //     url: `schedule/update/${schedule._id}`,
    //     method: "PATCH",
    //     body: schedule,
    //   }),
    // }),
  }),
});

export const {
  useGetAllTransactionCountByAdminQuery,
  useGetAllLastFourMonthsTransactionsByAdminQuery,
  useGetAllTransactionDetailsByAdminQuery,
  useCreateTransactionMutation,  // Export the mutation hook
} = transactionApi;

