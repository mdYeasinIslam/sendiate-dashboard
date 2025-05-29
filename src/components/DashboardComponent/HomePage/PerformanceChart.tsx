
'use client'
import { TooltipProps } from "recharts";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useGetDashboardStatsQuery, useGetHomePageApiQuery } from "@/redux/services/homePageApis";

type PerformanceType = {
  month: string;
  sender: number;
  courier: number;
  fees: number;
  cancel: number;
};

const dummyData: { [year: string]: PerformanceType[] } = {
  "2025": [
    { month: "Jan", sender: 100, courier: 30, fees: 800, cancel: 10 },
    { month: "Feb", sender: 200, courier: 40, fees: 1000, cancel: 12 },
    { month: "Mar", sender: 90, courier: 20, fees: 600, cancel: 5 },
    { month: "Apr", sender: 70, courier: 10, fees: 400, cancel: 8 },
    { month: "May", sender: 150, courier: 35, fees: 900, cancel: 15 },
    { month: "Jun", sender: 160, courier: 33, fees: 920, cancel: 14 },
    { month: "Jul", sender: 200, courier: 50, fees: 1000, cancel: 20 },
    { month: "Aug", sender: 180, courier: 48, fees: 980, cancel: 17 },
    { month: "Sep", sender: 130, courier: 32, fees: 850, cancel: 12 },
    { month: "Oct", sender: 120, courier: 28, fees: 800, cancel: 11 },
    { month: "Nov", sender: 110, courier: 25, fees: 780, cancel: 10 },
    { month: "Dec", sender: 100, courier: 20, fees: 750, cancel: 9 },
  ],
  "2024": [
    { month: "Jan", sender: 80, courier: 20, fees: 600, cancel: 8 },
    { month: "Feb", sender: 130, courier: 25, fees: 700, cancel: 6 },
    { month: "Mar", sender: 90, courier: 20, fees: 600, cancel: 5 },
    { month: "Apr", sender: 70, courier: 10, fees: 400, cancel: 8 },
    { month: "May", sender: 150, courier: 35, fees: 900, cancel: 15 },
    { month: "Jun", sender: 160, courier: 33, fees: 920, cancel: 14 },
    { month: "Jul", sender: 200, courier: 50, fees: 1000, cancel: 20 },
    { month: "Aug", sender: 180, courier: 48, fees: 980, cancel: 17 },
    { month: "Sep", sender: 130, courier: 32, fees: 850, cancel: 12 },
    { month: "Oct", sender: 120, courier: 28, fees: 800, cancel: 11 },
    { month: "Nov", sender: 110, courier: 25, fees: 780, cancel: 10 },
    { month: "Dec", sender: 100, courier: 20, fees: 750, cancel: 9 },
  ],
};


const years = Object.keys(dummyData);

export const PerformanceChart = () => {
  
  const [selectedYear, setSelectedYear] = useState("2025");
  const {data,error,isLoading} = useGetDashboardStatsQuery(parseInt(selectedYear));
  console.log(data)
  const data1 = dummyData[selectedYear];
  // const { data, error, isLoading } = useGetHomePageApiQuery();
  if (isLoading) return <div>loading....</div>
  if (error) return <div>An Error is occur</div>
  // console.log(data)
  return (
    <div className="w-full p-4 rounded-lg shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Performance</h2>
        <select
          className=" px-3 py-1 rounded shadow-sm"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="w-full h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data1}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSender" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sender"
              stroke="#4ade80"
              fillOpacity={1}
              fill="url(#colorSender)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white shadow px-3 py-2 rounded text-sm">
        <p className="font-semibold">{label} 2025</p>
        <p>Sender: {data.sender}</p>
        <p>Courier: {data.courier}</p>
        <p>Fees: ${data.fees}</p>
        <p>Cancel: {data.cancel}</p>
      </div>
    );
  }

  return null;
};
