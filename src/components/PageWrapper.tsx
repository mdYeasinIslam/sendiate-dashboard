
import Image from 'next/image';
import React from 'react';
import Profile from './profile/Profile';

export default function PageWrapper({
    title,
}: Readonly<{
    title?: string;
}>) {
    
    return (
        <>
            <header className=" flex h-16 shrink-0 items-center  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-16 lg:px-8 ">
                <div className="flex items-center justify-between gap-2  w-full">
                    <div className="flex items-center gap-2">
                      
                        <h1 className="text-2xl font-semibold">{title}</h1>
                    </div>
                    <>
                   <Profile/>
                    </>
                </div>
            </header>
        </>
    );
}
