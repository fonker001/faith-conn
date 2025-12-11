'use client';

import { Notification, mockNotifications } from './mockNotifications';
import NotificationItem from './NotificationItem';
import { useState } from 'react';

export default function NotificationDropdown({ onClose }: { onClose: () => void }) {
  const [notifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="absolute max-sm:-right-10 md:right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifications</h3>
        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
          {unreadCount} unread
        </span>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {notifications.length > 0 ? (
          notifications.map((note) => <NotificationItem key={note.id} notification={note} />)
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">No notifications</div>
        )}
      </div>
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
        <button
          onClick={onClose}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}