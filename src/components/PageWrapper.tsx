
import Image from 'next/image';
import React from 'react';

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
                    <figure className=" md:flex items-center  gap-3">
                            <Image
                            src="https://i.pravatar.cc/150?img=1"
                            alt='pravatar'
                            width={500}
                            height={500}
                            className="w-10 h-10 rounded-full" />
                        <div className='hidden md:block'>
                            <p className="font-semibold">Alex ben</p>
                            <p className="text-sm ">alex@gmail.com</p>
                        </div>
                     </figure>
                </div>
            </header>
        </>
    );
}
