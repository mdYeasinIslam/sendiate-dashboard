'use client';
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";


const CardSection = () => {
    
    const totalData=useSelector((state:RootState)=> state.dashboard);
  
    // if (!totalData.stats === null || !totalData.stats) {
    //     return <div><LoadingSpinner/></div>
    // }
    const cards = [
        { label: "Total Sender", value: totalData.stats?.totalSender?.toString() || "0" },
        { label: "Total Courier", value: totalData.stats?.totalCourier?.toString() || "0" },
        { label: "Total Cash", value: totalData?.stats?.totalCash.toFixed(2) || "0" },
        { label: "Platform Fees", value: totalData?.stats?.totalFee || "0"},
    ];
    return (
        <div className="w-full  rounded-lg  flex flex-col md:flex-row gap-4  px-5 lg:px-0">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="flex-1 bg-white rounded-lg p-4 flex flex-col items-start justify-center min-w-[150px]"
                >
                    <span className="text-gray-600 text-lg font-medium"> {card?.label}</span>
                    <span className="mt-2 text-2xl md:text-3xl font-semibold text-gray-700">{(totalData?.stats?.totalCash ||totalData?.stats?.totalFee) && "$ "} {card?.value}</span>
                    
                   
                </div>
            ))}
        </div>
    );
}

export default CardSection