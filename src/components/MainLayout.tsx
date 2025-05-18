import { AppSidebar } from '@/components/app-sidebar';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider className=''>
            <AppSidebar />
            <SidebarInset className=''>
                <div>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
