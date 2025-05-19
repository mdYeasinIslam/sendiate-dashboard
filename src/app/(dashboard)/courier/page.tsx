'use client'
import PageWrapper from '@/components/PageWrapper'
import React, { useState } from 'react'
import { UserType } from '@/type/usersType';
import { CourierTable } from '@/components/DashboardComponent/courierPage/Table';
import { usePaginatedUsers } from '@/hooks/pagination/usePaginatedUsers';
import { Pagination } from '@/components/shared/Pagination';
const users: UserType[] = [
    {
        id: 1,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 2,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 3,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 4,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 5,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 6,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 7,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 8,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 9,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 10,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 11,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 12,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 13,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 14,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 15,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 16,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 17,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
    {
        id: 18,
        name: "Abdel Ahmed",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        courierName: "Abdel Courier",
    },
];
const DasboaredCourierpage = () => {
     const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { paginatedUsers, totalPages } = usePaginatedUsers<UserType>(users, currentPage, itemsPerPage);

  return (
      <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Courier" />
      </header>
      <main className='md:px-5'>

        <CourierTable users={paginatedUsers}/>
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