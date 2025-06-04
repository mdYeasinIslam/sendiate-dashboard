'use client'
import PageWrapper from '@/components/PageWrapper'
import React, { useState } from 'react'
import { CourierTable } from '@/components/DashboardComponent/courierPage/Table';
import { Pagination } from '@/components/shared/Pagination';
import { useGetCourierStatsQuery } from '@/redux/services/Apis/courierApi/courierPageApi';
import { CourierUserDetails } from '@/type/courierPageTypes';
import LoadingSpinner from '@/app/loading';


type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: CourierUserDetails[]
};

const DasboaredCourierpage = () => {
      const [pageForPagination,setPageForPagination] =useState(1)
  
    // Fetching courier stats
    const { data, error, isLoading } = useGetCourierStatsQuery({page:pageForPagination,limit:10}) as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean };
  
      const [tableData, setTableData] = useState<CourierUserDetails[]>(data?.data || []);
  
      React.useEffect(() => {
        if (data?.data) {
          setTableData(data.data);
        }
      }, [data?.data]);


    if (isLoading) return <div><LoadingSpinner /></div>
    if (error) return <div>An Error occurred</div>

  return (
      <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Courier" />
      </header>
      <main className='md:px-5'>

        <CourierTable users={tableData} />
        <Pagination
        currentPage={pageForPagination}
        totalPages={data?.meta?.totalPage || 1}
          setPageForPagination={setPageForPagination}
      />
      </main>
    </section>
  )
}

export default DasboaredCourierpage