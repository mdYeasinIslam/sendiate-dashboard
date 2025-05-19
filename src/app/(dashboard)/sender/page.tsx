import Table from '@/app/(dashboard)/sender/component/Table'
import PageWrapper from '@/components/PageWrapper'
import { UserType } from '@/type/usersType';
import React from 'react'
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
const Sender = () => {
  return (
    <section className='bg-[#F8F8F8]'>
      <header>
        <PageWrapper title="Sender" />
      </header>
      <main className=' md:px-5'>

        <Table users={users} />
      </main>
    </section>
  )
}

export default Sender