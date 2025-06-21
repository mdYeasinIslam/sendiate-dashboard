import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 export const vehiclePageApi = createApi({
    reducerPath: 'vehiclePageApi',
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
        getVehiclePageApi: build.query<unknown, {limit:number}>({
            query: (limit) => ({
                url: `/vehicle`,
                query: {
                    limit: String(limit)
                }
})        }),
        getVehicleById: build.query<unknown, string>({
                query: (id) => `/vehicle/${id}`
        }),
        updateVehicle: build.mutation({
                query: ({ id, body }) => ({
                    url: `/vehicle/${id}`,
                    method: "PUT",
                    body,
                })
        })
    })

     
 })
    export const { useGetVehiclePageApiQuery, useGetVehicleByIdQuery,useUpdateVehicleMutation } = vehiclePageApi;