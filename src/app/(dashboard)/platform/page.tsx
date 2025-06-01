import PlatformFeeTable from "@/components/DashboardComponent/plateformFee/PlatformFeeTable"
import PageWrapper from "@/components/PageWrapper"


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
