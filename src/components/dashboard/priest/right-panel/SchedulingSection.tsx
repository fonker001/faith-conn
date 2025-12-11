"use client";
import React, { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  User,
  LucideCalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScheduleMassDrawer } from "../ScheduleMassDrawer"; // you can rename this to SchedulePriestDrawer if needed

export default function SchedulingSection() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Example data – priest assignments
  const assignments = [
    {
      id: 1,
      date: "2025-10-20",
      priest: "Fr. Michael Santos",
      time: "9:00 AM",
    },
    {
      id: 2,
      date: "2025-10-25",
      priest: "Fr. Joseph Rivera",
      time: "6:30 PM",
    },
    {
      id: 3,
      date: "2025-10-28",
      priest: "Fr. Paul Dela Cruz",
      time: "10:00 AM",
    },
  ];

  // Month data
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // Calendar rendering logic
  const renderCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        i
      ).padStart(2, "0")}`;
      const assignment = assignments.find((a) => a.date === dateStr);
      const isSelected = i === selectedDate.getDate();

      days.push(
        <div
          key={i}
          onClick={() => setSelectedDate(new Date(year, month, i))}
          className={`aspect-square border border-slate-200 rounded-lg p-2 cursor-pointer transition-colors ${
            isSelected
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-50 text-slate-700"
          }`}
        >
          <div className="text-sm font-medium">{i}</div>

          {assignment ? (
            <div className="mt-1 text-xs bg-blue-100 text-blue-700 rounded px-1 py-0.5 truncate">
              {assignment.priest.split(" ")[1]}{" "}
              {/* Just surname or short name */}
            </div>
          ) : (
            <div className="mt-1 text-xs text-slate-400 italic"></div>
          )}
        </div>
      );
    }

    return days;
  };

  // Month navigation handlers
  const handlePrevMonth = () => {
    setSelectedDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setSelectedDate(new Date(year, month + 1, 1));
  };

  // Upcoming assignments list
  const upcomingAssignments = assignments
    .filter((a) => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">Scheduling</h2>

        <ScheduleMassDrawer triggerAsChild>
          <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <LucideCalendarDays size={16} /> Schedule Priest
          </Button>
        </ScheduleMassDrawer>
      </div>

      {/* Main Card */}
      <Card className="bg-white shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>

              <h3 className="text-base font-semibold text-gray-800">
                {monthNames[month]} {year}
              </h3>

              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>

          {/* Upcoming Assignments Section */}
          <div className="md:border-l md:border-gray-200 md:pl-4 border-t md:border-t-0 border-gray-200 pt-3 md:pt-0">
            <h3 className="text-sm font-semibold mb-2 text-gray-800 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              Upcoming Assignments
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {upcomingAssignments.length > 0 ? (
                upcomingAssignments.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-blue-600 truncate">
                        {a.priest}
                      </p>
                      <p className="text-sm text-gray-500">
                        {a.date} — {a.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No upcoming assignments.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
