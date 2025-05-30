'use client'
import React from 'react'
import Image from "next/image";
import PageWrapper from '@/components/PageWrapper';
import Button from '@/components/shared/Button';
import { useGetSenderByIdQuery } from '@/redux/services/Apis/senderPage/senderPageApi';
import { SenderDetailsType } from '@/type/SenderPagesType';
import LoadingSpinner from '@/app/loading';
import OrderDetails from '@/components/shared/order_and_reviewDetails/OrderDetails';
import { useParams } from 'next/navigation';

// Use the image URL directly as a string
const logo = 'https://i.pravatar.cc/150?img=1';

// const user = {
//     id: 1,
//     name: "Sarah Gomez",
//     email: "emma@example.com",
//     phone: "+1 234 567 8901",
//     status: "Active",
//     avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     totalRequest: 50,
//     totalAmountPaid: 2000,
//     reviewGet: 40,
//     reviewProvide: 45,
//     orders: [
//         {
//             orderNumber: "U08756685CE",
//             courierDate: "15 June 2025",
//             pickUpAddress: "1234 Elm St",
//             dropOffAddress: "5678 Oak St",
//             vehicleType: "SUV",
//             amount: 30,
//             status: "Delivered",
//             paymentType: "Cash payment",
//             deliveryService: {
//                 name: "Abel’s Delivery Service",
//                 avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//                 reviewProvide: {
//                     text: "Thank you for the smooth delivery!",
//                     rating: 3,
//                 },
//                 reviewGet: {
//                     text: "Clear instructions and quick communication. Everything was ready on time.",
//                     rating: 5,
//                 },
//             },
//         },
//     ],
// };
type SenderDetails = {
    data: SenderDetailsType
};
const Page = () => {
    const param = useParams()
    const id = param.id as string;
    // const order = user?.orders[0];

    const { data, error, isLoading } = useGetSenderByIdQuery(id) as { data?: SenderDetails, error?: unknown, isLoading: boolean };
    const senderData = data?.data as SenderDetailsType;
    const orderData = senderData?.parcelsSent
    console.log(senderData)

    if (isLoading) return <div><LoadingSpinner/></div>
    if (error) return <div>An Error occurred</div>
    return (
        <>
            <PageWrapper title='Sender Details'/>
            <section className='px-6 '>
                <div className=" rounded-lg shadow p-6   mx-auto mt-8 bg-white">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 border-b">
                        {/* <button className="text-green-600 text-xl rounded-full p-1 hover:bg-gray-100">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                        </button> */}
                       <Button path='/sender'/>
                        <span className="font-medium text-lg">{senderData?.fullName}</span>
                    </div>
                    {/* User Info and Stats */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-8 border-b pb-6">
                        <div className="flex-1 flex flex-col  items-start text-lg">
                            <figure className='flex items-center gap-2'>
                                <Image
                                    src={logo}
                                    alt={senderData?.fullName}
                                    width={48} height={48}
                                    className="w-6 h-6 rounded-full object-cover" />
                               
                                <figcaption className=" ">{senderData?.fullName?.split(' ')[0] || senderData?.fullName} Courier</figcaption>

                            </figure>
                            <div>
                                <div className="text-gray-600 ">{senderData?.email}</div>
                                <div className="text-gray-600 ">{senderData?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className="flex-1 text-lg  text-black font-semibold">
                            <div>
                                <div className="">Total Request:<span className="font-semibold">{senderData?.stats?.totalRequests}</span>
                            </div>
                            </div>
                            <div>
                                <div className="">Total Amount Paid:<span className="font-semibold">${senderData?.stats?.totalAmountPaid}</span></div>
                                
                            </div>
                            <div>
                                <div className="">Review Get:<span className="font-semibold">{senderData?.stats?.ratingsReceived}</span></div>
                                
                            </div>
                            <div>
                                <div className="">Review Provide: <span className="font-semibold">{senderData?.stats?.ratingsGiven}</span></div>
                            
                            </div>
                        </div>
                    </div>

                    {/* Order and Review Details */}
                    <div className="grid grid-cols-1 justify-between text-lg">
                        {
                            orderData?.map((order, idx) => <OrderDetails key={idx} details={order}/>)
                        }
                       
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;