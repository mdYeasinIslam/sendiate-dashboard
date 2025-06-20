import {
    Table as UITable,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SenderType } from "@/type/SenderPagesType";
import Image from "next/image";

import Link from "next/link";
import React from "react";

// Use the image URL directly as a string
// const logo = 'https://i.pravatar.cc/150?img=1';
import { Button } from "@/components/ui/button";
import {  MoreVertical, UserRound} from "lucide-react";

type Prop = {
    senders: SenderType[]
    handleUpdateStatus: (id: string, status: string, sender: SenderType) => void
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Table = ({ senders,handleUpdateStatus,setSearchTerm }: Prop) => {
    const [filterSenders, setFilterSenders] = React.useState<SenderType[]>(senders);
//   console.log(senders)
    
    React.useEffect(() => {
        setFilterSenders(senders);
    }, [senders]);


    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm)
        // const filtered = senders.filter((sender) =>
        //     sender.fullName.toLowerCase().includes(searchTerm) ||
        //     sender.email.toLowerCase().includes(searchTerm) ||
        //     (sender.phoneNumber && sender.phoneNumber.toLowerCase().includes(searchTerm))
        // );
        // setFilterSenders(filtered);
    };

    return (
        <section className="bg-white w-full rounded-xl shadow p-3 lg:p-6">
            {/* Search */}
            <div className="mb-4"> 
                <input
                    type="text"
                    placeholder="Search here"
                    onChange={onChangeSearch}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                />
            </div>
            {/* Table */}
            <div className="overflow-x-auto w-full">
                
                <UITable className="min-w-full text-sm">
                    <TableHeader>
                        <TableRow className="text-left border-b text-gray-500 ">
                            <TableHead className="py-3 px-2 font-normal">Serial No</TableHead>
                            <TableHead className="py-3 px-2 font-normal">Name</TableHead>
                            <TableHead className="py-3 px-2 font-normal">Email</TableHead>
                            <TableHead className="py-3 px-2 font-normal">Phone</TableHead>
                            <TableHead className="py-3 px-2 font-normal">Status</TableHead>
                            <TableHead className="py-3 px-2 font-normal">Details</TableHead>
                            <TableHead className="py-3 px-2 font-normal text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       

                        {
                            filterSenders?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="font-semibold text-xl text-center py-4">
                                        No senders found
                                    </TableCell>
                                </TableRow>
                            )
                        }
                       
                        {filterSenders.map((sender, idx) => (
                            <TableRow
                                key={sender?.id + idx}
                                className="  hover:bg-gray-50"
                            >
                                <TableCell className="py-3 px-2">{idx+1}</TableCell>
                                <TableCell className="py-3 px-2 flex items-center gap-2">
                                   {
                                    sender?.profileImage?
                                    <Image
                                        alt={sender.fullName}
                                        src={sender?.profileImage}
                                        width={500}
                                        height={500}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    :
                                    <UserRound/>
                                   }
                                    {sender.fullName}
                                </TableCell>
                                <TableCell className="py-3 px-2">{sender.email}</TableCell>
                                <TableCell className="py-3 px-2">{sender.phoneNumber || 'Null'}</TableCell>
                                <TableCell className="py-3 px-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            sender.status === "ACTIVE"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-500"
                                        }`}
                                    >
                                        {sender.status}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 px-2">
                                    <Link href={`/sender/${sender.id}`}>
                                    <button className=" bg-green-500 hover:bg-green-600 text-black px-4 py-1 rounded-full text-xs font-medium cursor-pointer">
                                        View Details
                                    </button>
                                    </Link>
                                </TableCell>
                                <TableCell className="py-3 px-2 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 cursor-pointer">
                                                <MoreVertical className="h-4 w-4  " />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="font-semibold">
                                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            
                                            <DropdownMenuItem onClick={()=>handleUpdateStatus(sender?.id,'ACTIVE',sender)} className="cursor-pointer">
                                                <span className="hover:text-green-600">ACTIVE</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span onClick={()=>handleUpdateStatus(sender?.id,'INACTIVE',sender)} className="hover:text-gray-600 cursor-pointer">INACTIVE</span>
                                            </DropdownMenuItem>
                                          
                                            <DropdownMenuItem onClick={()=>handleUpdateStatus(sender?.id,'BLOCKED',sender)} className="hover:text-red-600 cursor-pointer">
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
            </div>
           
        </section>
    );
};

export default Table;