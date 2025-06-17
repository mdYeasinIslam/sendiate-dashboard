'use client'
import React from "react";
import CardSection from '@/components/DashboardComponent/HomePage/CardSection';
import { PerformanceChart } from '@/components/DashboardComponent/HomePage/PerformanceChart';
import PageWrapper from '@/components/PageWrapper';

export default function Page() {
    
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
