import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 export const vehiclePageApi = createApi({
     reducerPath: 'vehiclePageApi',
     baseQuery: fetchBaseQuery({
         baseUrl: 'https://patrkamh.onrender.com/api/v1',
        //  baseUrl: 'http://10.0.30.91:5001/api/v1',
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
            getVehiclePageApi: build.query<unknown, void>({
                query: () => `/vehicle`
            }),
            getVehicleById: build.query<unknown, string>({
                query: (id) => `/vehicle/${id}`
            }),
           
     })
 })
    export const { useGetVehiclePageApiQuery, useGetVehicleByIdQuery } = vehiclePageApi;