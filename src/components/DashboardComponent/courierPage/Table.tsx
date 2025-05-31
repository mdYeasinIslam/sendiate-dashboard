
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
import {  Edit, Eye, MoreVertical, Star, Trash } from "lucide-react"
import { CourierUserDetails } from "@/type/courierPageTypes"
// Use the image URL directly as a string
const logo = 'https://i.pravatar.cc/150?img=1';


export function CourierTable({ users }: { users: CourierUserDetails[] }) {
  return (
      <section className="bg-white  w-full rounded-xl shadow p-3 lg:p-6">
           <div className="mb-4"> 
                <input
                    type="text"
                    placeholder="Search here"
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
                      <TableHead className="py-3 px-2 font-normal"></TableHead>

                      <TableHead className="py-3 px-2 font-normal text-right">
                         
                      </TableHead>
                </TableRow>
            </TableHeader>
        <TableBody>
            {users.map((user,idx) => (
            <TableRow
                key={ idx}
                className="hover:bg-gray-50"
            >
                    <TableCell className="py-3 px-2">{ idx}</TableCell>
                <TableCell className="py-3 px-2">
                        {user.fullName}
                </TableCell>
                    <TableCell className="py-3 px-2">{user.phoneNumber}</TableCell>
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
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem >
                                    {/* <DropdownMenuItem onClick={() => handleStarItem(entry.id)}> */}
                                    <Star className={`mr-2 h-4 w-4`} />
                                    {/* <span>{entry.starred ? "Unstar" : "Star"}</span> */}
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
                                <DropdownMenuItem className="text-red-600">
                                    {/* <DropdownMenuItem onClick={() => handleDeleteItem(entry.id)} className="text-red-600"> */}
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
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
