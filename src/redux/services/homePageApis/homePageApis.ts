'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const homePageApis = createApi({
    reducerPath: 'homePageApis',
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
        getHomePageApi: build.query<unknown, void>({ query: () => `posts` }),

        getDashboardStats: build.query<unknown, number>({
            query: (year) => `/dashboard/stats?year=${year}`
        })
    })
})

export const { useGetHomePageApiQuery,useGetDashboardStatsQuery } = homePageApis;