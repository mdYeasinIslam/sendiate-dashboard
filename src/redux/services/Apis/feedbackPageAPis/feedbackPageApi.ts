'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const feedbackPageApi = createApi({
    reducerPath: 'feedbackPageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://patrkamh.onrender.com/api/v1",

        prepareHeaders: (headers) => {
            if (typeof window !== 'undefined') {
                const rawToken = localStorage.getItem('token');
                const token = rawToken?.trim();
                if (token && token !== 'undefined' && token !== 'null') {
                    headers.set('Authorization', `${token}`);
                }
            }
            return headers;
        },
    }),

    endpoints: (build) => ({

        getFeedbackStats: build.query<unknown, { userRole: string }>({
            query: ({ userRole }) => ({
                url: `/feedback/all`,
                params: { userRole }
            })
        }),

        getFeedbackById: build.query<unknown, string>({
            query: (id) => `/users/senders/${id}`
        }),

    })
})

export const { useGetFeedbackStatsQuery,useGetFeedbackByIdQuery } = feedbackPageApi;