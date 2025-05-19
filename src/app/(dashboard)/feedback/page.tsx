'use client'
import FeedbackTable from "@/components/DashboardComponent/feedbackPage/FeedbackTable"
import PageWrapper from "@/components/PageWrapper"
import { Pagination } from "@/components/shared/Pagination"
import { usePaginatedUsers } from "@/hooks/pagination/usePaginatedUsers"
import { FeedbackEntry } from "@/type/feedbackType"
import { useState } from "react"


// Generate fake data
const generateFeedbackData: FeedbackEntry[] = [
    {
        id: 1,
        date: "15 June 2025",
        type: "Sender",
        name: "Sarah Gomez",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "sarah.gomez@example.com",
        phone: "+1 234 567 8901",
        feedback: "The interface is clean and easy to navigate. Love the minimal design!",
        starred: true
    },
    {
        id: 2,
        date: "14 June 2025",
        type: "Receiver",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "michael.chen@example.com",
        phone: "+1 415 678 9012",
        feedback: "Very intuitive platform. The tracking feature works perfectly for my deliveries.",
        starred: false
    },
    {
        id: 3,
        date: "14 June 2025",
        type: "Sender",
        name: "Jessica Williams",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "j.williams@example.com",
        phone: "+1 312 456 7890",
        feedback: "Great experience overall. Would recommend to colleagues for business shipping needs.",
        starred: true
    },
    {
        id: 4,
        date: "13 June 2025",
        type: "Admin",
        name: "Robert Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "robert.j@example.com",
        phone: "+1 702 345 6789",
        feedback: "The admin dashboard provides excellent oversight. Could use more export options.",
        starred: false
    },
    {
        id: 5,
        date: "12 June 2025",
        type: "Receiver",
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "emma.r@example.com",
        phone: "+1 213 456 7890",
        feedback: "Delivery notifications are timely and accurate. Very satisfied with the service.",
        starred: false
    },
    {
        id: 6,
        date: "11 June 2025",
        type: "Sender",
        name: "David Kim",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "david.kim@example.com",
        phone: "+1 206 789 0123",
        feedback: "The pricing calculator is extremely helpful. Makes budgeting for shipments much easier.",
        starred: true
    },
    {
        id: 7,
        date: "10 June 2025",
        type: "Receiver",
        name: "Sophia Martinez",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "sophia.m@example.com",
        phone: "+1 305 678 9012",
        feedback: "Package arrived in perfect condition. The real-time tracking was very reassuring.",
        starred: false
    },
    {
        id: 8,
        date: "9 June 2025",
        type: "Sender",
        name: "James Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "j.wilson@example.com",
        phone: "+1 617 890 1234",
        feedback: "The bulk shipping option saved me a lot of time. Would like to see more template options.",
        starred: false
    },
    {
        id: 9,
        date: "8 June 2025",
        type: "Admin",
        name: "Olivia Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "olivia.t@example.com",
        phone: "+1 404 567 8901",
        feedback: "User management features are comprehensive. The permission system works well for our team.",
        starred: true
    },
    {
        id: 10,
        date: "7 June 2025",
        type: "Receiver",
        name: "Daniel Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "d.brown@example.com",
        phone: "+1 512 678 9012",
        feedback: "Delivery was faster than expected. Driver was professional and courteous.",
        starred: false
    },
    {
        id: 11,
        date: "6 June 2025",
        type: "Sender",
        name: "Ava Garcia",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "ava.garcia@example.com",
        phone: "+1 718 234 5678",
        feedback: "The label printing feature is a game-changer. So much easier than my previous solution.",
        starred: false
    },
    {
        id: 12,
        date: "5 June 2025",
        type: "Receiver",
        name: "Noah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "noah.m@example.com",
        phone: "+1 619 345 6789",
        feedback: "Appreciate the eco-friendly packaging option. Aligns with our company values.",
        starred: true
    },
    {
        id: 13,
        date: "4 June 2025",
        type: "Admin",
        name: "Isabella Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "i.davis@example.com",
        phone: "+1 303 456 7890",
        feedback: "The analytics dashboard provides valuable insights. Would like more customizable reports.",
        starred: false
    },
    {
        id: 14,
        date: "3 June 2025",
        type: "Sender",
        name: "Ethan Anderson",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "ethan.a@example.com",
        phone: "+1 408 567 8901",
        feedback: "International shipping options are excellent. Documentation process is straightforward.",
        starred: false
    },
    {
        id: 15,
        date: "2 June 2025",
        type: "Receiver",
        name: "Mia Thompson",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "mia.t@example.com",
        phone: "+1 214 678 9012",
        feedback: "The signature confirmation feature gives me peace of mind for valuable shipments.",
        starred: true
    },
    {
        id: 16,
        date: "1 June 2025",
        type: "Sender",
        name: "Alexander White",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "alex.w@example.com",
        phone: "+1 503 789 0123",
        feedback: "Customer service was exceptional when I needed help with a complex shipment.",
        starred: false
    },
    {
        id: 17,
        date: "31 May 2025",
        type: "Admin",
        name: "Charlotte Harris",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "charlotte.h@example.com",
        phone: "+1 773 890 1234",
        feedback: "The audit log feature is incredibly useful for compliance tracking and troubleshooting.",
        starred: false
    },
    {
        id: 18,
        date: "30 May 2025",
        type: "Receiver",
        name: "Benjamin Clark",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "ben.clark@example.com",
        phone: "+1 615 901 2345",
        feedback: "Delivery instructions were followed perfectly. Driver went above and beyond.",
        starred: true
    },
    {
        id: 19,
        date: "29 May 2025",
        type: "Sender",
        name: "Amelia Lewis",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "amelia.l@example.com",
        phone: "+1 612 345 6789",
        feedback: "The mobile app makes it easy to manage shipments on the go. Great user experience.",
        starred: false
    },
    {
        id: 20,
        date: "28 May 2025",
        type: "Receiver",
        name: "William Lee",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "william.lee@example.com",
        phone: "+1 415 456 7890",
        feedback: "Package arrived earlier than estimated. Tracking updates were frequent and accurate.",
        starred: false
    }
];

export default function FeedbackDashboard() {
      const [currentPage, setCurrentPage] = useState(1);
       const itemsPerPage = 10;
     
       const { paginatedUsers, totalPages } = usePaginatedUsers<FeedbackEntry>(generateFeedbackData, currentPage, itemsPerPage);
     

  return (
      <main className="bg-[#F8F8F8]">
          <PageWrapper title="Feedback"/>
        <section className=" md:px-6">
            <FeedbackTable generateFeedbackData={paginatedUsers } />
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
              />
        </section>
    </main>
  )
}
