
import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import type React from "react"; // Import React

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
 
      <main>
        <div className="min-h-screen">
          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger
              asChild
              className="lg:hidden fixed left-4 top-4 z-[50]"
            >
              <Button className="bg-white  border" size="icon">
                <Menu className="h-6 w-6 text-black bg-white" />
            </Button>
          
              </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-white">
            <SheetHeader className="sr-only">
                <SheetTitle>Sidebar</SheetTitle> {/* Hidden from view but accessible */}
            </SheetHeader>
            <Sidebar />
            </SheetContent>
          </Sheet>

          {/* Desktop Nav */}
          <div className="hidden lg:block fixed inset-y-0  text-black left-0 w-64  ">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="lg:pl-64 h-screen overflow-y-hidden">
            {/* <Header /> */}
            <main className=" border  h-full  overflow-y-auto ">
              {children}
            </main>
          </div>
        </div>
      </main>
  );
}