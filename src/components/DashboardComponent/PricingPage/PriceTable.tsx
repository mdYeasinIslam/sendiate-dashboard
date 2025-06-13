'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetVehiclePageApiQuery, useUpdateVehicleMutation } from '@/redux/services/Apis/vehicleApi/vehiclePageApi'
import { VehicleFeeType } from '@/type/platformPageTypes'
import LoadingSpinner from '@/app/loading'
import EachPlateformFee from '../plateformFee/EachPlateformFee'
import { toast } from 'sonner'

type VehicleStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: VehicleFeeType[]
};
const PriceTable = () => {
    
    const { data, error, isLoading,refetch } = useGetVehiclePageApiQuery({limit:1000}) as { data?: VehicleStatsResponse, error?: unknown, isLoading: boolean,refetch:()=>void};
      const [updateVehicle] = useUpdateVehicleMutation()
  
    const vehiclesPriceData = data?.data || [];
    const [vehiclePrice, setVehiclePrice] = useState<VehicleFeeType[]>(vehiclesPriceData || []);
    // const [editingRate, setEditingRate] = useState<string | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editItem, setEditItem] = useState<string>('')
    const [loading,setLoading] =useState(false)

  useEffect(() => {
    if (vehiclesPriceData.length && JSON.stringify(vehiclePrice) !== JSON.stringify(vehiclesPriceData)) {
      setVehiclePrice(vehiclesPriceData)
    }
  }, [vehiclesPriceData,vehiclePrice])
  
  //copy from platfrom tabel
  const handleEditClick = (vehicle: VehicleFeeType) => {
    setEditItem(vehicle.id)
    setIsEditOpen(true)
  }
// Handle updated vehicle fee save to the database
    const handleSaveUpdatedPrices =async (param: VehicleFeeType, maxPricePerKm: number,minPricePerKm:number) => {
        setIsEditOpen(false)
        if (param?.maxPricePerKm === maxPricePerKm && param?.minPricePerKm ===minPricePerKm) {
          return 0
        }
        setLoading(true)
        const res = await updateVehicle({ id: param.id, body: { maxPricePerKm:maxPricePerKm, minPricePerKm:minPricePerKm } })
        // console.log(res)
        if (res?.data?.success) {
          refetch()
          toast.success("Vehicle fee updated successfully")
          setLoading(false)
        }
  }
  //-----------------------------------
    if (isLoading) return <div className="text-center py-10"><LoadingSpinner/></div>
    if (error) return <div className="text-center py-10 text-red-500">Error loading vehicle rates</div>
    if (!vehiclePrice || vehiclePrice.length === 0) {
      return <div className="text-center py-10">No vehicle rates available</div>
    }
  return (
     <div className={`relative rounded-md bg-[#ffffff] p-5 ${loading?'opacity-60':''}`}>
        {
          loading && <div className='absolute z-20 top-[0%] left-[45%]'> <LoadingSpinner/></div> 
        }
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className=" font-semibold">Vehicle Type</TableHead>
              {/* <TableHead className="font-semibold">Base Fare (Min-Max)</TableHead> */}
              <TableHead className="font-semibold">Per KM Rate (Min-Max)</TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {vehiclePrice?.map((vehicle, index) => (
            <EachPlateformFee
             key={index}
                vehicle={vehicle}
                isEditOpen={isEditOpen}
                editItem={editItem}
                handleEditClick={handleEditClick}
                handleSaveUpdatedPrices={handleSaveUpdatedPrices}
                page={'PricePage'}
            />
             
            ))}
          </TableBody>
        </Table>
      </div>
  )
}

export default PriceTable