'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,

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

        getTransactionStats: build.query<unknown,{paymentMethod:string,isCourierFeeRelease:boolean,isPlatformFeeRelease:boolean}>({
            query: ({ paymentMethod, isCourierFeeRelease, isPlatformFeeRelease }) => ({
                url: `/payments/transactions`,
                params: { 
                    paymentMethod, 
                    isCourierFeeRelease: String(isCourierFeeRelease), 
                    isPlatformFeeRelease: String(isPlatformFeeRelease) 
                }
            })
        }),

    })
})
 
export const { useGetTransactionStatsQuery } = transactionApi;