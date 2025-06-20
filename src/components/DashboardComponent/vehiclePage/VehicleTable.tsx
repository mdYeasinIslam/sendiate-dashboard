"use client"

import React from "react"
import Image from "next/image"
import { VehicleType } from "@/type/vehicleType"
import { Car } from "lucide-react"

export default function VehicleTable({vehicles}:{vehicles:VehicleType[]}) {
    // console.log(vehicles)
  return (
       <div className="w-full ">

      <div className="grid grid-cols-5 bg-gray-50 p-3 rounded-t-lg border border-gray-200 font-medium text-gray-600 text-sm">
        <div className="px-2">Serial No.</div>
        <div className="px-2">Vehicle Image</div>
        <div className="px-2">Vehicle Type</div>
        <div className="px-2 col-span-2">Details</div>
      </div>

      <div className="border-x border-gray-200">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={`grid grid-cols-5 p-4 border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
          >
            <div className="px-2 flex items-center text-sm">{index + 1}</div>
            <div className="px-2">
              <div className="w-20 h-14 relative">
                {
                  vehicle?.image ?
                  <Image
                    src={ vehicle?.image}
                    alt={vehicle.name}
                    fill
                    className="object-contain"
                  />
                  :
                  <Car className="w-10 h-10"/>
                }
              </div>
            </div>
            <div className="px-2 flex items-center text-sm font-medium">{vehicle?.name}</div>
            <div className="px-2 col-span-2 text-sm text-gray-600">
              <p className="leading-relaxed">{vehicle?.description}</p>
              {/* {vehicle.notes && <p className="mt-1 italic text-gray-500">{vehicle.notes}</p>} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
