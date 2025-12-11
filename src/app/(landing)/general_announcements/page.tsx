"use client";

import { ShowcaseCard } from "@/components/ShowcaseCard";
import TabButtons from "@/components/TabButtons";
import { announcements } from "@/constants";
import { Calendar, Bell, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type AnnouncementTab = "all" | "events" | "ministry" | "outreach";

export default function GlobalAnnouncements() {
  const [activeTab, setActiveTab] = useState<AnnouncementTab>("all");

  // Categorize announcements
  announcements.events = announcements.all.filter(
    (a) => a.category === "events"
  );
  announcements.ministry = announcements.all.filter(
    (a) => a.category === "ministry"
  );
  announcements.outreach = announcements.all.filter(
    (a) => a.category === "outreach"
  );

  // 👇 Use "as const" to lock tab IDs to literal types
  const tabs = [
    { id: "all", label: "All Announcements", count: announcements.all.length },
    { id: "events", label: "Events", count: announcements.events.length },
    { id: "ministry", label: "Ministry", count: announcements.ministry.length },
    { id: "outreach", label: "Outreach", count: announcements.outreach.length },
  ] as const;

  const formatDate = (dateInput: string | Date): string => {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-white text-[#0D090A] py-12 sm:py-16 px-5 md:px-16">
      <div className="max-screen-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <Bell className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Church Announcements
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Stay updated with events, ministries, and outreach opportunities in
            our church community.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <TabButtons<AnnouncementTab> // 👈 tell TS what kind of tab this is
              key={tab.id}
              id={tab.id}
              label={tab.label}
              count={tab.count}
              isActive={activeTab === tab.id}
              onClick={(id) => setActiveTab(id)} // ✅ fully type-safe
            />
          ))}
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements[activeTab].map((announcement) => (
            <ShowcaseCard
              key={announcement.id}
              icon={announcement.icon}
              title={announcement.title}
              subtitle={announcement.category}
              description={announcement.description}
              metadata={[
                { icon: Calendar, label: formatDate(announcement.date) },
                { icon: Clock, label: announcement.time },
                { icon: MapPin, label: announcement.location },
              ]}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 bg-gradient-to-br from-gray-50 to-[#FAF7EB] rounded-2xl p-6 text-center">
          <p>
            <strong>Have questions?</strong> Contact our church office at{" "}
            <Link
              href="mailto:info@church.org"
              className="text-[#D4AF37] hover:underline"
            >
              info@church.org
            </Link>{" "}
            or call us at{" "}
            <Link
              href="tel:+1234567890"
              className="text-[#D4AF37] hover:underline"
            >
              (123) 456-7890
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}