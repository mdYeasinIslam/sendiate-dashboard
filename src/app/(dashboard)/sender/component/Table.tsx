import { UserType } from "@/type/usersType";
import Link from "next/link";
import React from "react";

const Table = ({users}:{users:UserType[]}) => {
    return (
        <div className="bg-white  w-full rounded-xl shadow p-6">
            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search here"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                />
            </div>
            {/* Table */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left border-b text-gray-500 ">
                            <th className="py-3 px-2 font-normal">Serial No</th>
                            <th className="py-3 px-2 font-normal">Name</th>
                            <th className="py-3 px-2 font-normal">Email</th>
                            <th className="py-3 px-2 font-normal">Phone</th>
                            <th className="py-3 px-2 font-normal">Status</th>
                            <th className="py-3 px-2 font-normal"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr
                                key={user.id + idx}
                                className="  hover:bg-gray-50"
                            >
                                <td className="py-3 px-2">01</td>
                                <td className="py-3 px-2 flex items-center gap-2">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    {user.name}
                                </td>
                                <td className="py-3 px-2">{user.email}</td>
                                <td className="py-3 px-2">{user.phone}</td>
                                <td className="py-3 px-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            user.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-500"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-3 px-2">
                                    <Link href={`/sender/${user.id}`}>
                                    <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-1 rounded-full text-xs font-medium">
                                        View Details
                                    </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button className="px-2 py-1 rounded hover:bg-gray-100 text-gray-500">
                    &lt;
                </button>
                <button className="w-8 h-8 rounded-full bg-green-100 text-green-600 font-semibold">
                    1
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500">
                    2
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500">
                    3
                </button>
                <span className="px-2 text-gray-400">…</span>
                <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500">
                    9
                </button>
                <button className="px-2 py-1 rounded hover:bg-gray-100 text-gray-500">
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Table;