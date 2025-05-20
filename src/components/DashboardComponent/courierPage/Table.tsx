
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserType } from "@/type/usersType"
import Image from "next/image"
import Link from "next/link"



export function CourierTable({ users }: { users: UserType[] }) {
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
                </TableRow>
            </TableHeader>
        <TableBody>
            {users.map((user,idx) => (
            <TableRow
                key={user.id + idx}
                className="hover:bg-gray-50"
            >
                <TableCell className="py-3 px-2">01</TableCell>
                <TableCell className="py-3 px-2">
                    {user.name}
                </TableCell>
                <TableCell className="py-3 px-2">{user.phone}</TableCell>
                <TableCell className="py-3 px-2">{user.email}</TableCell>
                <TableCell className="py-3 px-2  flex items-center gap-2">
                    <Image
                        src={user.avatar}
                            alt={user.name}
                            width={500}
                            height={500}
                        className="w-6 h-6 rounded-full"
                    />
                        {user.courierName}</TableCell>
                <TableCell className="py-3 px-2">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active"
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
            </TableRow>
            ))}
        </TableBody>
         
          </UITable>

       
    </section>
  )
}
