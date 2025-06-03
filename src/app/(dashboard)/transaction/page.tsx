'use client'
import PageWrapper from '@/components/PageWrapper'
import React, { useState } from 'react'
import TransactionTable from './component/TransactionTable';
import { DateType } from '@/type/transactionPageTypes';
import { Pagination } from '@/components/shared/Pagination';
import { usePaginatedUsers } from '@/hooks/pagination/usePaginatedUsers';
import { useGetTransactionStatsQuery } from '@/redux/services/Apis/transactionApi/transactionApi';
import { TransactionType } from '@/type/transactionPageType';
import LoadingSpinner from '@/app/loading';
const data2:DateType[] = [
    {
        id: 1,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 2,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 3,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 4,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 5,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 6,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 7,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 8,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 9,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 10,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 11,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 12,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 13,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 14,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 15,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 16,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 17,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
    {
        id: 18,
        date: "24 Jun 2025",
        paymentMethod: "Credit Card",
        courierCharge: "$65.00",
    },
];


type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: TransactionType[]
};
const TransactionDashboard = () => {
    const [paymentMethod, setPaymentMethod] = useState<string>('CARD')
    const [isCourierFeeRelease, setIsCourierFeeRelease] = useState<boolean>(false)
    const [isPlatformFeeRelease, setIsPlatformFeeRelease] = useState<boolean>(false)
    
    const { data, error, isLoading } = useGetTransactionStatsQuery(
        { paymentMethod, isCourierFeeRelease, isPlatformFeeRelease }
    ) as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean };
        // console.log(data?.data)
        const transactionData = data?.data || [];
        // console.log(transactionData)
        

    const [currentPage, setCurrentPage] = useState(data?.meta?.page || 1);
    const itemsPerPage = data?.meta?.limit || 10;
    const { paginatedData, totalPages } = usePaginatedUsers<TransactionType>(transactionData, currentPage, itemsPerPage);
     if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>An error occurred while fetching data.</div>;

  return (
     <section className='bg-[#F8F8F8] h-full'>
      <header>
        <PageWrapper title="Transaction" />
      </header>
      <main className='md:px-5'>
        <TransactionTable 
            transactionData={paginatedData}
            setPaymentMethod={setPaymentMethod}
            setIsCourierFeeRelease={setIsCourierFeeRelease}
            setIsPlatformFeeRelease={setIsPlatformFeeRelease}
              />
         <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
      </main>
    </section>
  )
}

export default TransactionDashboard