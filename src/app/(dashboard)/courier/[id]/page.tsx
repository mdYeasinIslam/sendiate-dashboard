import React from 'react'
import Image from "next/image";
import PageWrapper from '@/components/PageWrapper';
import Button from '@/components/shared/Button';
import DetailsVehicleType from '@/components/DashboardComponent/courierPage/DetailsVehicleType';
import { User } from '@/type/vehicleType';


const user: User = {
    id: 1,
    name: "Sarah Gomez",
    email: "emma@example.com",
    phone: "+1 234 567 8901",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    totalRequest: 50,
    totalAmountPaid: 2000,
    reviewGet: 40,
    reviewProvide: 45,
    orders: [
        {
            orderNumber: "U08756685CE",
            courierDate: "15 June 2025",
            pickUpAddress: "1234 Elm St",
            dropOffAddress: "5678 Oak St",
            vehicleType: "SUV",
            amount: 30,
            status: "Delivered",
            paymentType: "Cash payment",
            deliveryService: {
                name: "Abel’s Delivery Service",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                reviewProvide: {
                    text: "Thank you for the smooth delivery!",
                    rating: 3,
                },
                reviewGet: {
                    text: "Clear instructions and quick communication. Everything was ready on time.",
                    rating: 5,
                },
            },
        },
    ],
};

const page = () => {
    const order = user?.orders[0];

    return (
        <>
            <PageWrapper title='Courier Details'/>
            <section className='px-6 '>
                <div className=" rounded-lg shadow p-6   mx-auto mt-8 bg-white">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 border-b">
                        <Button path='courier'/>
                        <span className="font-medium text-lg">{user?.name}</span>
                    </div>
                    {/* User Info and Stats */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-8 border-b pb-6">
                        <div className="flex-1 flex gap-4 items-start">
                            <Image src={user?.avatar} alt={user?.name} width={48} height={48} className="rounded-full object-cover" />
                            <div>
                                <div className="font-semibold">{user?.name}</div>
                                <div className="text-gray-600 text-sm">{user?.email}</div>
                                <div className="text-gray-600 text-sm">{user?.phone}</div>
                            </div>
                        </div>
                        <div className="flex-1  text-black font-semibold">
                            <div>
                                <div className="">Total Request:<span className="font-semibold">{user?.totalRequest}</span>
                            </div>
                            </div>
                            <div>
                                <div className="">Total Amount Paid:<span className="font-semibold">${user?.totalAmountPaid}</span></div>
                                
                            </div>
                            <div>
                                <div className="">Review Get:<span className="font-semibold">{user?.reviewGet}</span></div>
                                
                            </div>
                            <div>
                                <div className="">Review Provide: <span className="font-semibold">{user?.reviewProvide}</span></div>
                            
                            </div>
                        </div>
                    </div>
                    {/* Order and Review Details */}
                    <div className="flex flex-col md:flex-row gap-8 mt-6">
                        {/* Order Details */}
                        <div className="flex-1 text-black">
                            <div className="mb-2  text-sm">Order Number: <span className="font-medium">{order?.orderNumber}</span></div>
                            <div className="mb-2  text-sm">Courier Date: <span className="font-medium">{order?.courierDate}</span></div>
                            <div className="mb-2  text-sm">Pick Up Address: <span className="font-medium">{order?.pickUpAddress}</span></div>
                            <div className="mb-2  text-sm">Drop–Off Address: <span className="font-medium">{order?.dropOffAddress}</span></div>
                            <div className="mb-2  text-sm flex items-center gap-4">Vehicle Type: <span className="font-medium">{order?.vehicleType}</span><DetailsVehicleType order={order} /></div>
                            <div className="mb-2  text-sm">Amount: <span className="font-medium">${order?.amount}</span></div>
                            <div className="mb-2  text-sm flex items-center gap-2">
                                Status: 
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">{order?.status}</span>
                            </div>
                            <div className="mb-2  text-sm">Payment Type: <span className="font-medium">{order?.paymentType}</span></div>
                        </div>
                        {/* Review Details */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Image src={order?.deliveryService?.avatar} alt={order?.deliveryService?.name} width={28} height={28} className="rounded-full object-cover" />
                                <span className="font-medium">{order?.deliveryService?.name}</span>
                            </div>
                            <div className="mb-2">
                                <div className=" text-md font-semibold">Review Provide:</div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-700 text-sm">{order?.deliveryService?.reviewProvide?.text}</span>
                                    {/* showing Ratings */}
                                    <span className="flex items-center text-orange-400 text-xs">
                                        {Array(order?.deliveryService?.reviewProvide?.rating).fill(0).map((_, i) => (
                                            <svg key={i} width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                                        ))}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className=" text-md font-semibold">Review Get:</div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-700 text-sm">{order?.deliveryService?.reviewGet?.text}</span>
                                    <span className="flex items-center text-orange-400 text-xs">
                                        {Array(order?.deliveryService?.reviewGet?.rating).fill(0).map((_, i) => (
                                            <svg key={i} width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;