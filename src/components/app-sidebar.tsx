'use client';

import * as React from 'react';
import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react';

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
            title: 'Playground',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: 'Models',
            url: '#',
            icon: Bot,
        },
        {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
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
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
