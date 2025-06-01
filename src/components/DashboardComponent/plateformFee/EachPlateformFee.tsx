'use client'
import { Button } from '@/components/ui/button'
import { useGetVehicleByIdQuery, useUpdateVehicleMutation } from '@/redux/services/Apis/vehicleApi/vehiclePageApi'
import { VehicleFeeType } from '@/type/platformPageTypes'
import React, { use } from 'react'

type Prop = {
    vehicle: VehicleFeeType
    editItem: string
    isEditOpen: boolean
    handleEditClick: (vehicle: VehicleFeeType) => void
    handleSaveEdit: (vehicle: VehicleFeeType,vhecleFee:number) => void

}

const EachPlateformFee = ({ vehicle, isEditOpen, editItem, handleEditClick, handleSaveEdit }: Prop) => {
  const [feeType, setFeeType] = React.useState(vehicle?.feeType)
  const [vehicleFee, setVehicleFee] = React.useState(vehicle?.fee)
  
  const onChangeInput = async (vehicleFee: string) => {
    setVehicleFee(Number(vehicleFee))

  }

    return (
      <tr key={vehicle.id} className=" border-b border-gray-100 hover:bg-gray-50 ">
                <td className=" py-3  text-gray-800">{vehicle?.name}</td>
                <td className="py-3 ">
                   {/* Input field (price) */}
                  <div className="flex items-center justify-start space-x-2">
                     <div className="flex items-center space-x-2">
                        <div className="relative ">
                          <span className={`absolute   top-1/2 -translate-y-1/2 text-gray-500 ${vehicle?.feeType === 'FIXED' ? 'right-3' : 'left-3'}`}>   {
                            vehicle?.feeType !== 'FIXED' ?
                              <span className="w-full ">$</span>
                              :
                              <span className="w-full ">%</span>
                          }</span>
                          <input
                            type="text"
                            name='vehicleFee'
                            onChange={(e)=> onChangeInput(e?.target?.value)}
                            className={` pl-5 pr-0 py-2 w-[70px] rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditOpen && editItem=== vehicle.id ? 'bg-gwhite border-1 border-black' : 'bg-gray-300'} `}
                            readOnly={isEditOpen && editItem=== vehicle.id ? false : true}
                            defaultValue={vehicle?.fee}
                          />
                        </div>
                    
                          <div className="bg-gray-200 px-2 py-2 rounded text-gray-600 text-sm">{vehicle?.feeType}</div>
                      </div>
                  </div>
                </td>
                <td className=" md:py-3   text-right ">
                  {isEditOpen && editItem === vehicle.id ? (
                      <Button
                    onClick={() => handleSaveEdit(vehicle,vehicleFee)}
                    className="bg-green-500 hover:bg-green-600 text-white w-10 md:w-20"
                  >
                   Save
                  </Button>
                  ) : (
                         <Button
                    onClick={() => handleEditClick(vehicle)}
                    className="bg-green-500 hover:bg-green-600 text-white w-10 md:w-20"
                  >
                   Edit
                  </Button>
                   )} 
                  
                </td>
              </tr>
  )
}

export default EachPlateformFee