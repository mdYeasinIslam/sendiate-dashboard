
import React from "react";
import CardSection from '@/components/DashboardComponent/HomePage/CardSection';
import { PerformanceChart } from '@/components/DashboardComponent/HomePage/PerformanceChart';
import PageWrapper from '@/components/PageWrapper';

export default function Page() {
    //  const [selectedYear, setSelectedYear] = useState("2025");
    
    
    //   const { data } = useGetDashboardStatsQuery(parseInt(selectedYear)) as { data?: DashboardStatsResponse; error?: unknown; isLoading: boolean };
    //  console.log(data)
    
    return (
        <section className='bg-[#F8F8F8] h-screen  '>
                <PageWrapper title="Overview" />
            <div className="lg:px-6 space-y-5">
                <CardSection />
                <PerformanceChart/>
            </div>
        </section>
    );
}
