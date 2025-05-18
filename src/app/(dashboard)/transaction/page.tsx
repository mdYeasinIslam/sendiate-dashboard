import PageWrapper from '@/components/PageWrapper'
import { UserType } from '@/type/usersType';
import React from 'react'
import Table from '../sender/component/Table';
import TransactionTable from './component/TransactionTable';
const users:UserType[] = [
    {
        id: 1,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 2,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 3,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 4,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Active",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 5,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    
    {
        id: 6,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 7,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 8,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 9,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 10,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 11,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 12,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 13,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 14,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 15,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 16,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 17,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 18,
        name: "Sarah Gomez",
        email: "emma@example.com",
        phone: "+1 234 567 8901",
        status: "Block",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
];
const Transaction = () => {
  return (
     <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Transaction" />
      </header>
      <main className='p-5'>

              {/* <Table users={users}/> */}
        <TransactionTable/>
      </main>
    </section>
  )
}

export default Transaction