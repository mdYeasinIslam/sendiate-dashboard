'use client'
import PageWrapper from '@/components/PageWrapper'
import React, { useState } from 'react'
import { CourierTable } from '@/components/DashboardComponent/courierPage/Table';
import { Pagination } from '@/components/shared/Pagination';
import { useGetCourierStatsQuery, useUpdateCourierStatusMutation } from '@/redux/services/Apis/courierApi/courierPageApi';
import { CourierUserDetails } from '@/type/courierPageTypes';
import LoadingSpinner from '@/app/loading';
import { toast } from 'sonner';


type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: CourierUserDetails[]
};

const DasboaredCourierpage = () => {
      const [pageForPagination,setPageForPagination] =useState(1)
    const [searchTerm,setSearchTerm] = useState('')
  
    // Fetching courier stats
    const { data, error, isLoading } = useGetCourierStatsQuery({page:pageForPagination,limit:10,searchTerm}) as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean };
  
      const [tableData, setTableData] = useState<CourierUserDetails[]>(data?.data || []);
      const [updateSenderStatus] = useUpdateCourierStatusMutation()
    const [reRender, setReRender] = React.useState(true)
  
      React.useEffect(() => {
        if (data?.data) {
          setTableData(data.data);
        }
      }, [data?.data,reRender]);

const handleUpdateStatus = async(id:string,status:string,sender:CourierUserDetails) => {
        // console.log(status)
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
  
    if (isLoading) return <div><LoadingSpinner /></div>
    if (error) return <div>An Error occurred</div>

  return (
      <section className='bg-[#F8F8F8] h-full'>
      <header>
        <PageWrapper title="Courier" />
      </header>
      <main className='md:px-5'>

        <CourierTable users={tableData} handleUpdateStatus={handleUpdateStatus} setSearchTerm={setSearchTerm}/>
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