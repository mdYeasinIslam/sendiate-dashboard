import { DateType } from '@/type/dateType';
import React from 'react';


const TransactionTable = ({data}:{data:DateType[]}) => {

    return (
        <div className="w-full bg-white rounded-lg shadow-sm p-6">
            <table className="w-full ">
                <thead>
                    <tr className=" border-b">
                        <th className="py-2 px-4 text-xs font-normal text-gray-500 text-left">Date</th>
                        <th className="py-2 px-4 text-xs font-normal text-gray-500">Payment Method</th>
                        <th className="py-2 px-4 text-xs font-normal text-gray-500 text-right">Courier Charge</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} className=" last:border-b-0 ">
                            <td className="py-5 px-4 text-sm text-gray-700">{row.date}</td>
                            <td className="py-5 px-4 text-sm text-gray-700 text-center">{row.paymentMethod}</td>
                            <td className="py-5 px-4 text-sm text-gray-700 text-right">{row.courierCharge}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;