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
    
    const { data, error, isLoading } = useGetVehiclePageApiQuery() as { data?: VehicleStatsResponse, error?: unknown, isLoading: boolean };
      const [updateVehicle] = useUpdateVehicleMutation()
  
    const vehiclesPriceData = data?.data || [];
    const [vehiclePrice, setVehiclePrice] = useState<VehicleFeeType[]>(vehiclesPriceData || []);
    // const [editingRate, setEditingRate] = useState<string | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editItem, setEditItem] = useState<string>('')


  useEffect(() => {
    if (vehiclesPriceData.length && JSON.stringify(vehiclePrice) !== JSON.stringify(vehiclesPriceData)) {
      setVehiclePrice(vehiclesPriceData)
    }
  }, [vehiclesPriceData,vehiclePrice])
  
      // const handleChangeRate = (id: string) => {
      //   // In a real application, this would open a modal or form to edit the rates
      //   setEditingRate(id === editingRate ? null : id)
      //   console.log(`Changing rates for vehicle ID: ${id}`)
      // }
    
      // const formatCurrency = (amount: number) => {
      //   return `$${amount.toFixed(2).replace(/\.00$/, "")}`
      // }
  
  
  //copy from platfrom tabel
  const handleEditClick = (vehicle: VehicleFeeType) => {
    setEditItem(vehicle.id)
    setIsEditOpen(true)
  }
// Handle updated vehicle fee save to the database
  const handleSaveUpdatedPrices =async (param: VehicleFeeType, maxPricePerKm: number,minPricePerKm:number) => {
    setIsEditOpen(false)
    console.log(param,maxPricePerKm,minPricePerKm)
    if (param?.maxPricePerKm === maxPricePerKm && param?.minPricePerKm ===minPricePerKm) {
      return 0
    }
    const res = await updateVehicle({ id: param.id, body: { maxPricePerKm:maxPricePerKm, minPricePerKm:minPricePerKm } })
    console.log(res)
    if (res?.data?.success) {
      toast.success("Vehicle fee updated successfully")
    }
  }
  //-----------------------------------
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
              // <TableRow key={index} className=''>
              //   <TableCell className="font-medium">{vehicle.name}</TableCell>
              //   {/* <TableCell>
              //     <div className="flex items-center  gap-5">
              //       <div className="flex items-center">
              //         <span className="text-gray-500 text-sm mr-1">Min</span>
              //         <span className="font-medium bg-[#EBFBEF] p-2">{formatCurrency(vehicle.baseFare.min)}</span>
              //       </div>
              //       <div className="flex items-center">
              //         <span className="text-gray-500 text-sm mr-1 ">Max</span>
              //         <span className="font-medium bg-[#EBFBEF]  p-2">{formatCurrency(vehicle.baseFare.max)}</span>
              //       </div>
              //     </div>
              //   </TableCell> */}
              //   <TableCell>
              //     <div className="flex items-center  gap-5">
              //       <div className="flex items-center">
              //         <span className="text-gray-500 text-sm mr-1">Min</span>
              //          <div className="relative ">
              //             <span className={`absolute   top-1/2 -translate-y-1/2 text-gray-500 ${vehicle?.feeType === 'FIXED' ? 'right-3' : 'left-3'}`}>   {
              //               vehicle?.feeType !== 'FIXED' ?
              //                 <span className="w-full ">$</span>
              //                 :
              //                 <span className="w-full ">%</span>
              //             }</span>
              //             <input
              //               type="text"
              //               name='vehicleFee'
              //               // onChange={(e)=> onChangeInput(e?.target?.value)}
              //               className={` pl-5 pr-0 py-2 w-[70px] rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditOpen && editItem=== vehicle.id ? 'bg-white border-1 border-black' : 'bg-[#EBFBEF'} `}
              //               readOnly={isEditOpen && editItem=== vehicle.id ? false : true}
              //               defaultValue={vehicle?.fee}
              //             />
              //           </div>
              //       </div>
              //       <div className="flex items-center ">
              //         <span className="text-gray-500 text-sm mr-1">Max</span>
              //          <div className="relative ">
              //             <span className={`absolute   top-1/2 -translate-y-1/2 text-gray-500 ${vehicle?.feeType === 'FIXED' ? 'right-3' : 'left-3'}`}>   {
              //               vehicle?.feeType !== 'FIXED' ?
              //                 <span className="w-full ">$</span>
              //                 :
              //                 <span className="w-full ">%</span>
              //             }</span>
              //             <input
              //               type="text"
              //               name='vehicleFee'
              //               // onChange={(e)=> onChangeInput(e?.target?.value)}
              //               className={` pl-5 pr-0 py-2 w-[70px] rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditOpen && editItem=== vehicle.id ? 'bg-white border-1 border-black' : 'bg-[#EBFBEF'} `}
              //               readOnly={isEditOpen && editItem=== vehicle.id ? false : true}
              //               defaultValue={vehicle?.fee}
              //             />
              //           </div>
              //       </div>
              //     </div>
              //   </TableCell>
              //   <TableCell className="text-right">
              //     {/* <Button
              //       className="bg-green-500 hover:bg-green-600 text-black"
              //       onClick={() => handleChangeRate(rate.id)}
              //     >
              //       Change
              //     </Button> */}
              //      {isEditOpen && editItem === vehicle.id ? (
              //           <Button
              //           onClick={() => handleSaveEdit(vehicle,vehicleFee)}
              //           className="bg-green-500 hover:bg-green-600 text-white w-10 md:w-20"
              //         >
              //           Save
              //         </Button>
              //         ) : (
              //                 <Button
              //           onClick={() => handleEditClick(vehicle)}
              //           className="bg-green-500 hover:bg-green-600 text-white w-10 md:w-20"
              //         >
              //           Change
              //         </Button>
              //       )} 
                                    
              //   </TableCell>
              // </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
}

export default PriceTable