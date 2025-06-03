'use client'
import PageWrapper from '@/components/PageWrapper'
import React, { useState } from 'react'
import TransactionTable from './component/TransactionTable';
import { Pagination } from '@/components/shared/Pagination';
import { useGetTransactionStatsQuery } from '@/redux/services/Apis/transactionApi/transactionApi';
import { TransactionType } from '@/type/transactionPageType';
import LoadingSpinner from '@/app/loading';


type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPages: number };
    data: TransactionType[]
};
const TransactionDashboard = () => {
    
    const [pageForPagination,setPageForPagination] =useState(1)
    const [paymentMethod, setPaymentMethod] = useState<string>('CARD')
    // const [isCourierFeeRelease, setIsCourierFeeRelease] = useState<boolean>(false)
    // const [isPlatformFeeRelease, setIsPlatformFeeRelease] = useState<boolean>(false)
    
    const { data, error, isLoading } = useGetTransactionStatsQuery(
        {page:pageForPagination,limit:10, paymentMethod }
    ) as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean };
        
    const [transactionData, setTransactionData] = useState<TransactionType[]>([]);

    React.useEffect(() => {
        if (data?.data) {
        setTransactionData(data.data);
        }
    }, [data]);
    // console.log(transactionData)
        

    // const [currentPage, setCurrentPage] = useState(data?.meta?.page || 1);
    // const itemsPerPage = data?.meta?.limit || 10;
    // const { paginatedData, totalPages } = usePaginatedUsers<TransactionType>(transactionData, currentPage, itemsPerPage);
     if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>An error occurred while fetching data.</div>;

  return (
     <section className='bg-[#F8F8F8] h-full'>
      <header>
        <PageWrapper title="Transaction" />
      </header>
      <main className='md:px-5'>
        <TransactionTable 
            transactionData={transactionData}
            setPaymentMethod={setPaymentMethod}
              />
         <Pagination
                currentPage={pageForPagination}
                totalPages={data?.meta?.totalPages || 1}
                setPageForPagination={setPageForPagination}
              />
      </main>
    </section>
  )
}

export default TransactionDashboard