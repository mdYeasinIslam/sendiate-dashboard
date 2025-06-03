'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const feedbackPageApi = createApi({
    reducerPath: 'feedbackPageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL_LOCAL}`,

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