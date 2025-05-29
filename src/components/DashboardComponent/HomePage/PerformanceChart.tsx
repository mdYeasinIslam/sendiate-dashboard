
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
import { useEffect, useState } from "react";
import { useGetDashboardStatsQuery } from "@/redux/services/Apis/homePageApis/homePageApis";
import { DashboardStatsResponse, PerformanceType } from "@/type/dashChartType";
import { setDashboardStats } from "@/redux/services/slicer/dashboard/dashboardSlice";
import LoadingSpinner from "@/app/loading";
import { useAppDispatch } from "@/redux/hooks";


export const PerformanceChart = () => {
  const dispatch = useAppDispatch()

  const [selectedYear, setSelectedYear] = useState("2025");


  const { data, error, isLoading } = useGetDashboardStatsQuery(parseInt(selectedYear)) as { data?: DashboardStatsResponse; error?: unknown; isLoading: boolean };
 

  const chatData = data?.data?.performanceData as PerformanceType[] 
  useEffect(() => {
    if (data?.data) {
      const { performanceData, totalSender, totalCourier, year } = data.data;
      // Provide default values if any are undefined
      dispatch(setDashboardStats({
        performanceData: performanceData ?? [],
        totalSender: totalSender ?? 0,
        totalCourier: totalCourier ?? 0,
        year: year ?? Number(selectedYear),
      }));
    }
  },[data, dispatch, selectedYear])
  if (isLoading) return <div><LoadingSpinner/></div>
  if (error) return <div>An Error is occur</div>

  return (
    <div className="w-full p-4 rounded-lg shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Performance</h2>
        <select
          className=" px-3 py-1 rounded shadow-sm"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {['2024', '2025'].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="w-full h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chatData}
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
        <p>Total: {data.total}</p>
      </div>
    );
  }

  return null;
};
