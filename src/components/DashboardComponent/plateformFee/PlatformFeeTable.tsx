"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type PriceType = "fixed" | "percentage"

type VehiclePricing = {
  id: string
  vehicleType: string
  priceValue: number
  priceType: PriceType
  currency: string
}

const initialVehiclePricing: VehiclePricing[] = [
  { id: "1", vehicleType: "Sedan", priceValue: 1, priceType: "fixed", currency: "USD" },
  { id: "2", vehicleType: "SUV", priceValue: 1, priceType: "fixed", currency: "USD" },
  { id: "3", vehicleType: "Pick Up Truck", priceValue: 1, priceType: "percentage", currency: "USD" },
  { id: "4", vehicleType: "Cargo Van", priceValue: 1, priceType: "percentage", currency: "USD" },
  { id: "5", vehicleType: "Box Truck (10-14 ft)", priceValue: 1, priceType: "percentage", currency: "USD" },
  { id: "6", vehicleType: "Box Truck (15-20 ft)", priceValue: 1, priceType: "percentage", currency: "USD" },
  { id: "7", vehicleType: "Box Truck (21-25 ft)", priceValue: 1, priceType: "percentage", currency: "USD" },
  { id: "8", vehicleType: "Flatbed Truck", priceValue: 1, priceType: "percentage", currency: "USD" },
  { id: "9", vehicleType: "Refrigerated Truck (Reefer)", priceValue: 1, priceType: "percentage", currency: "USD" },
]

export default function PlatformFeeTable({initialVehiclePricing}:{initialVehiclePricing:VehiclePricing[]}) {
  const [vehiclePricing, setVehiclePricing] = useState<VehiclePricing[]>(initialVehiclePricing)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentVehicle, setCurrentVehicle] = useState<VehiclePricing | null>(null)
  const [editValue, setEditValue] = useState<number>(0)
  const [editType, setEditType] = useState<PriceType>("fixed")

  const handleEditClick = (vehicle: VehiclePricing) => {
    setCurrentVehicle(vehicle)
    setEditValue(vehicle.priceValue)
    setEditType(vehicle.priceType)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (!currentVehicle) return

    const updatedPricing = vehiclePricing.map((vehicle) => {
      if (vehicle.id === currentVehicle.id) {
        return {
          ...vehicle,
          priceValue: editValue,
          priceType: editType,
        }
      }
      return vehicle
    })

    setVehiclePricing(updatedPricing)
    setIsEditDialogOpen(false)
    setCurrentVehicle(null)
  }

  const formatPrice = (vehicle: VehiclePricing) => {
    if (vehicle.priceType === "fixed") {
      return `$${vehicle.priceValue}`
    } else {
      return `${vehicle.priceValue}%`
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Vehicle Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {vehiclePricing.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">{vehicle.vehicleType}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 px-3 py-1 rounded text-gray-800 font-medium">
                      {formatPrice(vehicle)}
                    </div>
                    <div className="bg-gray-200 px-2 py-1 rounded text-gray-600 text-sm">{vehicle.currency}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button
                    onClick={() => handleEditClick(vehicle)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Vehicle Pricing</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle-type" className="text-right">
                Vehicle
              </Label>
              <div className="col-span-3 font-medium">{currentVehicle?.vehicleType}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price-type" className="text-right">
                Price Type
              </Label>
              <Select
                value={editType}
                onValueChange={(value) => setEditType(value as PriceType)}
              >
                <SelectTrigger id="price-type" className="col-span-3">
                  <SelectValue placeholder="Select price type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price-value" className="text-right">
                Value
              </Label>
              <Input
                id="price-value"
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(Number(e.target.value))}
                className="col-span-3"
                min={0}
                step={editType === "percentage" ? 0.1 : 1}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-600 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
