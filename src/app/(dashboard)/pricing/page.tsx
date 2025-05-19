
import PriceTable from "@/components/DashboardComponent/PricingPage/PriceTable"
import PageWrapper from "@/components/PageWrapper"
import { VehicleRate } from "@/type/priceType"


const initialVehicleRates: VehicleRate[] = [
  {
    id: "1",
    vehicleType: "Sedan",
    baseFare: {
      min: 200,
      max: 700,
    },
    perKmRate: {
      min: 0.5,
      max: 2.0,
    },
  },
  {
    id: "2",
    vehicleType: "SUV",
    baseFare: {
      min: 200,
      max: 800,
    },
    perKmRate: {
      min: 0.5,
      max: 3.0,
    },
  },
  {
    id: "3",
    vehicleType: "Pickup Truck",
    baseFare: {
      min: 300,
      max: 1000,
    },
    perKmRate: {
      min: 0.5,
      max: 4.0,
    },
  },
  {
    id: "4",
    vehicleType: "Cargo Van",
    baseFare: {
      min: 500,
      max: 1500,
    },
    perKmRate: {
      min: 0.5,
      max: 5.0,
    },
  },
  {
    id: "5",
    vehicleType: "Box Truck",
    baseFare: {
      min: 800,
      max: 2500,
    },
    perKmRate: {
      min: 0.5,
      max: 6.0,
    },
  },
  {
    id: "6",
    vehicleType: "Flatbed Truck",
    baseFare: {
      min: 1000,
      max: 3500,
    },
    perKmRate: {
      min: 0.5,
      max: 7.0,
    },
  },
  {
    id: "7",
    vehicleType: "Refrigerated Truck (Reefer)",
    baseFare: {
      min: 1000,
      max: 3500,
    },
    perKmRate: {
      min: 0.5,
      max: 8.0,
    },
  },
]

export default function PricingDashboard() {
 

  return (
    <div className="bg-[#F8F8F8]">
      <PageWrapper title="Transaction"/>
        <main className="md:px-5">  
              
            <PriceTable initialVehicleRates={initialVehicleRates}/>
        </main>
    </div>
  )
}
