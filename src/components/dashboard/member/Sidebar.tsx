import React from "react";
import Link from "next/link";
import {
  LogOut,
  LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  catechistLinks,
  priestLinks,
  leaderLinks,
  memberLinks,
} from "@/constants/links";

// Sidebar component renders the vertical navigation menu for the dashboard
interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    // Close sidebar on mobile after clicking a link
    if (onClose) onClose();
  };

  type NavLink = { label: string; href: string; icon: LucideIcon };
  let navLinks: NavLink[] = [];

  if (pathname.startsWith("/member")) {
    navLinks = memberLinks;
  } else if (pathname.startsWith("/priest")) {
    navLinks = priestLinks;
  } else if (pathname.startsWith("/leaders")) {
    navLinks = leaderLinks;
  } else if (pathname.startsWith("/catechist")) {
    navLinks = catechistLinks;
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-300 transition-colors"
                    onClick={handleLinkClick}
                  >
                    {Icon && <Icon className="w-5 h-5 dark:text-gray-300" />}
                    <span className="font-medium">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout Button at Bottom */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                // Add your logout logic here
                console.log("Logging out...");
                // Example: router.push('/login');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden top-16"
          onClick={onClose}
        />
      )}
    </>
  );
}
