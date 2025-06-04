
import PriceTable from "@/components/DashboardComponent/PricingPage/PriceTable"
import PageWrapper from "@/components/PageWrapper"



export default function PricingDashboard() {
  
  return (
    <div className="bg-[#F8F8F8] h-full">
      <PageWrapper title="Prices"/>
        <main className="md:px-5">  
              
            <PriceTable/>
        </main>
    </div>
  )
}
