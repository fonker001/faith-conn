import { ShowcaseCard } from "@/components/ShowcaseCard";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import React, { useState } from "react";
import { AddAnnouncementDrawer } from "../AddAnnouncementDrawer";

export default function PriestAnnouncements() {
  const [readIds, setReadIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleRead = (id: number) =>
    setReadIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  const toggleSaved = (id: number) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  // ✅ Simplified mock data (no attachments)
  const announcements = [
    {
      id: 1,
      title: "Christmas Service Schedule",
      category: "Events",
      date: "2025-12-24",
      body: "Join us for our Christmas Eve Candlelight Service at 7 PM and Christmas Day Mass at 10 AM.",
    },
    {
      id: 2,
      title: "Charity Drive for Local Families",
      category: "Community Outreach",
      date: "2025-10-08",
      body: "We are collecting donations of food and clothing for local families in need. Drop-off points are available at the main hall.",
    },
    {
      id: 3,
      title: "Building Renovation Update",
      category: "Announcements",
      date: "2025-10-05",
      body: "Phase 1 of the chapel renovation is complete! Phase 2 will focus on upgrading the parish hall and adding accessibility ramps.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Announcements</h2>
        <AddAnnouncementDrawer triggerAsChild>
          <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} /> New Announcement
          </Button>
        </AddAnnouncementDrawer>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((announcement) => (
          <ShowcaseCard
            key={announcement.id}
            title={announcement.title}
            subtitle={announcement.category}
            description={announcement.body}
            metadata={[
              {
                icon: Calendar,
                label: new Date(announcement.date).toLocaleDateString(),
              },
            ]}
            footer={
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => toggleRead(announcement.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    readIds.includes(announcement.id)
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-green-500"
                  }`}
                >
                  {readIds.includes(announcement.id) ? "Read" : "Mark as Read"}
                </Button>

                <button
                  onClick={() => toggleSaved(announcement.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    savedIds.includes(announcement.id)
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-yellow-400 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-yellow-400"
                  }`}
                >
                  {savedIds.includes(announcement.id)
                    ? "Saved"
                    : "Save for Later"}
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
