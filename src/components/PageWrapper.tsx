import React from 'react';

// import { Separator } from '@/components/ui/separator';
// import { SidebarTrigger } from '@/components/ui/sidebar';
export default function PageWrapper({
    children,
    title,
}: Readonly<{
    children: React.ReactNode;
    title?: string;
}>) {
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center justify-between gap-2 px-4 w-full">
                    <div className="flex items-center gap-2">
                        {/* <SidebarTrigger className="-ml-1" /> */}
                        {/* <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        /> */}
                        <h1 className="text-lg font-semibold">{title}</h1>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">user</h1>
                    </div>
                </div>
            </header>
            <div>{children}</div>
        </>
    );
}
