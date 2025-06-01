
import PriceTable from "@/components/DashboardComponent/PricingPage/PriceTable"
import PageWrapper from "@/components/PageWrapper"
import { VehicleRate } from "@/type/priceType"



export default function PricingDashboard() {
  
  return (
    <div className="bg-[#F8F8F8]">
      <PageWrapper title="Transaction"/>
        <main className="md:px-5">  
              
            <PriceTable/>
        </main>
    </div>
  )
}
