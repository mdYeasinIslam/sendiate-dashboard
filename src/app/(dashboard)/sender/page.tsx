'use client'
import Table from '@/app/(dashboard)/sender/component/Table'
import LoadingSpinner from '@/app/loading';
import PageWrapper from '@/components/PageWrapper'
import { Pagination } from '@/components/shared/Pagination';
import { useUpdateCourierStatusMutation } from '@/redux/services/Apis/courierApi/courierPageApi';
import { useGetSenderStatsQuery } from '@/redux/services/Apis/senderPage/senderPageApi';
import { SenderType } from '@/type/SenderPagesType';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: SenderType[]
};
 
const Sender = () => {
  const [pageForPagination, setPageForPagination] = useState(1)
  const [searchTerm,setSearchTerm] = useState('')
  const { data, error, isLoading ,refetch} = useGetSenderStatsQuery({ page: pageForPagination, limit: 10,searchTerm }) as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean ,refetch:()=>void};
    const [updateSenderStatus] = useUpdateCourierStatusMutation()
  const senderData = data?.data || []
  const [tableData, setTableData] = useState<SenderType[]>(senderData);
  const [reRender, setReRender] = useState(false)
   
    useEffect(() => {
      if (senderData?.length || JSON.stringify(senderData) !== JSON.stringify(tableData)) {
        setTableData(senderData);
      }
    }, [senderData,tableData]);
    
   const handleUpdateStatus = async(id:string,status:string,sender:SenderType) => {
        setReRender(true)
        if (sender.status === status) {
          return 0
        }
        const res = await updateSenderStatus({ id, body: { status } })
        if (res?.data?.success) {
         
          refetch()
          toast.success("Sender status updated successfully") 
          setReRender(false)
        }
    }
  
  
  
    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>An error occurred while fetching data.</div>;
  return (
    <section className='bg-[#F8F8F8] h-full mb-10'>
      <header>
        <PageWrapper title="Sender" />
      </header>
      <main className={`relative md:px-5 ${reRender?'opacity-60':''}`}>
        {
          reRender && <div className='absolute top-[0%] left-[45%]'> <LoadingSpinner/></div> 
        }
        <Table senders={tableData} handleUpdateStatus={handleUpdateStatus} setSearchTerm={setSearchTerm} />
         <Pagination
                currentPage={pageForPagination}
                totalPages={data?.meta?.totalPage || 1}
                setPageForPagination={setPageForPagination}
              />
      </main>
    </section>
  )
}

export default Sender