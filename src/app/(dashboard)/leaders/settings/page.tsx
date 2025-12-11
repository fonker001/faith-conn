// src/app/(dashboard)/leaders/settings/page.tsx
"use client";

import { useState, useEffect } from "react";

interface UserSettings {
  name: string;
  email: string;
  role: string;
  notifications: {
    announcements: boolean;
    attendanceReminders: boolean;
    meetingMinutes: boolean;
  };
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "system";
  };
}

const INITIAL_SETTINGS: UserSettings = {
  name: "John Smith",
  email: "john.smith@parish.org",
  role: "Group Leader",
  notifications: {
    announcements: true,
    attendanceReminders: true,
    meetingMinutes: false,
  },
  privacy: {
    showEmail: true,
    showPhone: false,
  },
  appearance: {
    theme: "system",
  },
};

// Define tabs with proper typing
const tabs = [
  { id: "profile" as const, label: "Profile", icon: "👤" },
  { id: "notifications" as const, label: "Notifications", icon: "🔔" },
  { id: "privacy" as const, label: "Privacy", icon: "🔒" },
  { id: "appearance" as const, label: "Appearance", icon: "🎨" },
  { id: "security" as const, label: "Security", icon: "🛡️" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(INITIAL_SETTINGS);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("parish_settings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Validate structure before setting state
          if (
            parsed.appearance &&
            parsed.notifications &&
            parsed.privacy &&
            typeof parsed.name === "string"
          ) {
            setSettings(parsed as UserSettings);
          }
        } catch (e) {
          console.warn("Invalid settings in localStorage, using defaults", e);
        }
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("parish_settings", JSON.stringify(settings));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  }, [settings]);

 const handleInputChange = (
   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
   const { name, value, type } = e.target;
   const checked = (e.target as HTMLInputElement).checked;

   setSettings((prev) => {
     if (name.includes(".")) {
       const [parent, child] = name.split(".");

       // Only handle nested object keys safely
       if (
         parent === "notifications" ||
         parent === "privacy" ||
         parent === "appearance"
       ) {
         return {
           ...prev,
           [parent]: {
             ...prev[parent],
             [child]: type === "checkbox" ? checked : value,
           },
         };
       }
     }

     return {
       ...prev,
       [name]: type === "checkbox" ? checked : value,
     };
   });
 };


  const handleClearLocalStorage = () => {
    if (
      confirm(
        "This will clear all locally saved data including attendance records. Are you sure?"
      )
    ) {
      localStorage.removeItem("parish_attendance");
      localStorage.removeItem("parish_settings");
      alert("Local data cleared successfully!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account preferences and parish dashboard settings
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap gap-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Save Status */}
        {isSaved && (
          <div className="px-6 py-3 bg-green-50 border-b border-green-200">
            <div className="flex items-center text-green-700">
              <svg
                className="w-4 h-4 mr-2"
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
              <span className="text-sm font-medium">
                Settings saved successfully
              </span>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={settings.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={settings.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={settings.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Group Leader">Group Leader</option>
                      <option value="Ministry Leader">Ministry Leader</option>
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Notification Preferences
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose how you want to be notified about parish activities
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      id="notifications.announcements"
                      name="notifications.announcements"
                      type="checkbox"
                      checked={settings.notifications.announcements}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label
                        htmlFor="notifications.announcements"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Announcements
                      </label>
                      <p className="text-sm text-gray-600">
                        Get notified when new announcements are posted
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="notifications.attendanceReminders"
                      name="notifications.attendanceReminders"
                      type="checkbox"
                      checked={settings.notifications.attendanceReminders}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label
                        htmlFor="notifications.attendanceReminders"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Attendance Reminders
                      </label>
                      <p className="text-sm text-gray-600">
                        Receive Sunday attendance reminders
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="notifications.meetingMinutes"
                      name="notifications.meetingMinutes"
                      type="checkbox"
                      checked={settings.notifications.meetingMinutes}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label
                        htmlFor="notifications.meetingMinutes"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Meeting Minutes
                      </label>
                      <p className="text-sm text-gray-600">
                        Get notified when new meeting minutes are published
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Privacy Settings
                </h2>
                <p className="text-gray-600 mb-6">
                  Control what information is visible to other parish members
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      id="privacy.showEmail"
                      name="privacy.showEmail"
                      type="checkbox"
                      checked={settings.privacy.showEmail}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label
                        htmlFor="privacy.showEmail"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Show Email Address
                      </label>
                      <p className="text-sm text-gray-600">
                        Make your email visible in the member directory
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="privacy.showPhone"
                      name="privacy.showPhone"
                      type="checkbox"
                      checked={settings.privacy.showPhone}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label
                        htmlFor="privacy.showPhone"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Show Phone Number
                      </label>
                      <p className="text-sm text-gray-600">
                        Make your phone number visible in the member directory
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Appearance
                </h2>
                <p className="text-gray-600 mb-6">
                  Customize the look and feel of your dashboard
                </p>

                <div className="max-w-md">
                  <label
                    htmlFor="appearance.theme"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Theme
                  </label>
                  <select
                    id="appearance.theme"
                    name="appearance.theme"
                    value={settings.appearance.theme}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="system">System Default</option>
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                  <p className="mt-2 text-sm text-gray-600">
                    {settings.appearance.theme === "system"
                      ? "Follows your system preference"
                      : settings.appearance.theme === "light"
                      ? "Light background with dark text"
                      : "Dark background with light text"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Security
                </h2>
                <p className="text-gray-600 mb-6">
                  Manage your account security settings
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Change Password
                    </label>
                    <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      Change Password
                    </button>
                    <p className="mt-2 text-sm text-gray-600">
                      You will be redirected to the authentication provider to
                      update your password.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 mb-3">
                      Data Management
                    </h3>
                    <button
                      onClick={handleClearLocalStorage}
                      className="px-4 py-2.5 border border-rose-300 rounded-lg text-rose-700 hover:bg-rose-50"
                    >
                      Clear Local Data
                    </button>
                    <p className="mt-2 text-sm text-gray-600">
                      This will remove all locally stored data including
                      attendance records and settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
