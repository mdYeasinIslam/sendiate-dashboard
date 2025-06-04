"use client"

import { useState } from "react"
import { Check, ChevronDown, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserType } from "@/type/notificationPage"

type Prop = {
    notificationData: UserType[]
    selectedUsers: string[]
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>
}

export default function UserSelector({ notificationData, selectedUsers, setSelectedUsers }: Prop) {
    const [isOpen, setIsOpen] = useState(false)

    const handleUserToggle = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        )
    }

    const handleSelectAll = () => {
        if (selectedUsers.length === notificationData.length) {
            // Deselect all
            setSelectedUsers([])
        } else {
            // Select all
            setSelectedUsers(notificationData.map((user) => user.id))
        }
    }

    return (
        <div className="w-full">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between h-10 cursor-pointer">
                        <span className="truncate">Select Users</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[40vw] p-0" align="start">
                    <div className="max-h-[55vh] overflow-y-auto cursor-pointer">
                        {/* Select All Option */}
                        <div onClick={handleSelectAll} className="flex items-center space-x-3 p-3 hover:bg-muted/50 border-b">
                            <Checkbox
                                id="select-all"
                                checked={selectedUsers.length === notificationData.length}
                               onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedUsers(notificationData.map((user) => user.id))
                                } else {
                                  setSelectedUsers([])
                                }
                              }}
                                onClick={(e) => e.stopPropagation()}
                                className="cursor-pointer"
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
                            {selectedUsers.length === notificationData.length && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </div>

                        {/* Individual Users */}
                        {notificationData.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer"
                                onClick={() => handleUserToggle(user.id)}
                            >
                                <Checkbox
                                    id={user.id}
                                    checked={selectedUsers.includes(user.id)}
                                   onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedUsers((prev) => [...prev, user.id])
                                      } else {
                                        setSelectedUsers((prev) => prev.filter((id) => id !== user.id))
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="cursor-pointer"
                                />
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.fullName} />
                                        <AvatarFallback>
                                            {user.fullName
                                                ?.split(" ")
                                                ?.map((n) => n[0])
                                                ?.join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{user.fullName}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        <p className="text-xs text-primary font-medium">{user.role}</p>
                                    </div>
                                </div>
                                {selectedUsers.includes(user.id) && (
                                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
