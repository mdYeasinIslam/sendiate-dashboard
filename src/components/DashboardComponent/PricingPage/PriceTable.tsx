'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { VehicleRate } from '@/type/priceType'


const PriceTable = ({ initialVehicleRates }: { initialVehicleRates: VehicleRate[] }) => {
     const [vehicleRates, setVehicleRates] = useState<VehicleRate[]>(initialVehicleRates)
      const [editingRate, setEditingRate] = useState<string | null>(null)
  useEffect(() => {
      setVehicleRates(initialVehicleRates)
    },[initialVehicleRates])
      const handleChangeRate = (id: string) => {
        // In a real application, this would open a modal or form to edit the rates
        setEditingRate(id === editingRate ? null : id)
        console.log(`Changing rates for vehicle ID: ${id}`)
      }
    
      const formatCurrency = (amount: number) => {
        return `$${amount.toFixed(2).replace(/\.00$/, "")}`
      }
  return (
     <div className="rounded-md ">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className=" font-semibold">Vehicle Type</TableHead>
              <TableHead className="font-semibold">Base Fare (Min-Max)</TableHead>
              <TableHead className="font-semibold">Per KM Rate (Min-Max)</TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleRates.map((rate, index) => (
              <TableRow key={index} className=''>
                <TableCell className="font-medium">{rate.vehicleType}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <div className="flex items-center  gap-5">
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm mr-1">Min</span>
                      <span className="font-medium bg-[#EBFBEF]  p-2">{formatCurrency(rate.perKmRate.min)}</span>
                    </div>
                    <div className="flex items-center ">
                      <span className="text-gray-500 text-sm mr-1">Max</span>
                      <span className="font-medium bg-[#EBFBEF]  p-2">{formatCurrency(rate.perKmRate.max)}</span>
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