import { BookOpen, User, Calendar, MoreHorizontal } from "lucide-react";

type BookingTab = "priest" | "catechism";

const tabConfig: Record<BookingTab, { label: string; icon: React.ReactNode }> =
  {
    priest: { label: "Priest Appointment", icon: <User className="w-4 h-4" /> },
    catechism: {
      label: "Catechism Class",
      icon: <BookOpen className="w-4 h-4" />,
    },
  };
export default function BookingTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: BookingTab;
  onTabChange: (tab: BookingTab) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(tabConfig).map(([key, config]) => (
        <button
          key={key}
          onClick={() => onTabChange(key as BookingTab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            activeTab === key
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {config.icon}
          {config.label}
        </button>
      ))}
    </div>
  );
}
