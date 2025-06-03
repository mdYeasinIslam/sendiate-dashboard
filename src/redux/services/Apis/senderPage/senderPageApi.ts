'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from 'inspector';


export const senderPageApi = createApi({
    reducerPath: 'senderPageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://patrkamh.onrender.com/api/v1',
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
        },
    }),
    
        endpoints: (build) => ({

            getSenderStats: build.query<unknown, {page:number,limit:number}>({
                query: ({ page, limit }) => ({
                    
                    url: `/users/senders`,
                    params: {
                        page: String(page),
                        limit:String(limit)
                    }
                        
                })
            }),
             
            getSenderById: build.query<unknown, string>({
                query: (id) => `/users/senders/${id}`
            }),
            updateSenderStatus: build.mutation({
                query: ({ id, body }) => ({
                    url:`/users/${id}/status`,
                    method: "PATCH",
                    body
                })
            })

    })
})

export const { useGetSenderStatsQuery,useGetSenderByIdQuery } = senderPageApi;