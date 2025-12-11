import { Notification } from './mockNotifications';

export default function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div
      className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-750 ${
        !notification.read ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500' : ''
      }`}
    >
      <p className="font-medium text-gray-800 dark:text-gray-200">{notification.title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
        {new Date(notification.timestamp).toLocaleDateString()}
      </p>
    </div>
  );
}