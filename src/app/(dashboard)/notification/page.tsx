
import type React from "react"
import PageWrapper from "@/components/PageWrapper"
import NotificationForm from "@/components/DashboardComponent/notificationForm/NotificationForm"

type RecipientOption = {
  value: string
  label: string
}

const recipientOptions: RecipientOption[] = [
  { value: "all", label: "All" },
  { value: "admins", label: "Admins" },
  { value: "drivers", label: "Drivers" },
  { value: "customers", label: "Customers" },
  { value: "new-users", label: "New Users" },
]

export default function NotificationDashboard() {
 
    return (
      <section className="bg-[#F8F8F8]">
                <PageWrapper title="Notification"/>
    
       <main>
            <NotificationForm recipientOptions={recipientOptions} />
       </main>
      </section>
  )
}
