import React from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Order } from '@/type/vehicleType';


const DetailsVehicleType = ({order}:{order:Order}) => {
  return (
     <AlertDialog>
      <AlertDialogTrigger>
         <p className='px-2 bg-[#E9E9EA] rounded-xl' >View Details</p>
      </AlertDialogTrigger>
    <AlertDialogContent>
      {/* Close Icon */}
      <button className="absolute top-4 right-4 text-green-400 hover:text-green-600">
        {/* Replace with your icon component */}
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <AlertDialogHeader>
        <AlertDialogTitle className="text-lg font-semibold text-gray-900 mb-4">Vehicle Info</AlertDialogTitle>
      </AlertDialogHeader>

      {/* Vehicle Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <div className="bg-green-50 rounded-md p-2 text-sm text-gray-800">{ order?.vehicleType}</div>
      </div>

      {/* Vehicle Make & Model */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Make</label>
        <div className="bg-green-50 rounded-md p-2 text-sm text-gray-800">Toyota</div>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
        <div className="bg-green-50 rounded-md p-2 text-sm text-gray-800">Corolla</div>
        </div>
      </div>

      {/* Year & Plate */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Year</label>
        <div className="bg-green-50 rounded-md p-2 text-sm text-gray-800">2019</div>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">License Plate Number</label>
        <div className="bg-green-50 rounded-md p-2 text-sm text-gray-800">1D23E</div>
        </div>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel className="px-12 py-3 rounded-sm bg-[#C2F3CD]">
        Close
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
      
  )
}

export default DetailsVehicleType