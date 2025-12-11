import { Announcement } from "../types";

const PriorityBadge = ({ priority }: { priority: Announcement['priority'] }) => {
  const styles = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

export default function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{announcement.title}</h3>
        <PriorityBadge priority={announcement.priority} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{announcement.content}</p>
      <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-500">
        <span>By {announcement.author}</span>
        <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}