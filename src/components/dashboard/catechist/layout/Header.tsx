"use client";

import { CircleX, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./ProfileDropdown";
import GlobalSearch from "./GlobalSearch";
import SettingsModal from "../settings/SettingsModal";

export default function Header() {

    // const [catechistNotifications, setCatechistNotifications] = useState(8);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-200">Catechist Dashboard</h1>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Manage faith formation programs and student progress
                </p>
            </div>
            <div className="hidden md:block md:w-96 flex-shrink-0">
                <GlobalSearch />
            </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* <button className="text-sm relative text-blue-600 dark:text-blue-400 font-medium hover:underline">
            <Bell className={`inline-block ${catechistNotifications > 9 ? "w-8 h-8" : "w-7 h-7"} mr-1`} />
            <span className={`text-white text-sm absolute ${catechistNotifications === 0 ? "hidden" : ""} ${catechistNotifications > 9 ? "w-5 h-5" : "w-4 h-4"} z-10 right-1 -top-1 font-bold bg-red-500 rounded-full flex justify-center items-center`}>{catechistNotifications}</span>
          </button> */}
          <button onClick={() => setIsSearchVisible(true)} className="p-2 md:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Open search">
            <Search />
          </button>
          <NotificationBell />
          <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-800 dark:text-blue-200 font-semibold">
            CA
          </div>
          {isProfileOpen && (
            <div className="absolute right-2 mt-2 z-30">
            <ProfileDropdown onClose={() => setIsProfileOpen(false)} onOpenSettings={() => {setIsProfileOpen(false); setIsSettingsOpen(true);}} />
            </div>
        )}
        </div>
      </div>
      {/* Mobile Search Bar (only when visible) */}
    {isSearchVisible && (
        <div className="md:hidden ms-2 ps-2 mb-4 relative">
        <div className="flex items-center">
            <div className="flex-1 relative">
                <GlobalSearch isMobile={true} />
            </div>
            <button onClick={() => setIsSearchVisible(false)} className="ml-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" aria-label="Close search">
                <CircleX />
            </button>
        </div>
        </div>
    )}
    <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </header>
  );
}