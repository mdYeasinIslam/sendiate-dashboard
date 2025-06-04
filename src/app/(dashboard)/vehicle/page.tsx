'use client'
import LoadingSpinner from '@/app/loading'
import VehicleTable from '@/components/DashboardComponent/vehiclePage/VehicleTable'
import PageWrapper from '@/components/PageWrapper'
import { useGetVehiclePageApiQuery } from '@/redux/services/Apis/vehicleApi/vehiclePageApi'
import { VehicleType } from '@/type/vehicleType'
import React from 'react'

 
type VehicleStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: VehicleType[]
};
const Page = () => {
    const { data, error, isLoading } = useGetVehiclePageApiQuery({limit:10}) as { data?: VehicleStatsResponse, error?: unknown, isLoading: boolean };
    
    const vehicles = data?.data || [];
  
    if (isLoading) return <div><LoadingSpinner/></div>
    if (error) return <div>Error loading vehicles</div>

  return (
   <section className='bg-[#F8F8F8]'>
         <header>
           <PageWrapper title="Vehicle" />
         </header>
         <main className='md:px-5'>
              <VehicleTable vehicles={vehicles} />
           
         </main>
       </section>

  )
}

export default Page