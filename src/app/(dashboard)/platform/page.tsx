import PlatformFeeTable from "@/components/DashboardComponent/plateformFee/PlatformFeeTable"
import PageWrapper from "@/components/PageWrapper"

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

export default function Platform() {
  

  return (
    <main>
      <PageWrapper title="Platform Fee"/>
      <section className="md:px-6">
        <PlatformFeeTable  />
      </section>
   </main>
  )
}
