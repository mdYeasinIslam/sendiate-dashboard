
import React from 'react';

export default function PageWrapper({
    title,
}: Readonly<{
    title?: string;
}>) {
    
    return (
        <>
            <header className=" flex h-16 shrink-0 items-center  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-16 lg:px-6 ">
                <div className="flex items-center justify-between gap-2  w-full">
                    <div className="flex items-center gap-2">
                      
                        <h1 className="text-2xl font-semibold">{title}</h1>
                    </div>
                    <div className=" p-4 flex items-center gap-3">
        <img src="https://i.pravatar.cc/150?img=1" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">Alex ben</p>
          <p className="text-sm ">alex@gmail.com</p>
        </div>
      </div>
                </div>
            </header>
        </>
    );
}
