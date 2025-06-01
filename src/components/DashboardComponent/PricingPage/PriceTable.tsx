'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { VehicleRate } from '@/type/priceType'
import { useGetVehiclePageApiQuery } from '@/redux/services/Apis/vehicleApi/vehiclePageApi'
import { VehicleFeeType } from '@/type/platformPageTypes'
import LoadingSpinner from '@/app/loading'

type VehicleStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: VehicleFeeType[]
};
const PriceTable = () => {
    
    const { data, error, isLoading } = useGetVehiclePageApiQuery() as { data?: VehicleStatsResponse, error?: unknown, isLoading: boolean };
    
    const vehiclesPriceData = data?.data || [];
          // console.log(vehiclesPriceData)
    
    // const [vehiclePricing, setVehiclePricing] = useState<VehicleFeeType[]>(vehiclesPriceData || []);

     const [vehiclePrice, setVehiclePrice] = useState<VehicleFeeType[]>(vehiclesPriceData || []);
      const [editingRate, setEditingRate] = useState<string | null>(null)
  useEffect(() => {
    if (vehiclesPriceData.length && JSON.stringify(vehiclePrice) !== JSON.stringify(vehiclesPriceData)) {
      setVehiclePrice(vehiclesPriceData)
    }
  }, [vehiclesPriceData])
  
      const handleChangeRate = (id: string) => {
        // In a real application, this would open a modal or form to edit the rates
        setEditingRate(id === editingRate ? null : id)
        console.log(`Changing rates for vehicle ID: ${id}`)
      }
    
      const formatCurrency = (amount: number) => {
        return `$${amount.toFixed(2).replace(/\.00$/, "")}`
  }
  
  if (isLoading) return <div className="text-center py-10"><LoadingSpinner/></div>
    if (error) return <div className="text-center py-10 text-red-500">Error loading vehicle rates</div>
    if (!vehiclePrice || vehiclePrice.length === 0) {
      return <div className="text-center py-10">No vehicle rates available</div>
    }
  return (
     <div className="rounded-md ">
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
            {vehiclePrice?.map((rate, index) => (
              <TableRow key={index} className=''>
                <TableCell className="font-medium">{rate.name}</TableCell>
                {/* <TableCell>
                  <div className="flex items-center  gap-5">
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm mr-1">Min</span>
                      <span className="font-medium bg-[#EBFBEF] p-2">{formatCurrency(rate.baseFare.min)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm mr-1 ">Max</span>
                      <span className="font-medium bg-[#EBFBEF]  p-2">{formatCurrency(rate.baseFare.max)}</span>
                    </div>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="flex items-center  gap-5">
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm mr-1">Min</span>
                      <span className="font-medium bg-[#EBFBEF]  p-2">{formatCurrency(rate.minPricePerKm)}</span>
                    </div>
                    <div className="flex items-center ">
                      <span className="text-gray-500 text-sm mr-1">Max</span>
                      <span className="font-medium bg-[#EBFBEF]  p-2">{formatCurrency(rate.maxPricePerKm)}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-black"
                    onClick={() => handleChangeRate(rate.id)}
                  >
                    Change
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
}

export default PriceTable