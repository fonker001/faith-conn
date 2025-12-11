"use client";

import Image from "next/image";
import React from "react";

type ProfileProps = {
  compact?: boolean;
};

const ProfileSection: React.FC<ProfileProps> = ({ compact = false }) => {
  if (compact) {
    // Compact dropdown card used in header hover
    return (
      <div className="p-3 w-56 bg-white border border-gray-400 dark:bg-gray-800 rounded-md text-sm text-gray-800 dark:text-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative">
            <Image
              src={"/profile-placeholder.png"}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-gray-500 dark:text-gray-300">
              john.doe@example.com
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="text-xs p-2 bg-blue-600 text-white rounded">
            Edit
          </button>
          <button className="text-xs p-2 border border-gray-200 dark:border-gray-700 rounded">
            Message
          </button>
        </div>

        <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
          <div>Member • Choir</div>
        </div>
      </div>
    );
  }

  // Full profile page / sidebar
  return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex">
      {/* Main content placeholder - left area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold dark:text-gray-100">Profile</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Overview and editable profile details appear here.
        </p>
        {/* ...existing main dashboard content could go here... */}
      </div>

      {/* Right sidebar - approx 30% width on desktop, full width on small screens */}
      <aside className="w-[32%] max-w-[420px] min-w-[260px] bg-white dark:bg-gray-800 p-6 rounded-l-md shadow-md hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28">
            <Image
              src={"/profile-placeholder.png"}
              alt="Profile"
              width={112}
              height={112}
              className="rounded-full"
            />
          </div>
          <h2 className="text-xl font-semibold dark:text-gray-100">John Doe</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            john.doe@example.com
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            0712 345 678
          </p>

          <div className="w-full mt-3 grid grid-cols-2 gap-3">
            <button className="p-2 bg-blue-600 text-white rounded-md">
              Edit Profile
            </button>
            <button className="p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:text-gray-200">
              Settings
            </button>
          </div>

          <div className="w-full mt-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
            <h4 className="text-sm font-medium dark:text-gray-100">
              Parish Roles
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-200 mt-2 space-y-1">
              <li>Member</li>
              <li>Volunteer</li>
              <li>Choir</li>
            </ul>
          </div>

          <div className="w-full mt-3 flex flex-col gap-2">
            <button className="p-2 bg-green-600 text-white rounded-md">
              Message
            </button>
            <button className="p-2 bg-red-500 text-white rounded-md">
              Deactivate
            </button>
          </div>
        </div>
      </aside>

      {/* For small screens, show the sidebar below the content */}
      <aside className="w-full bg-white dark:bg-gray-800 p-6 rounded-t-md shadow-md md:hidden mt-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative">
            <Image
              src={"/profile-placeholder.png"}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="font-semibold dark:text-gray-100">John Doe</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              john.doe@example.com
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProfileSection;
