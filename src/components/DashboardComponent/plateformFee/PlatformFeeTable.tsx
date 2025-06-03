"use client"

import { useEffect, useState } from "react"
import {  useGetVehiclePageApiQuery, useUpdateVehicleMutation } from "@/redux/services/Apis/vehicleApi/vehiclePageApi"
import { VehicleFeeType } from "@/type/platformPageTypes"
import LoadingSpinner from "@/app/loading"
import EachPlateformFee from "./EachPlateformFee"
import { toast } from "sonner"


 // define type from vehiclePageApi
type VehicleStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: VehicleFeeType[]
};

export default function PlatformFeeTable() { 
  const { data, error, isLoading} = useGetVehiclePageApiQuery() as { data?: VehicleStatsResponse, error?: unknown, isLoading: boolean };
  const [updateVehicle] = useUpdateVehicleMutation()

  const platformFeeData = data?.data || [];
  
// Set vehicle price to the component state so that we can monitor it
  const [vehiclePricing, setVehiclePricing] = useState<VehicleFeeType[]>(platformFeeData || []);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editItem, setEditItem] = useState<string>('')
  const [reRender,setReRender]=useState(false)
  // monitor if platformFeeData is update then re-render the component
  useEffect(() => {
    if (platformFeeData.length && JSON.stringify(vehiclePricing) !== JSON.stringify(platformFeeData)) {
      setVehiclePricing(platformFeeData)
    }
  },[platformFeeData,reRender,vehiclePricing])
  

  const handleEditClick = (vehicle: VehicleFeeType) => {
    setEditItem(vehicle.id)
    setIsEditOpen(true)
  }
// Handle updated vehicle fee save to the database
  const handleSaveEdit = async (param: VehicleFeeType, vehicleFee: number,feeType:"PERCENTAGE" | "FIXED") => {
    setIsEditOpen(false)
    if (param?.fee === vehicleFee && param?.feeType === feeType) {
      return 0
    }
    const res = await updateVehicle({ id: param.id, body: { fee: vehicleFee, feeType:feeType } })
    if (res?.data?.success) {
      // setReRender(!reRender)
      setTimeout(() => {
        setReRender(prev => !prev)
        if (platformFeeData.length && JSON.stringify(vehiclePricing) !== JSON.stringify(platformFeeData)) {
          setVehiclePricing(platformFeeData)
        }
      }, 100);
      toast.success("Vehicle fee updated successfully")
    }
  }

  if(isLoading) {
    return <div className="text-center py-10"><LoadingSpinner/></div>  
  }
  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading vehicle data</div>
  }
  if (!platformFeeData || platformFeeData.length === 0) {
    return <div className="text-center py-10">No vehicle data available</div>
  }
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto px-1 md:px-5">
        <table className="w-full ">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-semibold text-gray-700">Vehicle Type</th>
              <th className="text-left py-3 font-semibold text-gray-700">Price</th>
              <th className="text-right py-3 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {platformFeeData.map((vehicle) => (
              <EachPlateformFee
                key={vehicle.id}
                vehicle={vehicle}
                isEditOpen={isEditOpen}
                editItem={editItem}
                handleEditClick={handleEditClick}
                handleSaveEdit={handleSaveEdit}
                page="PlatformFeePage"

            />))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
