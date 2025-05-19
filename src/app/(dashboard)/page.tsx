import CardSection from '@/components/DashboardComponent/HomePage/CardSection';
import Charts from '@/components/DashboardComponent/HomePage/Charts';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';

export default function Page() {
    return (
        <section className='bg-[#F8F8F8] h-screen  lg:p-6'>
            <PageWrapper title="Overview" />
            <CardSection />
           
            <Charts/>
        </section>
    );
}
