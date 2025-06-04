'use client'
import React from 'react'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import UserSelector from './Selectors'
import { useGetUsersQuery } from '@/redux/services/Apis/notification/notificationApi'
import { UserType } from '@/type/notificationPage'
import LoadingSpinner from '@/app/loading'


type NotificationStatsType = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: UserType[]
};

const NotificationForm = () => {

    const { data, error, isLoading } = useGetUsersQuery({limit:10000})  as { data?: NotificationStatsType, error?: unknown, isLoading: boolean };
    // console.log(data)
    const notificationData = data?.data ||[]
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])


      const [title, setTitle] = useState<string>("")
      const [message, setMessage] = useState<string>("")
      const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        if (!title.trim() || !message.trim()) {
          alert("Please fill in all fields")
          return
        }
    
        setIsSubmitting(true)
    
        // Simulate API call
        try {
          // In a real app, you would send the data to your API
          console.log({
            selectedUsers,
            title,
            message,
          })
          
          // Simulate success
          setTimeout(() => {
            setIsSubmitting(false)
            setTitle("")
            setMessage("")
            alert("Notification sent successfully!")
          }, 1000)
        } catch (error) {
          console.error("Error sending notification:", error)
          setIsSubmitting(false)
        }
  }
   if(isLoading) {
      return <div className="text-center py-10"><LoadingSpinner/></div>  
    }
    if (error) {
      return <div className="text-center py-10 text-red-500">Error loading vehicle data</div>
    }
    if (!notificationData || notificationData.length === 0) {
      return <div className="text-center py-10">No vehicle data available</div>
    }
  return (
   <div className="w-full    rounded-lg shadow-sm px-5 md:p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 px-5">Make Notification</h2>

        <form onSubmit={handleSubmit} className="space-y-5 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                Send To
                </label>
            <UserSelector notificationData={notificationData} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            </div>

            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
                </label>
                <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write title..."
                className="w-full h-10 border border-gray-300 rounded-md"
                />
            </div>
            </div>

            <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Send Message
            </label>
            <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write here..."
                className="w-full min-h-[120px] border border-gray-300 rounded-md"
            />
            </div>

            <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-black font-medium rounded-md transition-colors"
            >
            {isSubmitting ? "Sending..." : "Make Notification"}
            </Button>
        </form>
        </div>
  )
}

export default NotificationForm