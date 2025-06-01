'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const courierPageApi = createApi({
    reducerPath: 'courierPageApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://patrkamh.onrender.com/api/v1',
        // baseUrl: 'http://10.0.30.91:5001/api/v1',
            
        baseUrl:`${process.env.NEXT_PUBLIC_API_URL_LOCAL}`,

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

            getCourierStats: build.query<unknown, void>({
                query: () => `/users/couriers`
            }),
            
            getCourierById: build.query<unknown, string>({
                query: (id) => `/users/couriers/${id}`
            }),

         })
})

export const { useGetCourierStatsQuery,useGetCourierByIdQuery } = courierPageApi;