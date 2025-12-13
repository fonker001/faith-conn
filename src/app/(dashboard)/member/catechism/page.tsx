"use client";
import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Level } from "@/types/types";

type ClassItem = {
  id: number;
  title: string;
  level: string;
  instructor: string;
  schedule: string;
  seats: number;
};

type CatechismRecord = {
  id: number;
  date_of_baptism: string;
  place_of_baptism: string;
  baptism_officiant: string;
  certificate_number: string;
  godparents: string;
  parish: string;
  confirmed: boolean;
  date_of_confirmation: string | null;
  notes: string;
};

type CatechismProgress = {
  classesCompleted: string[];
  currentLevel: string;
  sacramentsReceived: string[];
  attendance: number;
};

const MOCK_CLASSES: ClassItem[] = [
  {
    id: 1,
    title: "Catechism Level 1",
    level: "Beginner",
    instructor: "Sr. Mary",
    schedule: "Sat 10:00 - 11:30",
    seats: 25,
  },
  {
    id: 2,
    title: "Catechism Level 2",
    level: "Intermediate",
    instructor: "Fr. John",
    schedule: "Sun 9:00 - 10:30",
    seats: 20,
  },
  {
    id: 3,
    title: "First Communion Prep",
    level: "Beginner",
    instructor: "Mrs. Wanjiku",
    schedule: "Sat 12:00 - 13:30",
    seats: 18,
  },
  {
    id: 4,
    title: "Confirmation Prep",
    level: "Advanced",
    instructor: "Fr. Peter",
    schedule: "Wed 17:00 - 19:00",
    seats: 15,
  },
  {
    id: 5,
    title: "Youth Faith Formation",
    level: "Youth",
    instructor: "Youth Team",
    schedule: "Fri 18:00 - 19:30",
    seats: 30,
  },
];

// Mock data for catechism record
const MOCK_RECORD: CatechismRecord = {
  id: 1,
  date_of_baptism: "2010-05-15",
  place_of_baptism: "St. Mary&apos;s Cathedral",
  baptism_officiant: "Fr. Michael Rodriguez",
  certificate_number: "BT-2010-05872",
  godparents: "John & Mary Smith",
  parish: "St. Mary&apos;s Parish",
  confirmed: true,
  date_of_confirmation: "2018-09-22",
  notes:
    "Completed First Communion in 2012. Regular participant in youth activities.",
};

// Mock progress data
const MOCK_PROGRESS: CatechismProgress = {
  classesCompleted: ["Catechism Level 1", "First Communion Prep"],
  currentLevel: "Intermediate",
  sacramentsReceived: ["Baptism", "First Communion"],
  attendance: 85, // percentage
};

