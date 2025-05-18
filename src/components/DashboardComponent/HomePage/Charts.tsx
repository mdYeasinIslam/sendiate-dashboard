import React from 'react'

const Charts = () => {
return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="m-0 font-medium text-2xl">Performance</h2>
            <div className="flex items-center gap-2">
                <button
                    className="bg-[#F4FBF6] border-none rounded-lg px-4 py-2 flex items-center cursor-pointer text-base"
                >
                    <span className="mr-2 flex items-center">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="2" rx="1" fill="#6FCF97"/><rect x="3" y="6" width="18" height="16" rx="2" fill="#fff" stroke="#6FCF97" strokeWidth="2"/><rect x="7" y="10" width="2" height="2" rx="1" fill="#6FCF97"/><rect x="11" y="10" width="2" height="2" rx="1" fill="#6FCF97"/><rect x="15" y="10" width="2" height="2" rx="1" fill="#6FCF97"/></svg>
                    </span>
                    2025
                    <svg className="ml-1" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#6FCF97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
            </div>
        </div>
        <div className="bg-white rounded-2xl p-0 min-h-[400px] relative overflow-hidden">
            {/* Chart area */}
            {/* <PerformanceChart /> */}
        </div>
    </div>
)
}

export default Charts