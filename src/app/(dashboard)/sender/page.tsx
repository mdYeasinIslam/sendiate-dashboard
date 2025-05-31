'use client'
import Table from '@/app/(dashboard)/sender/component/Table'
import LoadingSpinner from '@/app/loading';
import PageWrapper from '@/components/PageWrapper'
import { Pagination } from '@/components/shared/Pagination';
import { usePaginatedUsers } from '@/hooks/pagination/usePaginatedUsers';
import { useGetSenderStatsQuery } from '@/redux/services/Apis/senderPage/senderPageApi';
import { SenderType } from '@/type/SenderPagesType';
import React, { useState } from 'react'

//     {
//         id: 1,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Active",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 2,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Active",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 3,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 4,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Active",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 5,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },

//     {
//         id: 6,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 7,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 8,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 9,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 10,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 11,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 12,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 13,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 14,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 15,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 16,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 17,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         id: 18,
//         name: "Sarah Gomez",
//         email: "emma@example.com",
//         phone: "+1 234 567 8901",
//         status: "Block",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
// ];
type SenderStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: SenderType[]
};

const Sender = () => {
    // const dispatch = useAppDispatch()
    const { data, error, isLoading } = useGetSenderStatsQuery() as { data?: SenderStatsResponse, error?: unknown, isLoading: boolean };
    // console.log(data?.data)
    const tableData = data?.data || [];
    // console.log(tableData)
    const [currentPage, setCurrentPage] = useState(data?.meta?.page || 1);
    const itemsPerPage = data?.meta?.limit || 10;

    const { paginatedData, totalPages } = usePaginatedUsers(tableData, currentPage, itemsPerPage);

    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div>An error occurred while fetching data.</div>;
  return (
    <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Sender" />
      </header>
      <main className=' md:px-5'>

        <Table senders={paginatedData} />
         <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
      </main>
    </section>
  )
}

export default Sender