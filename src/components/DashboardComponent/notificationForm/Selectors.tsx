"use client"

import { useState } from "react"
import { Check, ChevronDown, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserType } from "@/type/notificationPage"

interface UserProfile {
  id: string
  profileImage: string
  name: string
  email: string
  role: string
}

// Sample data
const users: UserProfile[] = [
  {
    id: "683f4dfb9c68f74c8152117b",
    profileImage: "/placeholder.svg?height=40&width=40",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    id: "683f4dc49c68f74c8152117a",
    profileImage: "/placeholder.svg?height=40&width=40",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Driver",
  },
  {
    id: "683f4d7b9c68f74c81521179",
    profileImage: "/placeholder.svg?height=40&width=40",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Customer",
  },
  {
    id: "683f4d2a9c68f74c81521178",
    profileImage: "/placeholder.svg?height=40&width=40",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "New User",
  },
  {
    id: "683f4cf39c68f74c81521177",
    profileImage: "/placeholder.svg?height=40&width=40",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Admin",
  },
]
type Prop = {
    notificationData:UserType[]
    selectedUsers:string[]
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>
}
export default function UserSelector({notificationData,selectedUsers,setSelectedUsers}:Prop) {
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map((user) => user.id))
    }
  }

//   const getSelectedText = () => {
//     if (selectedUsers.length === 0) return "Select users"
//     if (selectedUsers.length === 1) {
//       const user = users.find((u) => u.id === selectedUsers[0])
//       return user?.name || "1 user selected"
//     }
//     return `${selectedUsers.length} users selected`
//   }

  return (
    <div className="w-full ">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between h-10">
            <span className="truncate">Select Users</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-0" align="start">
          <div className="max-h-80 overflow-y-auto">
            {/* Select All Option */}
            <div className="flex items-center space-x-3 p-3 hover:bg-muted/50 border-b">
              <Checkbox
                id="select-all"
                checked={selectedUsers?.length === notificationData?.length}
                onCheckedChange={handleSelectAll}
              />
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">All Users</p>
                  <p className="text-xs text-muted-foreground">Select all users</p>
                </div>
              </div>
              {selectedUsers?.length === notificationData?.length && <Check className="h-4 w-4 text-primary" />}
            </div>

            {/* Individual Users */}
            {notificationData?.map((user) => (
              <div
                key={user?.id}
                className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer"
                onClick={() => handleUserToggle(user?.id)}
              >
                <Checkbox
                  id={user?.id}
                  checked={selectedUsers?.includes(user?.id)}
                  onCheckedChange={() => handleUserToggle(user?.id)}
                />
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.fullName} />
                    <AvatarFallback>
                      {user?.fullName
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    <p className="text-xs text-primary font-medium">{user?.role}</p>
                  </div>
                </div>
                {selectedUsers?.includes(user?.id) && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Selected Users Display */}
      {/* {selectedUsers.length > 0 && (
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-medium text-sm mb-2">Selected Users ({selectedUsers.length})</h3>
          <div className="space-y-2">
            {selectedUsers.map((userId) => {
              const user = users.find((u) => u.id === userId)
              if (!user) return null
              return (
                <div key={userId} className="flex items-center space-x-2 text-xs">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                  <span className="text-muted-foreground">({user.role})</span>
                </div>
              )
            })}
          </div>
        </div>
      )} */}
    </div>
  )
}
