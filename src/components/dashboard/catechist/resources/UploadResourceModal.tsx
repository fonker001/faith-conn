"use client";

import { useState } from "react";
import { X, FileText, BookOpen, Video, File } from "lucide-react";

const RESOURCE_TYPES = [
  { value: "Lesson Plan", icon: FileText },
  { value: "Guide", icon: BookOpen },
  { value: "Reference", icon: File },
  { value: "Video", icon: Video },
  { value: "Worksheet", icon: FileText },
] as const;

type ResourceType = (typeof RESOURCE_TYPES)[number]["value"];

export default function UploadResourceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ResourceType>("Lesson Plan");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    // Mock upload
    console.log({
      title,
      type,
      tags: tags.split(",").map((t) => t.trim()),
      file,
    });
    setTimeout(() => {
      alert("Resource uploaded successfully!");
      setIsUploading(false);
      onClose();
      // Reset
      setTitle("");
      setTags("");
      setFile(null);
    }, 800);
  };

  // const IconComponent = RESOURCE_TYPES.find(t => t.value === type)?.icon || FileText;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/70 dark:bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Upload Resource</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ResourceType)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {RESOURCE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  <t.icon className="w-4 h-4 inline mr-2" />
                  {t.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., Children, Eucharist, Lent"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              File *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm text-gray-600 dark:text-gray-400"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov"
                required
              />
              {file && (
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                  {file.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !file || !title}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
