"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  SlidersHorizontal, UserRound } from "lucide-react"
import { FeedbackType } from "@/type/homePageTypes"
import Image from "next/image"
// Use the image URL directly as a string
// const logo = 'https://i.pravatar.cc/150?img=1';


type Prop = {
  generateFeedbackData:FeedbackType[]
  handleUserRole: (role: string) => void
}

const FeedbackTable = ({generateFeedbackData,handleUserRole}:Prop) => {
     const [feedbackData, setFeedbackData] = useState<FeedbackType[]>(generateFeedbackData)
     // Sync with new props if generateFeedbackData changes
       useEffect(() => {
          setFeedbackData(generateFeedbackData);
        }, [generateFeedbackData]);
        // console.log(generateFeedbackData)
        
      // const handleStarItem = (id: number) => {
      //   setFeedbackData((prev) => prev.map((item) => (item.id === id ? { ...item, starred: !item.starred } : item)))
      // }
    
      // const handleDeleteItem = (id: number) => {
      //   setFeedbackData((prev) => prev.filter((item) => item.id !== id))
      // }
      console.log(feedbackData)
  return (
      <div className="w-full overflow-x-auto bg-white rounded-lg px-2">
      <table className="min-w-full overflow-x-auto border-gray-200 ">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3  px-4 text-left font-medium text-gray-600 text-sm">Date</th>
            <th className="py-3 px-4  text-left font-medium text-gray-600 text-sm">Type</th>
            <th className="py-3 px-4  text-left font-medium text-gray-600 text-sm">Name</th>
            <th className="py-3 px-4  text-left font-medium text-gray-600 text-sm">Email</th>
            <th className="py-3 px-4  text-left font-medium text-gray-600 text-sm">Phone</th>
            <th className="py-3 px-4  text-left font-medium text-gray-600 text-sm">Subject</th>
            <th className="py-3 px-4  text-left font-medium text-gray-600 text-sm flex items-center justify-between"><span>Feedback</span>
            
            <div className="py-3 px-4  text-right ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 cursor-pointer">
                    {/* <MoreVertical className="h-4 w-4" /> */}
                    <SlidersHorizontal  className="h-6 w-6 text-green-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>handleUserRole("")} className="cursor-pointer">
                  
                    <span >All</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>handleUserRole("Sender")} className="cursor-pointer">
                  
                    <span >Sender</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>handleUserRole("Courier")} className="cursor-pointer">
                   
                    <span >Courier</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            feedbackData?.length ===0 && (
            <tr>
                <th colSpan={6} className="font-semibold text-xl text-center py-4">
                    No feedback found
                </th>
            </tr>)
          }
          {feedbackData?.map((entry,idx) => (
              <tr
              key={idx}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
                <td className=" px-1 lg:px-3 py-2 whitespace-nowrap">
                {entry?.createdAt
                  ? new Date(entry.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/(\d{2}) ([A-Za-z]{3}), (\d{4})/, "$2 $1, $3")
                  : ""}
                </td>
              <td className=" px-1 lg:px-3 py-2  whitespace-nowrap">
                {entry?.user?.role}
              </td>
              <td className=" px-1 lg:px-3 py-2 whitespace-nowrap flex items-center  gap-2">
                {
                entry?.user?.profileImage
                ?
               ( <Image
                    alt={entry.user?.fullName}
                    src={entry?.user?.profileImage}
                    width={500}
                    height={500}
                    className="w-6 h-6 rounded-full"
                />)
                :(
                <UserRound className="w-5 h-5"/>)
                }
                {entry?.user?.fullName}
              </td>
              <td className=" px-1 lg:px-3 py-2 whitespace-nowrap">
                {entry?.user?.email}
              </td>
              <td className=" px-1 lg:px-3 py-2 whitespace-nowrap">
                { entry?.user?.phoneNumber ? entry?.user?.phoneNumber:'N/A'}
              </td>
              
               <td className=" px-1 lg:px-3 py-2 whitespace-nowrap">
                { entry?.subject ? entry?.subject:'N/A'}
              </td>
              <td className=" px-4 py-2 max-w-xs break-words">
                {entry?.comments}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbackTable