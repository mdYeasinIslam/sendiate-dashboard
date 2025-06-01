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
