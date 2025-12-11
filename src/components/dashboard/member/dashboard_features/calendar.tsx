"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Group from "@/components/dashboard/member/dashboard_features/group";

interface GroupDetail {
  id: string;
  name: string;
}

interface Profile {
  groups_count: number;
  groups_details: GroupDetail[];
}

// Example: pass the profile as a prop
interface CalendarComponentProps {
  profile?: Profile | null;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ profile }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = useMemo(
    () => [
      { id: 1, title: "Adoration", date: "2025-10-03", color: "#EF4444" },
      { id: 2, title: "Choir", date: "2025-10-04", color: "#3B82F6" },
      { id: 3, title: "Youth Meeting", date: "2025-10-05", color: "#10B981" },
    ],
    []
  );

  const eventsByDate = useMemo(() => {
    const map: Record<string, typeof events> = {};
    events.forEach((event) => {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    });
    return map;
  }, [events]);

  const goToPreviousMonth = () =>
    setSelectedDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );

  const goToNextMonth = () =>
    setSelectedDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} />);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      const isSelected = day === selectedDate.getDate();
      const hasEvent = eventsByDate[dateStr]?.length > 0;

      days.push(
        <div
          key={day}
          className="flex flex-col items-center justify-start p-1 aspect-square"
        >
          <button
            onClick={() => setSelectedDate(new Date(year, month, day))}
            className={`w-7 h-7 flex items-center justify-center text-xs rounded-full transition-colors ${isSelected
              ? "bg-blue-500 text-white"
              : isToday
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                : hasEvent
                  ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
          >
            {day}
          </button>
        </div>
      );
    }
    return days;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3 px-1 dark:text-gray-100">
        Calendar & Events
      </h2>

      <Card className="bg-white shadow-sm border-[#D4AF37]/20 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Calendar */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button onClick={goToPreviousMonth} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                  <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h3>
                <button onClick={goToNextMonth} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                  <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <CalendarDays className="w-4 h-4 text-gray-400 dark:text-gray-300" />
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d} className="text-center text-[10px] font-medium text-gray-500 py-0.5 dark:text-gray-400">{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1 overflow-hidden" style={{ height: "220px" }}>
              {renderCalendar()}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="md:col-span-1 lg:col-span-1 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Upcoming Events</h3>
              <Link href="/user/parish_announcements" className="text-xs text-blue-600 hover:underline dark:text-blue-400">View all</Link>
            </div>
            <div className="space-y-2 pr-1 custom-scrollbar" style={{ maxHeight: "220px", overflowY: "auto" }}>
              {events.map(event => (
                <div key={event.id} className="flex items-start gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: event.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: event.color }}>{event.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Groups */}
          <div className="md:col-span-2 lg:col-span-1 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4 dark:border-gray-700">
            {!profile || profile.groups_count === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No groups</p>
            ) : (
              <Group
                total={profile.groups_count}
                recent={profile?.groups_details?.map(g => ({ id: g.id, title: g.name })) ?? []}
              />
            )}
          </div>


        </div>
      </Card>
    </div>
  );
};

export default CalendarComponent;
