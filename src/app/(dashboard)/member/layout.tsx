"use client";
import React, { useState } from "react";
import Header from "@/components/dashboard/member/Header";
import Sidebar from "@/components/dashboard/member/Sidebar";

// app/(dashboard)/layout.tsx
import { ReactNode } from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Component */}
      <Header onMenuClick={toggleSidebar} />

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <main className="lg:ml-64 mt-16 min-h-[calc(100vh-4rem)]">
        <div className="p-4 md:p-6 lg:p-8 text-gray-800 dark:text-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
}
