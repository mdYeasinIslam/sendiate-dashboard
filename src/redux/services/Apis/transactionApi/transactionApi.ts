'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const transactionApi = createApi({
    reducerPath: 'transactionApi',
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

        getTransactionStats: build.query<unknown, { page: number, limit: number,paymentMethod?:string}>({
            query: ({page,limit,paymentMethod}) => ({
                url: `/payments/transactions`,
                params: { 
                    page: String(page),
                    limit:String(limit),
                    paymentMethod, 
                    // isCourierFeeRelease: String(isCourierFeeRelease), 
                    // isPlatformFeeRelease: String(isPlatformFeeRelease) 
                }
            })
        }),

    })
})
 
export const { useGetTransactionStatsQuery } = transactionApi;