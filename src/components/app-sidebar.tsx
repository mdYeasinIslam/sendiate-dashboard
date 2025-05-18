'use client';

import * as React from 'react';
import { Banknote, LayoutGrid, Package, Truck, UserRound, MessageCircle, Bell, DollarSign, MessageSquare } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import Image from 'next/image';

// This is sample data.
const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/',
            icon: LayoutGrid,
            isActive: true,
        },
        {
            title: 'Sender',
            url: 'sender',
            icon: UserRound,
        },
        {
            title: 'Courier',
            url: 'courier',
            icon: Package,
        },
        {
            title: 'Vehicle',
            url: 'vehicle',
            icon: Truck,
        },
        {
            title: 'Pricing',
            url: 'pricing',
            icon: Banknote,
        },
        {
            title: 'Transaction',
            url: 'transaction',
            icon: DollarSign,
        },
        {
            title: 'Chat',
            url: '#',
            icon: MessageCircle,
        },
        {
            title: 'Notification',
            url: '#',
            icon: Bell,
        },
        {
            title: 'Platform Fee',
            url: '#',
            icon: Banknote,
        },
        {
            title: 'Feedback',
            url: '#',
            icon: MessageSquare,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} className='bg-white'>
            <SidebarHeader className='bg-white'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip={'Sendiate'} size={'lg'}>
                            <Image
                                src="/images/icon.png"
                                alt="logo"
                                width={300}
                                height={300}
                                className="h-8 w-8"
                            />
                            <span className="text-2xl font-bold">{'Sendiate'}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className='bg-white'>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className='bg-white'></SidebarFooter>
            <SidebarRail className='' />
        </Sidebar>
    );
}
