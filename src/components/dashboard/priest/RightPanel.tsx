"use client";

import TabButtons from "@/components/TabButtons";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  Megaphone,
  Users,
} from "lucide-react";
import React from "react";
import MembersSection from "./right-panel/MembersSection";
import BookingSection from "./right-panel/BookingSection";
import SchedulingSection from "./right-panel/SchedulingSection";
import AnalyticsSection from "./right-panel/AnalyticsSection";
import PriestAnnouncements from "./right-panel/AnnouncementsSection";
import { RightPanelProps, TabType } from "@/types/types";


export default function RightPanel({
  activeTab,
  setActiveTab,
}: RightPanelProps) {
  const tabs = [
    { id: "members", label: "Parish Leaders", icon: Users },
    { id: "bookings", label: "Bookings", icon: ClipboardList },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "scheduling", label: "Scheduling", icon: CalendarDays },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <>
      <section className="w-3/4 overflow-y-auto">
        {/* Header with Tabs */}
        <div className="bg-white border-b border-slate-200 p-5 sticky top-0 z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-start gap-3">
            {/* Tab Navigation */}
            {tabs.map((tab) => (
              <TabButtons
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                onClick={(id) => setActiveTab(id as TabType)}
              />
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "members" && <MembersSection />}
          {activeTab === "bookings" && <BookingSection />}
          {activeTab === "announcements" && <PriestAnnouncements />}
          {activeTab === "scheduling" && <SchedulingSection />}
          {activeTab === "analytics" && <AnalyticsSection />}
        </div>
      </section>
    </>
  );
}