export default function CatechismPage() {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<Level>("All");
  const [enrolled, setEnrolled] = useState<number[]>([]);
  const [view, setView] = useState<"classes" | "profile">("classes");
  const [record, setRecord] = useState<CatechismRecord | null>(null);
  const [progress, setProgress] = useState<CatechismProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const levels = useMemo(
    () => ["All", ...Array.from(new Set(MOCK_CLASSES.map((c) => c.level)))],
    []
  );

  const filtered = useMemo(() => {
    return MOCK_CLASSES.filter((c) => {
      if (levelFilter !== "All" && c.level !== levelFilter) return false;
      if (
        query &&
        !`${c.title} ${c.instructor} ${c.level}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, levelFilter]);

  const toggleEnroll = (id: number) => {
    setEnrolled((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Commented out useEffect since we don't have backend yet
  /*
  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/records/me/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRecord(response.data);
      } catch (err) {
        setError(
          "Failed to load catechism record. Please contact the parish admin."
        );
      } finally {
        setLoading(false);
      }
    };
    if (view === "profile") {
      fetchRecord();
    }
  }, [view]);
  */

  // Use mock data instead
  useEffect(() => {
    if (view === "profile") {
      setLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        setRecord(MOCK_RECORD);
        setProgress(MOCK_PROGRESS);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <div className="p-6 space-y-6">
      <nav className="text-sm text-gray-600 dark:text-gray-300">
        <ol className="flex gap-2">
          <li className="text-gray-900 font-medium dark:text-gray-100">
            <button
              onClick={() => setView("classes")}
              className={`${
                view === "classes" ? "underline" : ""
              } hover:text-blue-600 transition-colors`}
            >
              Catechism
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium dark:text-gray-100">
            <button
              onClick={() => setView("profile")}
              className={`${
                view === "profile" ? "underline" : ""
              } hover:text-blue-600 transition-colors`}
            >
              Profile
            </button>
          </li>
        </ol>
      </nav>

      {view === "classes" ? (
        <>
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold dark:text-gray-100">
                Catechism Classes
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Find classes, view schedules and enroll.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search classes or instructor"
                className="w-full sm:w-64 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as Level)}
                className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                {levels.map((l: string) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {filtered.map((c) => (
                <article
                  key={c.id}
                  className="p-4 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold dark:text-gray-100">
                        {c.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {c.level} • {c.instructor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {c.schedule}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Seats: {c.seats}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      A short description can go here — class goals and
                      expectations.
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleEnroll(c.id)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          enrolled.includes(c.id)
                            ? "bg-green-600 text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {enrolled.includes(c.id) ? "Enrolled" : "Enroll"}
                      </button>
                      <a
                        href="#"
                        className="text-sm text-blue-600 dark:text-blue-300 hover:underline"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="space-y-4">
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                <h4 className="font-semibold dark:text-gray-100">
                  Upcoming Sessions
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>Level 1 — Sat, 10 Oct — 10:00</li>
                  <li>Level 2 — Sun, 11 Oct — 9:00</li>
                  <li>Confirmation — Wed, 14 Oct — 17:00</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                <h4 className="font-semibold dark:text-gray-100">
                  Quick Actions
                </h4>
                <div className="mt-2 flex flex-col gap-2">
                  <Link
                    href="/groups"
                    className="px-3 py-2 rounded-md bg-blue-600 text-white text-center"
                  >
                    View Groups
                  </Link>
                  <Link
                    href="/parish_announcements"
                    className="px-3 py-2 rounded-md bg-emerald-600 text-white text-center"
                  >
                    Announcements
                  </Link>
                </div>
              </div>
            </aside>
          </section>
        </>
      ) : (
        <section className="space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold dark:text-gray-100">
                Catechism Profile
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                View your sacramental records and progress
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
                onClick={() => alert("Contact parish admin to update details.")}
              >
                Request Update
              </button>
              <button
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                onClick={() => window.print()}
              >
                Print Record
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : record ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sacramental Records */}
              <div className="lg:col-span-2 space-y-6">
                {/* Baptism Card */}
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      💧
                    </div>
                    <h3 className="text-lg font-semibold dark:text-gray-100">
                      Baptism Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Date of Baptism
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {new Date(record.date_of_baptism).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Place of Baptism
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {record.place_of_baptism}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Officiant
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {record.baptism_officiant || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Certificate Number
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                        {record.certificate_number}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Godparents
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {record.godparents || "N/A"}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Parish
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {record.parish || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirmation Card */}
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      ✝️
                    </div>
                    <h3 className="text-lg font-semibold dark:text-gray-100">
                      Confirmation Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Status
                      </label>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.confirmed
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {record.confirmed ? "Confirmed" : "Not Confirmed"}
                        </span>
                      </div>
                    </div>
                    {record.confirmed && record.date_of_confirmation && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Date of Confirmation
                        </label>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {new Date(
                            record.date_of_confirmation
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes Card */}
                {record.notes && (
                  <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                    <h3 className="text-lg font-semibold dark:text-gray-100 mb-4">
                      Additional Notes
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      {record.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Progress Sidebar */}
              <div className="space-y-6">
                {/* Progress Summary */}
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                  <h4 className="font-semibold dark:text-gray-100 mb-4">
                    Catechism Progress
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Current Level
                      </label>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {progress?.currentLevel || "Not enrolled"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Attendance
                      </label>
                      <div className="mt-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress?.attendance || 0}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {progress?.attendance || 0}% overall attendance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sacraments Received */}
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                  <h4 className="font-semibold dark:text-gray-100 mb-4">
                    Sacraments Received
                  </h4>
                  <div className="space-y-2">
                    {progress?.sacramentsReceived.map((sacrament, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {sacrament}
                        </span>
                      </div>
                    ))}
                    {(!progress?.sacramentsReceived ||
                      progress.sacramentsReceived.length === 0) && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No sacraments recorded yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                  <h4 className="font-semibold dark:text-gray-100 mb-4">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setView("classes")}
                      className="w-full px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm text-center"
                    >
                      Browse Classes
                    </button>
                    <button
                      onClick={() =>
                        alert("Document download feature coming soon")
                      }
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      Download Certificate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                📝
              </div>
              <h3 className="text-lg font-semibold dark:text-gray-100 mb-2">
                No Catechism Record Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
                We couldn&apos;t find your catechism records. Please contact the
                parish administration to add your sacramental details.
              </p>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                onClick={() =>
                  alert("Contact: parish@example.com | Phone: (555) 123-4567")
                }
              >
                Contact Parish Admin
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
