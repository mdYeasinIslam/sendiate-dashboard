'use client'

import type React from "react"; // Import React
import { useEffect } from "react";
import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import useUnreadCount from "@/hooks/useChat";
import { useDispatch } from "react-redux";
import { setCount } from "@/redux/services/slicer/chat/chatSlice";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const { unreadCount } = useUnreadCount();
  // Log unread count in the console
  useEffect(() => {
    if (unreadCount !== null) {
      dispatch(setCount(unreadCount as any));
      console.log("Unread count:", unreadCount); // Log unread count when updated
    }
  }, [unreadCount]); // Re-run this effect when unreadCount changes

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Check if the token is present in localStorage
    if (!token) {
      // If no token is found, redirect to the login page
      if (typeof window !== "undefined") {
        window.location.href = "/logIn"; // Redirect to login page
      }
    }
  }, []);

  return (
    <main>
      <div className="min-h-screen">
        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden fixed left-4 top-4 z-[50]">
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
        <div className="hidden lg:block fixed inset-y-0 text-black left-0 w-64">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 h-screen overflow-y-hidden">
          <main className="border h-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </main>
  );
}
