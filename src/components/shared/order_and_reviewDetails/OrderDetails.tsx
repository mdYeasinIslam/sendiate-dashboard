import { OrderAndReviewDetails } from '@/type/SenderPagesType'
import Image from 'next/image'
import React from 'react'

const OrderDetails = ({ details, from }: { details: OrderAndReviewDetails, from: string }) => {
    const checkStat = details?.status === 'DELIVERED';
    return (
      <section>
            
        <div className="flex flex-col md:flex-row justify-between gap-8 mt-6 text-lg">
            {/* Order Details */}
            <div className="flex-1 text-black font-medium">
                <div className="mb-2  ">Order Number: <span className="font-normal"> {details?.orderId}</span></div>
                <div className="mb-2  ">
                  Courier Date:{" "}
                  <span className="font-normal"> 
                    {details?.deliveryTime
                      ? new Date(details.deliveryTime).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </div>
                <div className="mb-2  ">Pick Up Address: <span className="font-normal"> {details?.pickupInfo?.address}</span></div>
                <div className="mb-2  ">Drop–Off Address: <span className="font-normal"> {checkStat?`${details?.receiverInfo?.address}` : 'N/A'}</span></div>
                <div className="mb-2  ">Vehicle Type: <span className="font-normal"> {checkStat?`${details?.vehicleType}` : 'N/A'}</span></div>
                <div className="mb-2  ">Amount: <span className="font-normal"> ${checkStat?`${details?.price}` : 'N/A'}</span></div>
                <div className="mb-2   flex items-center gap-2">
                    Status: 
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs ">{details?.status}</span>
                </div>
                <div className="mb-2  ">Payment Type: <span className="font-normal"> {details?.paymentMethod}</span></div>
            </div>
            {/* Review Details */}
            <div className="flex-1 ">
                <div className="flex items-center gap-2 mb-2">
                    <Image 
                        src={details?.courier?.profileImage || 'https://randomuser.me/api/portraits'  }
                        alt={'Reviwer image'}
                        width={28} height={28}
                        className="w-7 h-7 rounded-full object-cover" />
                        {
                        from === 'SenderPage' ? <span className="font-medium">{details?.sender?.fullName}</span> :  <span className="font-medium">{details?.courier?.fullName}</span>
                        }
                   
                </div>
                {
                    checkStat ? <>
                          <div className="mb-2">
                                <div className="text-gray-600  font-medium">Review Provide:</div>
                                {
                                    details?.senderReview && details?.senderReview?.length > 0 ? (
                                        <div className="flex items-center justify-between gap-2">

                                            <span className="text-gray-700 text-sm">{details?.senderReview}</span>
                                            {/* showing Ratings */}
                                            <p className='flex items-center gap-1'>

                                                <span className="flex items-center text-orange-400 text-xs">
                                                    {Array(details?.senderRating).fill(0).map((_, i) => (
                                                        <svg key={i} width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                                                    ))}
                                            </span>
                                            <span className='font-semibold text-sm'>{details?.senderRating}</span>
                                            </p>
                                         </div>
                                    ) : (
                                        <div className="text-gray-500 text-sm">No review provided</div>
                                    )
                                }
                            
                            </div>
                            <div>
                                <div className="text-gray-600 text-lg font-medium">Review Get:</div>
                                {
                                    details?.courierReview && details?.courierReview.length > 0 ? (
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-gray-700 text-sm">{details?.courierReview}</span>
                                            <p className='flex items-center gap-1'>

                                                <span className="flex items-center text-orange-400 text-xs">
                                                    {Array(details?.courierRating).fill(0).map((_, i) => (
                                                        <svg key={i} width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                                                    ))}
                                                </span>
                                                 <span className='font-semibold text-sm'>{details?.courierRating}</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 text-sm">No review provided</div>
                                    )
                                }
                            
                            </div>
                        </>
                            : <div className="text-gray-500 text-sm">No review available</div>
                }
              
            </div>
        </div>
          <hr  className='my-5'/>
      </section>
  )
}

export default OrderDetails