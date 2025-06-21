'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const homePageApis = createApi({
    reducerPath: 'homePageApis',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.sendiate.code-commando.com/api/v1',
        // baseUrl: 'https://api.sendiate.code-commando.com/api/v1',
        //  baseUrl: 'http://10.0.30.91:5001/api/v1',
        // baseUrl:`${process.env.NEXT_PUBLIC_API_URL_LOCAL}`,

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