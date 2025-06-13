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
import { UserRound } from 'lucide-react';

// Use the image URL directly as a string
// const logo = 'https://i.pravatar.cc/150?img=1';

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
    // console.log(senderData)

    if (isLoading) return <div><LoadingSpinner/></div>
    if (error) return <div>An Error occurred</div>
    
    return (
        <>
            <PageWrapper title='Sender Details '/>
            <section className='px-10 '>
                <div className=" rounded-lg p-5  bg-white   mx-auto mt-8   h-full">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 border-b">
                       
                       <Button path='/sender'/>
                        <span className="font-medium text-lg">{senderData?.fullName}</span>
                    </div>
                    {/* User Info and Stats */}
                    <div className=" flex flex-col md:flex-row md:justify-between gap-8 border-b pb-6">
                        <div className="flex-1 flex flex-col  items-start text-lg">
                            <figure className='flex items-center gap-2'>
                                {
                                    senderData?.profileImage ? (
                                        
                                        <Image
                                            src={senderData?.profileImage}
                                            alt={senderData?.fullName}
                                            width={48} height={48}
                                            className="w-6 h-6 rounded-full object-cover" />
                                    ):
                                        (
                                            <UserRound  className='w-6 h-6 border rounded-full'/>
                                        )
                                }
                               
                                <figcaption className=" ">{senderData?.fullName?.split(' ')[0] || senderData?.fullName} Courier</figcaption>

                            </figure>
                            <div>
                                <div className="text-gray-600 ">{senderData?.email}</div>
                                <div className="text-gray-600 ">{senderData?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className="flex-1 text-lg  text-black font-semibold">
                            <div>
                                <div className="">Total Request : <span className="font-semibold"> {senderData?.stats?.totalRequests}</span>
                            </div>
                            </div>
                            <div>
                                <div className="">Total Amount Paid : <span className="font-semibold">${senderData?.stats?.totalAmountPaid}</span></div>
                                
                            </div>
                            <div>
                                <div className="">Review Get : <span className="font-semibold">{senderData?.stats?.ratingsReceived}</span></div>
                                
                            </div>
                            <div>
                                <div className="">Review Provide : <span className="font-semibold">{senderData?.stats?.ratingsGiven}</span></div>
                            
                            </div>
                        </div>
                    </div>

                    {/* Order and Review Details */}

                    <div className=" bg-white grid grid-cols-1 justify-between text-lg h-full ">
                        {orderData?.length === 0 ? 
                        
                        <div className=" text-gray-500 mt-6 flex justify-center items-center"><span>No orders details found for this sender.</span></div>
                            :
                            <div className='h-full   bg-white'>
                                {
                                    orderData?.map((order, idx) => <OrderDetails key={idx} details={order}  from='SenderPage'/>)
                                }
                            </div>
                        }
                       
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;