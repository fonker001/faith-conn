// src/app/(dashboard)/leaders/attendance/page.tsx
"use client";

import { useState, useEffect } from "react";

type AttendanceStatus =
  | "present"
  | "absent-with-apology"
  | "absent-without-apology";

interface ParishMember {
  id: string;
  name: string;
}

const PARISH_MEMBERS: ParishMember[] = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Mary Johnson" },
  { id: "3", name: "Robert Davis" },
  { id: "4", name: "Sarah Wilson" },
  { id: "5", name: "David Brown" },
  { id: "6", name: "Lisa Garcia" },
];

const ATTENDANCE_STATUS_CONFIG = {
  present: {
    label: "Present",
    icon: "✅",
    color: "bg-emerald-100 text-emerald-800",
  },
  "absent-with-apology": {
    label: "Absent (with apology)",
    icon: "❌",
    color: "bg-amber-100 text-amber-800",
  },
  "absent-without-apology": {
    label: "Absent (no apology)",
    icon: "⚠️",
    color: "bg-rose-100 text-rose-800",
  },
};

export default function AttendanceManagementPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [attendanceRecords, setAttendanceRecords] = useState<
    Record<string, AttendanceStatus>
  >({});
  const [filterStatus, setFilterStatus] = useState<"all" | AttendanceStatus>(
    "all"
  );
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Initialize attendance records when date changes
  useEffect(() => {
    if (!selectedDate) {
      setAttendanceRecords({});
      setSaveStatus("idle");
      setHasUnsavedChanges(false);
      return;
    }

    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(
        `parish_attendance_${selectedDate}`
      );
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          // Validate data structure
          const isValid = PARISH_MEMBERS.every(
            (member) =>
              parsed[member.id] &&
              Object.keys(ATTENDANCE_STATUS_CONFIG).includes(parsed[member.id])
          );

          if (isValid) {
            setAttendanceRecords(parsed);
            setSaveStatus("saved");
            setHasUnsavedChanges(false);
            return;
          }
        } catch (error) {
          console.warn("Invalid attendance data in localStorage, resetting...", error);
        }
      }
    }

    // Initialize fresh records
    const initialRecords: Record<string, AttendanceStatus> = {};
    PARISH_MEMBERS.forEach((member) => {
      initialRecords[member.id] = "present";
    });
    setAttendanceRecords(initialRecords);
    setSaveStatus("idle");
    setHasUnsavedChanges(false);
  }, [selectedDate]);

  const handleStatusChange = (
    memberId: string,
    newStatus: AttendanceStatus
  ) => {
    setAttendanceRecords((prev) => {
      const updated = { ...prev, [memberId]: newStatus };
      setHasUnsavedChanges(true);
      setSaveStatus("idle");
      return updated;
    });
  };

  const getFilteredMembers = (): ParishMember[] => {
    if (filterStatus === "all") return PARISH_MEMBERS;
    return PARISH_MEMBERS.filter(
      (member) => attendanceRecords[member.id] === filterStatus
    );
  };

  const handleSaveAttendance = async () => {
    if (!selectedDate || saveStatus === "saving") return;

    setSaveStatus("saving");

    try {
      // Simulate API call delay (remove in production if using real API)
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (typeof window !== "undefined") {
        localStorage.setItem(
          `parish_attendance_${selectedDate}`,
          JSON.stringify(attendanceRecords)
        );
      }

      setSaveStatus("saved");
      setHasUnsavedChanges(false);

      // Auto-hide success message after 2 seconds
      setTimeout(() => {
        if (saveStatus === "saved") setSaveStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Failed to save attendance:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const isSunday = (dateString: string): boolean => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date.getDay() === 0; // Sunday = 0
  };

  const getMemberStatusCount = (status: AttendanceStatus): number => {
    return PARISH_MEMBERS.filter(
      (member) => attendanceRecords[member.id] === status
    ).length;
  };

  // Auto-select next Sunday if no date selected
  useEffect(() => {
    if (!selectedDate) {
      const today = new Date();
      const nextSunday = new Date(today);
      nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7));
      setSelectedDate(nextSunday.toISOString().split("T")[0]);
    }
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Attendance Management
        </h1>
        <p className="text-gray-600 mt-1">
          Record and track Sunday service attendance for parish members
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Date Selection */}
        <div className="mb-6">
          <label
            htmlFor="attendance-date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Service Date
          </label>
          <div className="flex items-center gap-3">
            <input
              id="attendance-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="2023-01-01"
              max="2025-12-31"
            />
            {!isSunday(selectedDate) && selectedDate && (
              <span className="text-sm text-rose-600 font-medium flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Select a Sunday
              </span>
            )}
          </div>
        </div>

        {/* Status Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                filterStatus === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Members ({PARISH_MEMBERS.length})
            </button>
            {(Object.keys(ATTENDANCE_STATUS_CONFIG) as AttendanceStatus[]).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                    filterStatus === status
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {ATTENDANCE_STATUS_CONFIG[status].icon}{" "}
                  {ATTENDANCE_STATUS_CONFIG[status].label} (
                  {getMemberStatusCount(status)})
                </button>
              )
            )}
          </div>
        </div>

        {/* Attendance Table */}
        {selectedDate && (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parish Member
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance Status
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getFilteredMembers().map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900">
                      {member.name}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ATTENDANCE_STATUS_CONFIG[
                            attendanceRecords[member.id] || "present"
                          ].color
                        }`}
                      >
                        {
                          ATTENDANCE_STATUS_CONFIG[
                            attendanceRecords[member.id] || "present"
                          ].icon
                        }
                        <span className="ml-1">
                          {
                            ATTENDANCE_STATUS_CONFIG[
                              attendanceRecords[member.id] || "present"
                            ].label
                          }
                        </span>
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={attendanceRecords[member.id] || "present"}
                        onChange={(e) =>
                          handleStatusChange(
                            member.id,
                            e.target.value as AttendanceStatus
                          )
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        aria-label={`Attendance status for ${member.name}`}
                      >
                        <option value="present">✅ Present</option>
                        <option value="absent-with-apology">
                          ❌ Absent (with apology)
                        </option>
                        <option value="absent-without-apology">
                          ⚠️ Absent (no apology)
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {saveStatus === "saved" && (
              <div className="flex items-center text-green-600">
                <svg
                  className="w-5 h-5 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium">
                  Attendance saved successfully
                </span>
              </div>
            )}
            {saveStatus === "error" && (
              <div className="flex items-center text-rose-600">
                <svg
                  className="w-5 h-5 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">
                  Failed to save. Please try again.
                </span>
              </div>
            )}
            {hasUnsavedChanges && saveStatus === "idle" && (
              <div className="flex items-center text-amber-600">
                <svg
                  className="w-5 h-5 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="font-medium">You have unsaved changes</span>
              </div>
            )}
          </div>

          <button
            onClick={handleSaveAttendance}
            disabled={
              !selectedDate ||
              !isSunday(selectedDate) ||
              !hasUnsavedChanges ||
              saveStatus === "saving"
            }
            className={`inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              !selectedDate ||
              !isSunday(selectedDate) ||
              !hasUnsavedChanges ||
              saveStatus === "saving"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saveStatus === "saving" ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : saveStatus === "saved" ? (
              "Saved"
            ) : (
              "Save Attendance"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
