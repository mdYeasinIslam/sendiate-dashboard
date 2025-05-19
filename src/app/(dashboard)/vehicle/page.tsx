import VehicleTable from '@/components/DashboardComponent/vehiclePage/VehicleTable'
import PageWrapper from '@/components/PageWrapper'
import { VehicleType } from '@/type/vehicleType'
import React from 'react'

const vehicles: VehicleType[] = [
    {
        id: "01",
        serialNo: "01",
        image: "/images/vehicle-sedan.png",
        type: "Sedan",
        details:
            "Quick, small deliveries such as documents, small packages, and personal items. Airtight seal for items that easily fit in a standard car.",
    },
    {
        id: "02",
        serialNo: "02",
        image: "/images/vehicle-suv.png",
        type: "SUV",
        details:
            "Medium-sized deliveries including multiple packages, medium boxes, or bulkier items. Note: Offers more cargo space than a sedan with better protection for larger loads.",
    },
    {
        id: "03",
        serialNo: "03",
        image: "/images/vehicle-pickup.png",
        type: "Pick Up Truck",
        details:
            "Larger, heavier items like furniture, appliances, garden supplies and building materials. Note: Offers open-air transport - ideal for bulky items that don't need full enclosure.",
    },
    {
        id: "04",
        serialNo: "04",
        image: "/images/vehicle-cargo-van.png",
        type: "Cargo Van",
        details:
            "Enclosed transport of large deliveries that need protection from the weather or theft. Use case: Moves, business deliveries, multiple large boxes or furniture.",
        notes: "Note: Secure, weatherproof, and spacious.",
    },
    {
        id: "05",
        serialNo: "05",
        image: "/images/vehicle-box-truck-small.png",
        type: "Box Truck - small (10-14ft)",
        details:
            "Smaller commercial loads, apartment moves, or multiple large packages. Note: Compact enough for urban navigation, can fit furniture and appliances.",
    },
    {
        id: "06",
        serialNo: "06",
        image: "/images/vehicle-box-truck-medium.png",
        type: "Box Truck - medium (15-20ft)",
        details: "Full apartment or small office moves, mid-scale deliveries.",
        notes: "Note: Holds contents of 1-2 bedroom apartments or multiple pallets.",
    },
    {
        id: "07",
        serialNo: "07",
        image: "/images/vehicle-box-truck-large.png",
        type: "Box Truck - Large (21-26ft)",
        details: "Commercial-scale deliveries, warehouse loads, or large residential moves.",
        notes: "Note: High-volume capacity for freight, bulk orders, or equipment.",
    },
    {
        id: "08",
        serialNo: "08",
        image: "/images/vehicle-flatbed-truck.png",
        type: "Flatbed Truck",
        details:
            "Oversized, heavy, or irregularly shaped items such as machinery or construction materials. Note: Open deck allows for easy forklift loading and unloading. No enclosure.",
    },
    {
        id: "09",
        serialNo: "09",
        image: "/images/vehicle-refrigerated-truck.png",
        type: "Refrigerated Truck (Reefer)",
        details:
            "Temperature-sensitive goods like frozen food, pharmaceuticals, flowers, or perishable foods. Maintains cold-chain during transit.",
    },
]
const VehicleDashboard = () => {
  return (
   <section className='bg-[#F8F8F8]'>
         <header>
           <PageWrapper title="Vehicle" />
         </header>
         <main className='md:px-5'>
              <VehicleTable vehicles={vehicles} />
           {/* <CourierTable users={paginatedUsers}/> */}
            {/* <Pagination
           currentPage={currentPage}
           totalPages={totalPages}
           onPageChange={setCurrentPage}
         /> */}
         </main>
       </section>

  )
}

export default VehicleDashboard