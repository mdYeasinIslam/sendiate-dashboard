'use client'
import Table from '@/app/(dashboard)/sender/component/Table'
import LoadingSpinner from '@/app/loading';
import PageWrapper from '@/components/PageWrapper'
import { Pagination } from '@/components/shared/Pagination';
import { useUpdateCourierStatusMutation } from '@/redux/services/Apis/courierApi/courierPageApi';
import { useGetSenderStatsQuery } from '@/redux/services/Apis/senderPage/senderPageApi';
import { SenderType } from '@/type/SenderPagesType';
import React, { useState } from 'react'
import { toast } from 'sonner';

type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: SenderType[]
};
 
const Sender = () => {
    const [pageForPagination,setPageForPagination] =useState(1)
  const { data, error, isLoading } = useGetSenderStatsQuery({ page: pageForPagination, limit: 10 }) as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean };
    const [updateSenderStatus] = useUpdateCourierStatusMutation()
  const senderData = data?.data || []
  const [tableData, setTableData] = useState<SenderType[]>(senderData);
  const [reRender, setReRender] = React.useState(true)
   
    

    React.useEffect(() => {
      if (senderData?.length || JSON.stringify(senderData) !== JSON.stringify(tableData)) {
        setTableData(senderData);
      }
    }, [senderData,reRender,tableData]);
    
   const handleUpdateStatus = async(id:string,status:string,sender:SenderType) => {
        console.log(status)
        if (sender.status === status) {
          return 0
        }

       
        const res = await updateSenderStatus({ id, body: { status } })
       
        if (res?.data?.success) {
            window.location.reload();
            
                  setReRender(prev => !prev)
            
            // setTimeout(() => {
                  
            //     if (senderData?.length || JSON.stringify(senderData) !== JSON.stringify(tableData)) {
            //           console.log('enter ')
            //           setTableData(senderData)
            //       }
            //   }, 100);
            }
            toast.success("Sender status updated successfully")
    }
  
  
  
    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>An error occurred while fetching data.</div>;
  return (
    <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Sender" />
      </header>
      <main className=' md:px-5'>

        <Table  senders={tableData} handleUpdateStatus={handleUpdateStatus} />
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