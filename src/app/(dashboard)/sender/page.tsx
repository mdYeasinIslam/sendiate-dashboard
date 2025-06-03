'use client'
import Table from '@/app/(dashboard)/sender/component/Table'
import LoadingSpinner from '@/app/loading';
import PageWrapper from '@/components/PageWrapper'
import { Pagination } from '@/components/shared/Pagination';
import { usePaginatedUsers } from '@/hooks/pagination/usePaginatedUsers';
import { useGetSenderStatsQuery } from '@/redux/services/Apis/senderPage/senderPageApi';
import { SenderType } from '@/type/SenderPagesType';
import React, { useState } from 'react'

type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: SenderType[]
};
 
const Sender = () => {
    const [pageForPagination,setPageForPagination] =useState(1)
    const { data, error, isLoading } = useGetSenderStatsQuery({page:pageForPagination,limit:10}) as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean };
    // console.log(data?.data)
    
    const [tableData, setTableData] = useState<SenderType[]>(data?.data || []);

    React.useEffect(() => {
      if (data?.data) {
        setTableData(data.data);
      }
    }, [data?.data]);
    console.log(tableData)
    
  const [currentPage, setCurrentPage] = useState(data?.meta?.page || 1);
  // const currentPage = data?.meta?.page || 1
    const itemsPerPage = 1;
    
    const { paginatedData, totalPages } = usePaginatedUsers(tableData, pageForPagination, itemsPerPage);

    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>An error occurred while fetching data.</div>;
  return (
    <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Sender" />
      </header>
      <main className=' md:px-5'>

        <Table senders={tableData} />
         <Pagination
                currentPage={pageForPagination}
                totalPages={data?.meta?.totalPage || 1}
          onPageChange={setCurrentPage}
          setPageForPagination={setPageForPagination}
              />
      </main>
    </section>
  )
}

export default Sender