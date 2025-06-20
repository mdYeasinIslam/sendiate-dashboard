'use client'
import React from 'react'
import Image from "next/image";
import PageWrapper from '@/components/PageWrapper';
import Button from '@/components/shared/Button';
import { useParams } from 'next/navigation';
import { useGetCourierByIdQuery } from '@/redux/services/Apis/courierApi/courierPageApi';
import { CourierUserDetails } from '@/type/courierPageTypes';
import LoadingSpinner from '@/app/loading';
import OrderDetails from '@/components/shared/order_and_reviewDetails/OrderDetails';

// Use the image URL directly as a string
const logo = 'https://i.pravatar.cc/150?img=1';

type CourierDetails = {
    data: CourierUserDetails
};
const Page = () => {
    const param = useParams()
    const id = param.id as string;
    
    // const order = user?.orders[0];
    
     const { data, error, isLoading } = useGetCourierByIdQuery(id) as { data?: CourierDetails, error?: unknown, isLoading: boolean };
        const courierData = data?.data as CourierUserDetails;
    const orderData = courierData?.parcelsDelivered
    // console.log(courierData)
    const stats = courierData?.stats || {
        totalRequest: 0,
        totalAmountPaid: 0,
        reviewGet: 0,
        reviewProvide: 0
    };
    
    if (isLoading) return <div><LoadingSpinner /></div>
    if (error) return <div>An Error occurred</div>
    if (!courierData) return <div>No data found</div>;
    return (
        <div className=''>
            <PageWrapper title='Courier Details'/>
            <section className='px-6 '>
                <div className=" rounded-lg shadow p-6   mx-auto mt-8 bg-white">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 border-b">
                        <Button path='/courier'/>
                        <span className="font-medium text-lg">{courierData?.fullName?.split(' ')[0] || courierData?.fullName} Courier</span>
                    </div>
                    {/* User Info and Stats */}
                    <div className="flex flex-col md:flex-row md:justify-between items-center gap-8 border-b pb-6">
                        <div className="flex-1 flex flex-col-reverse gap-2 items-start font-bold">
                            <figure className='flex items-center gap-2'>
                                <Image
                                    src={courierData?.profileImage || logo}
                                    alt={courierData?.fullName}
                                    width={48}
                                    height={48}
                                    className="w-6 h-6 rounded-full object-cover" />
                                <figcaption className="font-semibold text-xl">{courierData?.fullName?.split(' ')[0] || courierData?.fullName} Courier</figcaption>
                            </figure>
                            <div>
                                <div className="font-semibold text-lg">{courierData?.fullName} </div>
                                <div className="text-gray-600 text-lg">{courierData?.phoneNumber}</div>
                                <div className="text-gray-600 text-lg">{courierData?.email}</div>
                            </div>
                        </div>
                        <div className="flex-1  text-black font-semibold text-lg">
                            <div>
                                <div className="">Total Earning : <span className="font-semibold"> ${stats?.totalEarnings}</span>
                            </div>
                            </div>
                            <div>
                                <div className="">Total Delivery : <span className="font-semibold"> ${stats?.totalDeliveries}</span></div>
                                
                            </div>
                            <div>
                                <div className="">Review Get : <span className="font-semibold">{stats?.ratingsReceived}</span></div>
                                
                            </div>
                            <div>
                                <div className="">Review Provide : <span className="font-semibold">{stats?.ratingsGiven}</span></div>
                            
                            </div>
                            <div>
                                <div className="">Total Platform-fee : <span className="font-semibold"> ${stats?.totalPlatformFee}</span></div>
                            
                            </div>
                            <div>
                                <div className="">Payable Platform-fee : <span className="font-semibold"> ${stats?.pendingPlatformFee}</span></div>
                            
                            </div>


                        </div>
                    </div>
                    {/* Order and Review Details */}
                    
                   <div className="grid grid-cols-1 justify-between text-lg">
                        {orderData?.length === 0 ? 
                        
                        <div className="text-center text-gray-500 mt-6">No orders details found for this sender.</div>
                            :
                            <>
                                {
                                    orderData?.map((order, idx) => <OrderDetails key={idx} details={order} from='CourierPage'/>)
                                }
                            </>
                        }
                       
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;