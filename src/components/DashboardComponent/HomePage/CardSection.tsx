import React from 'react'

const cards = [
    { label: "Total Sender", value: "20000" },
    { label: "Total Courier", value: "5000" },
    { label: "Total Cash", value: "$6000" },
    { label: "Platform Fees", value: "$6000" },
];

const CardSection = () => {
    return (
        <div className="w-full  rounded-lg  flex flex-col md:flex-row gap-4  px-5 lg:px-0">
            {cards.map((card, idx) => (
                <div
                    key={card.label}
                    className="flex-1 bg-white rounded-lg p-4 flex flex-col items-start justify-center min-w-[150px]"
                >
                    <span className="text-gray-600 text-lg font-medium">{card.label}</span>
                    <span className="mt-2 text-2xl md:text-3xl font-semibold text-gray-700">{card.value}</span>
                    
                   
                </div>
            ))}
        </div>
    );
}

export default CardSection