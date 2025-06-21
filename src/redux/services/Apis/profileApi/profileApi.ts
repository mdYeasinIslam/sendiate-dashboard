import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.sendiate.code-commando.com/api/v1',
        // baseUrl: 'http://10.0.30.91:5001/api/v1',
        // baseUrl:`${process.env.NEXT_PUBLIC_API_URL_LOCAL}`,
        
        prepareHeaders: (headers) => {
             if (typeof window !== 'undefined') {
                 const rawToken = localStorage.getItem('token');
                 const token = rawToken?.trim();
                 if (token && token !== 'undefined' && token !== 'null') {
                     headers.set('Authorization', `${token}`);
                 }
              }
        }
        
    }),
    endpoints: (build) => ({
        getProfile: build.query<unknown, void>({
            query: () => ({
                url: `/users/profile`
})        }),
        // updateVehicle: build.mutation({
        //         query: ({ id, body }) => ({
        //             url: `/vehicle/${id}`,
        //             method: "PUT",
        //             body,
        //         })
        // })
    })

     
 })
    export const { useGetProfileQuery } = profileApi;