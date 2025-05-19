'use client'
import PageWrapper from '@/components/PageWrapper'
import React, { useState } from 'react'
import Table from '../sender/component/Table';
import TransactionTable from './component/TransactionTable';
import { DateType } from '@/type/dateType';
import { usePaginatedUsers } from '@/hooks/pagination/usePaginatedUsers';
import { Pagination } from '@/components/shared/Pagination';
const data:DateType[] = [
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
const TransactionDashboard = () => {
    //      const [currentPage, setCurrentPage] = useState(1);
    //   const itemsPerPage = 10;
    
    //   const { paginatedUsers, totalPages } = usePaginatedUsers(data, currentPage, itemsPerPage);
    
  return (
     <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Transaction" />
      </header>
      <main className='md:px-5'>
        <TransactionTable data={data} />
         {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              /> */}
      </main>
    </section>
  )
}

export default TransactionDashboard