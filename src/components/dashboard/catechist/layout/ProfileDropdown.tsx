'use client';

import { useRef, useEffect } from 'react';
import { LogOut, Settings, User } from 'lucide-react';

// Remove SettingsModal import

export default function ProfileDropdown({ 
  onClose,
  onOpenSettings 
}: { 
  onClose: () => void;
  onOpenSettings: () => void; // ← NEW PROP
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
        // ✅ Do NOT manage settings here
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-30 py-1"
    >
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Catechist Admin</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">catechist@parish.org</p>
      </div>
      <ul className="text-sm text-gray-700 dark:text-gray-300">
        <li>
          <button
            onClick={onClose}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-750 space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onClose(); // Close dropdown first
              onOpenSettings(); // Then open modal
            }}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-750 space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </li>
        <li>
          <button
            onClick={onClose}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-750 space-x-2 text-red-600 dark:text-red-400"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}