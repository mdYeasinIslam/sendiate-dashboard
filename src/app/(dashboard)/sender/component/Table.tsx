import {
    Table as UITable,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { SenderType } from "@/type/usersType";
import Image from "next/image";

import Link from "next/link";
import React from "react";
import logo from '../../../../../public/images/vehicle.png'

const Table = ({ senders }: { senders: SenderType[] }) => {
    const [filterSenders, setFilterSenders] = React.useState<SenderType[]>(senders);
    
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = senders.filter((sender) =>
            sender.fullName.toLowerCase().includes(searchTerm) ||
            sender.email.toLowerCase().includes(searchTerm) ||
            (sender.phoneNumber && sender.phoneNumber.toLowerCase().includes(searchTerm))
        );
        setFilterSenders(filtered);
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
                            <TableHead className="py-3 px-2 font-normal"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filterSenders.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="font-semibold text-xl text-center py-4">
                                        No senders found
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {filterSenders.map((sender, idx) => (
                            <TableRow
                                key={sender.id + idx}
                                className="  hover:bg-gray-50"
                            >
                                <TableCell className="py-3 px-2">01</TableCell>
                                <TableCell className="py-3 px-2 flex items-center gap-2">
                                    <Image
                                        alt={sender.fullName}
                                        src={logo}
                                        width={500}
                                        height={500}
                                        className="w-6 h-6 rounded-full"
                                    />
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
                                    <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-1 rounded-full text-xs font-medium">
                                        View Details
                                    </button>
                                    </Link>
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