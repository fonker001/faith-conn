import React from "react";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
      <div className="text-2xl text-center mx-auto mb-1">
        <Icon size={40} className="text-[#D4AF37] mx-auto" />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
        {value}
      </p>
    </div>
  );
}
