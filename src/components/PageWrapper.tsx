import React from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from './ui/separator';

export default function PageWrapper({
    
    title,
}: Readonly<{
    title?: string;
}>) {
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center justify-between gap-2 px-4 w-full">
                    <div className="flex items-center gap-2">
                        {/* <SidebarTrigger className="-ml-1 lg:hidden" /> */}
                        {/* <Separator
                            orientation="vertical"
                            className="pr-2 data-[orientation=vertical]:h-4 lg:hidden"
                        /> */}
                        <h1 className="text-lg font-semibold">{title}</h1>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">user</h1>
                    </div>
                </div>
            </header>
        </>
    );
}
