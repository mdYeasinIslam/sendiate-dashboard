import Link from "next/link";
import Image from "next/image";
import Logout from '../../components/DashboardComponent/Logout/page'
// import logo from "/images/login/logo.png";
import { Banknote, LayoutGrid, Package, Truck, UserRound, MessageCircle, Bell, DollarSign, MessageSquare } from 'lucide-react';
import { Button } from "../ui/button";
import NavLink from "./NavLink";

const navLinks = [
    { icon: <LayoutGrid />, href: '/', label: 'Dashboard' },
    { icon: <UserRound />, href: '/sender', label: 'Sender' },
    { icon: <Package />, href: '/courier', label: 'Courier' },
    { icon: <Truck />, href: '/vehicle', label: 'Vehicle' },
    { icon: <Banknote />, href: '/pricing', label: 'Pricing' },
    { icon: <DollarSign />, href: '/transaction', label: 'Transaction' },
    { icon: <MessageCircle />, href: '/chat', label: 'Chat' },
    { icon: <Bell />, href: '/notification', label: 'Notification' },
    { icon: <Banknote />, href: '/platform', label: 'Platform Fee' },
    { icon: <MessageSquare />, href: '/feedback', label: 'Feedback' },
];


function Sidebar() {
  return (
    <div className="flex px-5 flex-col h-full bg-white">
      <div className="pb-6 pt-4">
        <Link href="/" className="flex items-center gap-2">
           <Image
                src="/images/icon.png"
                alt="logo"
                width={300}
                height={300}
                className="h-8 w-8"
            />
            <span className="text-2xl font-bold">{'Sendiate'}</span>
        </Link>
      </div>
      <nav className="flex justify-between h-full mb-10 flex-col">
        <div className="flex-1 h-full flex flex-col gap-4 pb-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <NavLink key={index} icon={link.icon} href={link.href}>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          {/* logout */}
          
            <Logout></Logout>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;