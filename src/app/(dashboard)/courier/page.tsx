'use client'
import PageWrapper from '@/components/PageWrapper'
import React, { useState } from 'react'
import { CourierTable } from '@/components/DashboardComponent/courierPage/Table';
import { usePaginatedUsers } from '@/hooks/pagination/usePaginatedUsers';
import { Pagination } from '@/components/shared/Pagination';
import { useGetCourierStatsQuery } from '@/redux/services/Apis/courierApi/courierPageApi';
import { CourierUserDetails } from '@/type/courierPageTypes';
import LoadingSpinner from '@/app/loading';


type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: CourierUserDetails[]
};

const DasboaredCourierpage = () => {
    // Fetching courier stats
    const { data, error, isLoading } = useGetCourierStatsQuery() as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean };
    const tableData = data?.data || [];
  console.log(tableData)
    // Pagination state
    const [currentPage, setCurrentPage] = useState(data?.meta?.page || 1);
    const itemsPerPage = data?.meta?.limit || 10;
    const { paginatedData, totalPages } = usePaginatedUsers<CourierUserDetails>(tableData, currentPage, itemsPerPage);


    if (isLoading) return <div><LoadingSpinner /></div>
    if (error) return <div>An Error occurred</div>

  return (
      <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Courier" />
      </header>
      <main className='md:px-5'>

        <CourierTable users={paginatedData} />
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </main>
    </section>
  )
}

export default DasboaredCourierpage