
import type React from "react"
import PageWrapper from "@/components/PageWrapper"
import NotificationForm from "@/components/DashboardComponent/notificationForm/NotificationForm"


export default function NotificationDashboard() {
    
    return (
      <section className="bg-[#F8F8F8]">
                <PageWrapper title="Notification"/>
    
       <main>
            <NotificationForm />
       </main>
      </section>
  )
}
