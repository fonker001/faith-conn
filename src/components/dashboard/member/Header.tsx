"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Bell, Menu, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import type { MemberProfile } from "@/types/types";


interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuthStore((state) => state);

  // Safely get name & role from profile
  const u = user;
  
  const fullName =
  `${u?.first_name ?? ""} ${u?.last_name ?? ""}`.trim() ||
  "NameError";

  const role = user?.role || "RoleError";

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>

          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 hidden sm:block">
              Faith Connect
            </h1>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <Link
            href={"/notifications"}
            title="Notification"
            className="relative w-8 h-8 flex items-center justify-center rounded-full"
          >
            <Bell
              size={25}
              className="text-gray-600 dark:text-gray-300 cursor-pointer"
            />
            <span className="text-white text-sm absolute w-4 h-4 z-10 right-0 top-0 font-bold bg-red-500 rounded-full flex justify-center items-center">
              8
            </span>
          </Link>

          {/* User Name + Role */}
          <div className="hidden md:flex md:ml-5 flex-col items-end">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {fullName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {role}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </header>
  );
}
