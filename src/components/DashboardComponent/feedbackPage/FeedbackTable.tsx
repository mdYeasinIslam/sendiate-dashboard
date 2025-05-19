"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Download, Trash, Edit, Eye, Star } from "lucide-react"
import { FeedbackEntry } from "@/type/feedbackType"


const FeedbackTable = ({generateFeedbackData}:{generateFeedbackData:FeedbackEntry[]}) => {
     const [feedbackData, setFeedbackData] = useState<FeedbackEntry[]>(generateFeedbackData)
     // Sync with new props if generateFeedbackData changes
       useEffect(() => {
          setFeedbackData(generateFeedbackData);
        }, [generateFeedbackData]);

      const handleStarItem = (id: number) => {
        setFeedbackData((prev) => prev.map((item) => (item.id === id ? { ...item, starred: !item.starred } : item)))
      }
    
      const handleDeleteItem = (id: number) => {
        setFeedbackData((prev) => prev.filter((item) => item.id !== id))
      }
  return (
      <div className="w-full overflow-auto bg-white rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-left font-medium text-gray-600 text-sm">Date</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 text-sm">Type</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 text-sm">Name</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 text-sm">Email</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 text-sm">Phone</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 text-sm">Feedback</th>
            <th className="py-3 px-4 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Export</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete All</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((entry) => (
            <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-600">{entry.date}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{entry.type}</td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.name} />
                    <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{entry.email}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{entry.phone}</td>
              <td className="py-3 px-4 text-sm text-gray-600 max-w-md truncate">{entry.feedback}</td>
              <td className="py-3 px-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleStarItem(entry.id)}>
                      <Star className={`mr-2 h-4 w-4 ${entry.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      <span>{entry.starred ? "Unstar" : "Star"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteItem(entry.id)} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbackTable