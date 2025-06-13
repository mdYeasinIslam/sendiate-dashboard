import { TransactionType } from '@/type/transactionPageType';
import React from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

type Prop = {
    transactionData: TransactionType[]
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>
}

const TransactionTable = ({ transactionData, setPaymentMethod }: Prop) => {

    return (
        <div className="w-full bg-white rounded-lg shadow-sm p-6">
            <table className="w-full ">
                <thead>
                    <tr className=" border-b">
                        <th className="py-2 px-4 text-sm font-normal text-gray-500 text-left">Date</th>
                        <th className="py-2 px-4 text-sm font-normal text-gray-500 text-left">Payment Method</th>
                        <th className="py-2 px-4 text-sm font-normal text-gray-500 text-left">Courier Charge</th>
                        <th className="py-2 px-4 text-sm font-normal text-gray-500 text-left">PlatformFee Release</th>
                        <th className="py-2 px-4 text-sm font-normal text-gray-500 text-left flex items-center justify-between">
                            <span>CourierFee Release</span>
                            <div className="py-3 px-4  text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 cursor-pointer">
                                            {/* <MoreVertical className="h-4 w-4" /> */}
                                            <SlidersHorizontal className="h-6 w-6 text-green-700" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Payment Method</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => setPaymentMethod("")} className="cursor-pointer">
                                            {/* <Download className="mr-2 h-4 w-4" /> */}
                                            <span>ALL</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setPaymentMethod("CASH")} className="cursor-pointer">
                                            {/* <Download className="mr-2 h-4 w-4" /> */}
                                            <span>CASH</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setPaymentMethod("CARD")} className="cursor-pointer">
                                            {/* <Trash className="mr-2 h-4 w-4" /> */}
                                            <span>CARD</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactionData.map((data, idx) => (
                        <tr key={idx} className=" last:border-b-0 ">
                            <td className="py-5 px-4 text-left text-sm text-gray-700">
                                {data?.createdAt
                                    ? new Intl.DateTimeFormat("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    }).format(new Date(data.createdAt))
                                    : ""}
                            </td>
                            <td className="py-5 px-4 text-sm text-gray-700 text-left">{data.paymentMethod}</td>
                            <td className="py-5 px-4 text-sm text-gray-700 text-left">{data?.courierFee ?"$ "+ data?.courierFee?.toFixed(2) : 'N/A'}</td>
                            <td className="py-5 px-4 text-sm text-gray-700 text-left">{data?.isPlatformFeeRelease ? 'Released' : 'Not-Released'}</td>
                            <td className="py-5 px-4 text-sm text-gray-700 text-left">{data?.isCourierFeeRelease ? 'Released' : 'Not-Released'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;