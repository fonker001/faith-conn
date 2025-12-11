// src/app/(dashboard)/leaders/announcements/page.tsx
"use client";

import { useState } from "react";

interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  priority?: "high" | "normal" | "low";
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "🎉 Harvest Festival This Sunday!",
    date: "2023-10-15",
    content:
      "Join us for our annual harvest celebration! Food, fellowship, and fun for the whole family. Bring a dish to share!",
    priority: "high",
  },
  {
    id: "2",
    title: "📖 Bible Study Resumes",
    date: "2023-10-05",
    content:
      "Wednesday Bible study starts this week at 7 PM in the fellowship hall. New members always welcome!",
    priority: "normal",
  },
];

export default function ParishAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(
    INITIAL_ANNOUNCEMENTS
  );
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Announcement, "id">>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    content: "",
    priority: "normal",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...formData } : a))
      );
      setEditingId(null);
    } else {
      const newAnn: Announcement = {
        id: Date.now().toString(),
        ...formData,
      };
      setAnnouncements((prev) => [newAnn, ...prev]);
    }

    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      content: "",
      priority: "normal",
    });
    setShowForm(false);
  };

  const handleEdit = (ann: Announcement) => {
    setEditingId(ann.id);
    setFormData({
      title: ann.title,
      date: ann.date,
      content: ann.content,
      priority: ann.priority || "normal",
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (
      confirm("Are you sure you want to permanently delete this announcement?")
    ) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const getPriorityBadge = (
    priority: "high" | "normal" | "low" | undefined
  ) => {
    switch (priority) {
      case "high":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <svg
              className="w-3 h-3 mr-1"
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
            High Priority
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <svg
              className="w-3 h-3 mr-1"
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
            Low Priority
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Normal Priority
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-600 mt-1">
          Share important updates and events with your parish community
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Add Announcement Button */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              title: "",
              date: new Date().toISOString().split("T")[0],
              content: "",
              priority: "normal",
            });
          }}
          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors mb-6"
        >
          {showForm ? (
            <span>Cancel</span>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create New Announcement
            </>
          )}
        </button>

        {/* Announcement Form */}
        {showForm && (
          <div className="mb-8 p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-amber-50 to-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="announcement-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Announcement Title *
                </label>
                <input
                  id="announcement-title"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Harvest Festival This Sunday!"
                />
              </div>

              <div>
                <label
                  htmlFor="announcement-content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content *
                </label>
                <textarea
                  id="announcement-content"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Share details about your announcement..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="announcement-date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Publish Date *
                  </label>
                  <input
                    id="announcement-date"
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="announcement-priority"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="announcement-priority"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as Announcement["priority"],
                      })
                    }
                  >
                    <option value="high">High Priority (Urgent)</option>
                    <option value="normal">Normal Priority</option>
                    <option value="low">Low Priority (FYI)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-lg font-medium text-white ${
                    editingId
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {editingId ? "Update Announcement" : "Post Announcement"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Announcements Grid */}
        {announcements.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2h-5m-4 0V4a2 2 0 012-2h4a2 2 0 012 2v1m-4 11h4m-4 0a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No announcements yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Create your first announcement to share important updates with
              your parish community.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-amber-600 hover:bg-amber-700"
            >
              Create Your First Announcement
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className={`border rounded-xl p-6 transition-shadow hover:shadow-md ${
                  ann.priority === "high"
                    ? "border-red-200 bg-red-50"
                    : ann.priority === "low"
                    ? "border-gray-200 bg-gray-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900">
                      {ann.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <svg
                        className="w-4 h-4 text-gray-400 mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-600 font-medium">
                        {ann.date}
                      </span>
                    </div>
                  </div>
                  {getPriorityBadge(ann.priority)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {ann.content}
                </p>
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(ann)}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ann.id)}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
