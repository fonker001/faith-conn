// Schedule component displays the mass schedule table for the dashboard
import React from "react";
import { Card } from "../../../ui/card";

const Schedule = () => {
  // Static schedule data (this can later be fetched from an API)
  const schedules = [
    {
      date: "2025-10-01",
      time: "10:00 AM",
      location: "Main Church",
      priest: "Fr. John Doe",
      choir: "St. Monica",
      intentions: "For the sick and elderly",
    },
    {
      date: "2025-10-02",
      time: "5:00 PM",
      location: "St. Mary's",
      priest: "Fr. Jane Smith",
      choir: "St. Charles",
      intentions: "For world peace",
    },
    {
      date: "2025-10-03",
      time: "8:00 AM",
      location: "Main Church",
      priest: "Fr. John Doe",
      choir: "St. Paul",
      intentions: "For families",
    },
    {
      date: "2025-10-04",
      time: "6:00 PM",
      location: "St. Mary's",
      priest: "Fr. Jane Smith",
      choir: "St. Francis",
      intentions: "For youth",
    },
  ];

  return (
    <div className="h-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 px-1 dark:text-gray-100">
        Service Times
      </h2>

      {/* Card container for schedule table */}
      <Card className="bg-white border-[#D4AF37]/20 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        {/* Desktop table view */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 text-[#0D090A] text-sm font-semibold uppercase tracking-wider dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
              <tr>
                {/* Table headers */}
                <th className="px-4 py-3 text-left ">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left ">Location</th>
                <th className="px-4 py-3 text-left ">Priest</th>
                <th className="px-4 py-3 text-left ">Choir</th>
                <th className="px-4 py-3 text-left ">Intentions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Render each schedule row */}
              {schedules.map((schedule, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    {schedule.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    {schedule.time}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    {schedule.location}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    {schedule.priest}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    {schedule.choir}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {schedule.intentions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-friendly layout */}
        <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {schedules.map((schedule, idx) => (
            <div
              key={idx}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base dark:text-gray-100">
                    {schedule.date}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {schedule.time}
                  </p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {schedule.location}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Priest:</span> {schedule.priest}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Choir:</span> {schedule.choir}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Intentions:</span>{" "}
                  {schedule.intentions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Schedule;
