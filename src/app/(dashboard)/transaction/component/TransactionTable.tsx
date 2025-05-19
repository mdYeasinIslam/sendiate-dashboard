'use client'
import { DateType } from '@/type/dateType';
import React, { useState } from 'react';

const fakeData = Array.from({ length: 90 }, (_, i) => ({
    date: '24 Jun 2025',
    paymentMethod: 'Credit Card',
    courierCharge: '$65.00',
}));

const PAGE_SIZE = 20;

const TransactionTable = ({data}:{data:DateType[]}) => {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(fakeData.length / PAGE_SIZE);

    const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="w-full bg-white rounded-lg shadow-sm p-6">
            <table className="w-full ">
                <thead>
                    <tr className="border-b ">
                        <th className="py-2 px-4 text-xs font-normal text-gray-500 text-left">Date</th>
                        <th className="py-2 px-4 text-xs font-normal text-gray-500">Payment Method</th>
                        <th className="py-2 px-4 text-xs font-normal text-gray-500 text-right">Courier Charge</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, idx) => (
                        <tr key={idx} className="border-b last:border-b-0">
                            <td className="py-2 px-4 text-sm text-gray-700">{row.date}</td>
                            <td className="py-2 px-4 text-sm text-gray-700 text-center">{row.paymentMethod}</td>
                            <td className="py-2 px-4 text-sm text-gray-700 text-right">{row.courierCharge}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                    className="px-2 py-1 rounded disabled:text-gray-300"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    {'<'}
                </button>
                {[...Array(Math.min(3, totalPages)).keys()].map((i) => (
                    <button
                        key={i + 1}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            page === i + 1 ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                {totalPages > 4 && (
                    <>
                        <span className="px-1 text-gray-400">...</span>
                        <button
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                page === totalPages ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setPage(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                <button
                    className="px-2 py-1 rounded disabled:text-gray-300"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default TransactionTable;