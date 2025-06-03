'use client'
import LoadingSpinner from "@/app/loading"
import FeedbackTable from "@/components/DashboardComponent/feedbackPage/FeedbackTable"
import PageWrapper from "@/components/PageWrapper"
import { Pagination } from "@/components/shared/Pagination"
import { usePaginatedUsers } from "@/hooks/pagination/usePaginatedUsers"
import { useGetFeedbackStatsQuery } from "@/redux/services/Apis/feedbackPageAPis/feedbackPageApi"
import { FeedbackType } from "@/type/homePageTypes"
import { useState } from "react"



type FeedbackStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: FeedbackType[]
};
export default function FeedbackDashboard() {
const {data, error, isLoading} = useGetFeedbackStatsQuery({ userRole: "Sender" }) as { data?: FeedbackStatsResponse, error?: unknown, isLoading: boolean }
// console.log(data?.data)
      const feedbackData = data?.data || [];

      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
     
      const { paginatedData, totalPages } = usePaginatedUsers<FeedbackType>(feedbackData, currentPage, itemsPerPage);
     
   if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>An error occurred while fetching data.</div>;
  return (
      <main className="bg-[#F8F8F8] min-h-screen">
          <PageWrapper title="Feedback"/>
        <section className=" md:px-6 ">
            <FeedbackTable generateFeedbackData={paginatedData } />
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
              />
        </section>
    </main>
  )
}
