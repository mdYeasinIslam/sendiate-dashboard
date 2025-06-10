'use client'
import { Button } from '@/components/ui/button'
import { VehicleFeeType } from '@/type/platformPageTypes'
import React from 'react'

type Prop = {
    vehicle: VehicleFeeType
    editItem: string
    isEditOpen: boolean
    handleEditClick: (vehicle: VehicleFeeType) => void
    handleSaveEdit?: (vehicle: VehicleFeeType, vhecleFee: number,feeType:"PERCENTAGE" | "FIXED") => void
     handleSaveUpdatedPrices?:(vehicle: VehicleFeeType,maxPrice:number,minPrice:number) =>void
    page?:string

}

const EachPlateformFee = ({ vehicle, isEditOpen, editItem, handleEditClick, handleSaveEdit,handleSaveUpdatedPrices, page }: Prop) => {
  //state for PlatformFee Page 
  // console.log(vehicle)
  const [vehicleFee, setVehicleFee] = React.useState(vehicle?.fee)
  const [feeType,setFeeType] =React.useState(vehicle?.feeType)
  //state for Pricing page
  const [maxPrice,setMaxPrice] = React.useState(vehicle?.maxPricePerKm)
  const [minPrice,setMinPrice] = React.useState(vehicle?.minPricePerKm)

  //PlatformFee page
  const onChangeInput = async (vehicleFee: string,feeType:string) => {
    setVehicleFee(Number(vehicleFee))
    // console.log(feeType)

  }
    return (
      <tr key={vehicle.id} className=" border-b border-gray-100 hover:bg-gray-50 ">
                <td className=" py-3  text-gray-800">{vehicle?.name}</td>
                <td className="py-3 ">
                   {/* Input field (price) */}
                   {
                    page ==='PricePage'?
                    <>
                    {/*-----------START---------------------- Pricing Page Section ----------------------------------- */}
                    <div className="flex items-center  gap-5">
                     <div className="flex items-center gap-2">
                       <p className="text-gray-500 text-sm mr-1">Min</p>
                        <div className="relative ">
                          <span className={`absolute   top-1/2 left-3 -translate-y-1/2 text-gray-500 `}>   
                           <span className="w-full ">$</span>
                           </span>
                           <input
                             type="text"
                             name='vehicleFee'
                              onChange={(e)=> setMinPrice(Number(e?.target?.value))}
                             className={` pl-5 pr-0 py-2 w-[70px] rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditOpen && editItem=== vehicle.id ? 'bg-white border-1 border-black' : 'bg-[#EBFBEF]'} `}
                             readOnly={isEditOpen && editItem=== vehicle.id ? false : true}
                             defaultValue={vehicle?.minPricePerKm}
                           />
                         </div>
                     </div>
                     <div className="flex items-center gap-2">
                       <p className="text-gray-500 text-sm mr-1">Max</p>
                        <div className="relative ">
                           <span className={`absolute   top-1/2 left-3 -translate-y-1/2 text-gray-500 `}> 
                           <span className="w-full ">$</span>
                           </span>
                           <input
                             type="text"
                             name='maxVehicleFee'
                              onChange={(e)=> setMaxPrice(Number(e?.target?.value))}
                             className={` pl-5 pr-0 py-2 w-[70px] rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditOpen && editItem=== vehicle.id ? 'bg-white border-1 border-black' : 'bg-[#EBFBEF]'} `}
                             readOnly={isEditOpen && editItem=== vehicle.id ? false : true}
                             defaultValue={vehicle?.maxPricePerKm}
                           />
                         </div>
                     </div>
                   </div>
                    {/*-----------END---------------------- Pricing Page Section ----------------------------------- */}

                    </>
                    :
                    <>
                    {/* ------START-----------------------PlatformFee Page section ---------------------------------------- */}
                  <div className="flex items-center justify-start space-x-2">
                     <div className="flex items-center space-x-2">
                        <div className="relative ">
                          <span className={`absolute   top-1/2 -translate-y-1/2 text-black font-semibold ${feeType  !== 'FIXED' ? 'right-5' : 'left-6'}`}>   {
                            feeType !== 'FIXED' ?
                            <span className="w-full  ">%</span>
                            :
                            <span className="w-full  ">$</span>
                          }</span>
                          {/* <input
                            type="text"
                            name='vehicleFee'
                            onChange={(e)=> onChangeInput(e?.target?.value,vehicle?.feeType)}
                            className={`${vehicle?.fee <10 ?'px-7':''} ${vehicle?.fee >10 ?' px-0':'px-0'} ${vehicle?.feeType=='FIXED'?'px-8':'px-5'}  pr-0 py-2 w-[70px] rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditOpen && editItem=== vehicle.id ? 'bg-gwhite border-1 border-black' : 'bg-gray-300'} `}
                            readOnly={isEditOpen && editItem=== vehicle.id ? false : true}
                            defaultValue={vehicle?.fee}
                          /> */}
                      <input
                        type="text"
                        name="vehicleFee"
                        defaultValue={isEditOpen ? vehicleFee : vehicle?.fee}
                        onChange={(e) => onChangeInput(e.target.value, vehicle?.feeType)}
                        className={`
                          ${feeType === "FIXED" && vehicle?.fee > 100 ? "pl-8" : "pl-3"} 
                          ${feeType === "PERCENTAGE" && vehicle?.fee >= 10 ? "pr-6" : "pr-3"}
                          py-2 
                          min-w-[80px] 
                          max-w-[120px] 
                          w-auto
                          rounded-md 
                          text-black 
                          text-center
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-blue-500 
                          ${isEditOpen && editItem === vehicle.id ? "bg-white border border-black cursor-pointer" : "bg-gray-300"}
                        `}
                        readOnly={isEditOpen && editItem === vehicle.id ? false : true}
                        style={{
                          width: `${Math.max(80, (vehicleFee?.toString().length || 1) * 12 + (feeType === "FIXED" ? 32 : 30))}px`,
                          paddingLeft: feeType === "FIXED" && vehicle?.fee > 100 ? "1.5rem" : "0.75rem", // Ensure a 5px gap for larger values
                        }}
                      />

                        </div>
                    
                          <div className="relative">
                            <select
                              value={feeType? feeType:vehicle?.feeType}
                              onChange={(e) => setFeeType(e.target.value as "PERCENTAGE" | "FIXED")} // Add your handler here if you want to update feeType
                              className={`px-2 py-2 rounded text-black text-sm appearance-none focus:outline-none  ${isEditOpen && editItem === vehicle.id ? 'bg-gwhite border-1 border-black cursor-pointer' : 'bg-gray-300'}`}
                              style={{ width: '115px' }}
                              disabled={isEditOpen && editItem === vehicle.id ? false : true}
                            >
                              <option value="FIXED">FIXED</option>
                              <option value="PERCENTAGE">PERCENTAGE</option>
                            </select>
                            <span className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 ${isEditOpen && editItem === vehicle.id ? '' : 'hidden'}`}>
                              <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </div>
                      </div>
                  </div>
                   {/* -----END------------------------PlatformFee Page section ---------------------------------------- */}
                    </>
                   }
                </td>
                <td className=" md:py-3   text-right ">
                  {page ==='PlatformFeePage' &&<>
                    {isEditOpen && editItem === vehicle.id? (
                       <Button
                     onClick={() => handleSaveEdit?.(vehicle,vehicleFee,feeType)}
                     className="bg-green-500 hover:bg-green-600 text-white w-10 md:w-20 cursor-pointer"
                   >
                    Save
                   </Button>
                   ) : (
                          <Button
                     onClick={() => handleEditClick(vehicle)}
                     className="bg-green-500 hover:bg-green-600 text-white w-10 md:w-20 cursor-pointer"
                   >
                    Edit
                   </Button>
                    )} 
                  </>
                   }
                  {page ==='PricePage' &&<>
                    {isEditOpen && editItem === vehicle.id? (
                       <Button
                     onClick={() => handleSaveUpdatedPrices?.(vehicle, maxPrice, minPrice)}
                     
                     className="bg-green-500 hover:bg-green-600 text-white w-10 md:w-20 cursor-pointer"
                   >
                    Save
                   </Button>
                   ) : (
                          <Button
                     onClick={() => handleEditClick(vehicle)}
                     className="bg-green-500 hover:bg-green-600 text-white w-10 md:w-20 cursor-pointer"
                   >
                    Change
                   </Button>
                    )} 
                  </>
                   }
                   
                 
                  
                </td>
              </tr>
  )
}

export default EachPlateformFee