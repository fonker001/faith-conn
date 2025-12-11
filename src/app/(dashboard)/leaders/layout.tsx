'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Home, Users, Calendar, FileText, Megaphone, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function LeaderLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/leaders/home", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/leaders/members", label: "Members", icon: <Users size={18} /> },
    { href: "/leaders/attendance", label: "Attendance", icon: <Calendar size={18} /> },
    { href: "/leaders/minutes", label: "Minutes", icon: <FileText size={18} /> },
    { href: "/leaders/announcements", label: "Announcements", icon: <Megaphone size={18} /> },
    { href: "/leaders/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5">
          <h1 className="text-xl font-bold text-blue-700">
            Parish<span className="text-gray-500"> Leaders</span>
          </h1>
        </div>
        <nav className="px-3 space-y-1 flex-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition ${
                pathname === link.href ? "bg-blue-100 text-blue-700 font-medium" : ""
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
