"use client";

import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ClipboardList,
  Clock,
  Plus,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { ScheduleMassDrawer } from "./ScheduleMassDrawer";
import { AddAnnouncementDrawer } from "./AddAnnouncementDrawer";
import {
  LeftPanelProps,
  OutstationMonthlyStats,
  ParishPriestMonthlyStats,
  PriestMonthlyStats,
  SystemUser,
  MemberProfile,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getPriestMonthlyStats } from "@/actions/priest/priest";

// Type guards
function isParishPriestStats(
  stats: PriestMonthlyStats
): stats is ParishPriestMonthlyStats {
  return "new_members" in stats;
}
function isOutstationPriestStats(
  stats: PriestMonthlyStats
): stats is OutstationMonthlyStats {
  return "completed_services" in stats;
}


export default function LeftPanel({ setActiveTab }: LeftPanelProps) {
  const [user, setUser] = useState<Partial<MemberProfile> | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const u = useAuthStore.getState().user;
    setUser(u ?? null);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


  const { data: statsData } = useQuery<PriestMonthlyStats[]>({
    queryKey: ["priestMonthlyStats"],
    queryFn: getPriestMonthlyStats,
  });

  const latestStats = statsData?.[0];

  return (
    <div className="w-1/4 bg-white border-r border-slate-200 p-6 overflow-y-auto">
      {/* User Profile */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
        <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          FR
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">
            Fr. {user?.first_name} {user?.last_name}
          </h3>
          <p className="text-sm text-slate-500">Head Priest</p>
        </div>
      </div>

      {/* Current Date/Time */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <p className="text-xs text-slate-500 mb-1">Today</p>
        <div className="flex justify-between">
          <p className="text-sm font-medium text-slate-800">
            {currentTime.toLocaleDateString("en-UK")}
          </p>
          <p className="text-sm font-medium text-slate-800">
            {currentTime.toLocaleTimeString("en-UK")}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">
          {user?.role === "parishPriest"
            ? "Parish Overview Stats"
            : "Outstation Overview Stats"}
        </h4>
        <div className="space-y-3">
          {user?.role === "parishPriest" &&
            latestStats &&
            isParishPriestStats(latestStats) && (
              <>
                <StatCard
                  icon={<Users size={16} className="text-blue-600" />}
                  label="Total Members"
                  value={latestStats.new_members}
                  bg="bg-blue-50"
                />
                <StatCard
                  icon={<UserCheck size={16} className="text-emerald-600" />}
                  label="New Priests"
                  value={latestStats.new_priests}
                  bg="bg-emerald-50"
                />
                <StatCard
                  icon={<TrendingUp size={16} className="text-purple-600" />}
                  label="New Catechists"
                  value={latestStats.new_catechists}
                  bg="bg-purple-50"
                />
                <StatCard
                  icon={<Clock size={16} className="text-yellow-600" />}
                  label="Total Bookings"
                  value={latestStats.total_bookings}
                  bg="bg-yellow-50"
                />
                <StatCard
                  icon={<ClipboardList size={16} className="text-pink-600" />}
                  label="Approved Bookings"
                  value={latestStats.approved_bookings}
                  bg="bg-pink-50"
                />
              </>
            )}

          {user?.role === "outstationPriest" &&
            latestStats &&
            isOutstationPriestStats(latestStats) && (
              <>
                <StatCard
                  icon={<Clock size={16} className="text-yellow-600" />}
                  label="Total Bookings"
                  value={latestStats.total_bookings}
                  bg="bg-yellow-50"
                />
                <StatCard
                  icon={<ClipboardList size={16} className="text-pink-600" />}
                  label="Approved Bookings"
                  value={latestStats.approved_bookings}
                  bg="bg-pink-50"
                />
                <StatCard
                  icon={<Users size={16} className="text-green-600" />}
                  label="Completed Services"
                  value={latestStats.completed_services}
                  bg="bg-green-50"
                />
              </>
            )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">
          Quick Actions
        </h4>
        <div className="space-y-2">
          <ScheduleMassDrawer triggerAsChild>
            <Button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
              <CalendarDays size={14} /> Schedule Priest
            </Button>
          </ScheduleMassDrawer>
          <AddAnnouncementDrawer triggerAsChild>
            <Button className="w-full px-4 py-2 border border-slate-300 bg-white text-slate-700 text-left rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm">
              <Plus size={14} /> Add Announcement
            </Button>
          </AddAnnouncementDrawer>
          <Button
            onClick={() => setActiveTab("bookings")}
            className="w-full px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm"
          >
            <ClipboardList size={14} /> View Bookings
          </Button>
        </div>
      </div>
    </div>
  );
}

// StatCard
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bg: string;
}
function StatCard({ icon, label, value, bg }: StatCardProps) {
  return (
    <div className={`flex items-center justify-between p-3 ${bg} rounded-lg`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-slate-700">{label}</span>
      </div>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}
