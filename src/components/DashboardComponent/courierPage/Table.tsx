
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {   MoreVertical} from "lucide-react"
import { CourierUserDetails } from "@/type/courierPageTypes"
// Use the image URL directly as a string
const logo = 'https://i.pravatar.cc/150?img=1';

type Prop = {
    users: CourierUserDetails[]
    handleUpdateStatus: (id: string, status: string,user:CourierUserDetails) =>void
        setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    
}
export function CourierTable({ users, handleUpdateStatus, setSearchTerm}: Prop) {
    

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm)
    }
  return (
      <section className="bg-white  w-full rounded-xl shadow p-3 lg:p-6">
           <div className="mb-4"> 
                <input
                    type="text"
                  placeholder="Search here"
                  onChange={(onChangeSearch)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                />
            </div>
        <UITable className="bg-white rounded-lg">
       
        <TableHeader>
                <TableRow className="text-left border-b text-gray-500 ">
                    <TableHead className="py-3 px-2 font-normal">Serial No</TableHead>
                    <TableHead className="py-3 px-2 font-normal">Name</TableHead>
                    <TableHead className="py-3 px-2 font-normal">Phone</TableHead>
                    <TableHead className="py-3 px-2 font-normal">Email</TableHead>
                    <TableHead className="py-3 px-2 font-normal">Courier Name</TableHead>
                      <TableHead className="py-3 px-2 font-normal">Status</TableHead>
                      <TableHead className="py-3 px-2 font-normal">Details</TableHead>

                      <TableHead className="py-3 px-2 font-normal text-right">
                         Action
                      </TableHead>
                </TableRow>
            </TableHeader>
              <TableBody>
                   {
                    users?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="font-semibold text-xl text-center py-4">
                                No senders found
                            </TableCell>
                        </TableRow>
                    )
                }
            {users.map((user,idx) => (
            <TableRow
                key={ idx}
                className="hover:bg-gray-50"
            >
                    <TableCell className="py-3 px-2">{ idx}</TableCell>
                <TableCell className="py-3 px-2">
                        {user.fullName}
                </TableCell>
                    <TableCell className="py-3 px-2">{user?.phoneNumber ? user?.phoneNumber :'N/A'}</TableCell>
                <TableCell className="py-3 px-2">{user.email}</TableCell>
                <TableCell className="py-3 px-2  flex items-center gap-2">
                    <Image
                            src={logo}
                            alt={user.fullName}
                            width={500}
                            height={500}
                        className="w-6 h-6 rounded-full"
                    />
                        {user?.fullName?.split(' ')[0] || user?.fullName} Courier</TableCell>
                <TableCell className="py-3 px-2">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.status === "ACTIVE"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-500"
                        }`}
                    >
                        {user.status}
                    </span>
                </TableCell>
                <TableCell className="py-3 px-2">
                    <Link href={`/courier/${user.id}`}>
                    <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-1 rounded-full text-xs font-medium">
                        View Details
                    </button>
                    </Link>
                </TableCell>
                    <TableCell className="py-3 px-2 text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-semibold">
                                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuItem onClick={()=>handleUpdateStatus(user?.id,'ACTIVE',user)}>
                                    <span className="hover:text-green-600">ACTIVE</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span onClick={()=>handleUpdateStatus(user?.id,'INACTIVE',user)} className="hover:text-gray-600">INACTIVE</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem onClick={()=>handleUpdateStatus(user?.id,'BLOCKED',user)} className="hover:text-red-600">
                                    {/* <DropdownMenuItem onClick={() => handleDeleteItem(entry.id)} className="text-red-600"> */}
                                    
                                    <span>BLOCKED</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>

            </TableRow>
            ))}
        </TableBody>
         
          </UITable>

       
    </section>
  )
}
