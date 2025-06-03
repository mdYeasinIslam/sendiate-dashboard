"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const senderPageApi = createApi({
  reducerPath: "senderPageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://patrkamh.onrender.com/api/v1",
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const rawToken = localStorage.getItem("token");
        const token = rawToken?.trim();
        if (token && token !== "undefined" && token !== "null") {
          headers.set("Authorization", `${token}`);
        }
      }
      return headers;
    },
  }),

  // ✅ Use tagTypes that match your resource (e.g., "Sender" not "Courier")
  tagTypes: ["Sender"],

  endpoints: (build) => ({
    getSenderStats: build.query<unknown, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/users/senders`,
        params: {
          page: String(page),
          limit: String(limit),
        },
      }),
      providesTags: ["Sender"],
    }),

    getSenderById: build.query<unknown, string>({
      query: (id) => `/users/senders/${id}`,
      providesTags: ["Sender"],
    }),

    updateSenderStatus: build.mutation<
      unknown,
      { id: string; body: Record<string, any> }
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Sender"],
    }),
  }),
});

// ✅ Export all hooks you need
export const {
  useGetSenderStatsQuery,
  useGetSenderByIdQuery,
  useUpdateSenderStatusMutation,
} = senderPageApi;
