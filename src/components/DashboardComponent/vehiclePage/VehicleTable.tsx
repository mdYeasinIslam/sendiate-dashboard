"use client"

import React from "react"
import Image from "next/image"
import { VehicleType } from "@/type/vehicleType"

export default function VehicleTable({vehicles}:{vehicles:VehicleType[]}) {

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
            <div className="px-2 flex items-center text-sm">{vehicle.serialNo}</div>
            <div className="px-2">
              <div className="w-20 h-14 relative">
                <Image
                  src={ "/images/vehicle.png"}
                  alt={vehicle.type}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="px-2 flex items-center text-sm font-medium">{vehicle.type}</div>
            <div className="px-2 col-span-2 text-sm text-gray-600">
              <p className="leading-relaxed">{vehicle.details}</p>
              {vehicle.notes && <p className="mt-1 italic text-gray-500">{vehicle.notes}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
