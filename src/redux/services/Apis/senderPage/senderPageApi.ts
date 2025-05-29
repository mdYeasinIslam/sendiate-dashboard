'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const senderPageApi = createApi({
    reducerPath: 'senderPageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://patrkamh.onrender.com/api/v1',
        prepareHeaders: (headers) => {

        if (typeof window !== 'undefined') {
            const rawToken = localStorage.getItem('token');
            const token = rawToken?.trim();
            if (token && token !== 'undefined' && token !== 'null') {
                headers.set('Authorization', `${token}`);
            }
        }
        return headers;
        }, }),
    endpoints: (build) => ({

        getSenderStats: build.query<unknown, void>({
            query: () => `/users/senders`
        })
    })
})

export const { useGetSenderStatsQuery } = senderPageApi;