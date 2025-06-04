'use client'
import { NotificationPayload, NotificationResponse, UserType } from '@/type/notificationPage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const notificationApi = createApi({
    reducerPath: 'notificationApi',
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
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<UserType[], {limit:number}>({
            query: ({ limit }) => ({
                url: `/users/all`,
                params:{limit:String(limit)}
            }),
        }),
        sendNotification: builder.mutation<NotificationResponse, NotificationPayload>({
            query: (body) => ({
                url: '/notifications/send-to-selected',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useSendNotificationMutation } = notificationApi;