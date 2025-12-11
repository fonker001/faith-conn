"use client";

import { Status } from "@/types/types";
import { useState } from "react";

export default function NewAnnouncementForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<Status>("low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app: call API
    console.log({ title, content, priority });
    setTitle("");
    setContent("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        + New Announcement
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
    >
      <h4 className="font-medium mb-2">Create Announcement</h4>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Message"
        rows={3}
        className="w-full mb-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        required
      />
      <div className="mb-3">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Status)}
          className="ml-2 text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Post
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
