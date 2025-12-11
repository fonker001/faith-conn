'use client';

import { useState } from 'react';
import { CatechismProgram } from '../types';
import { Trash2 } from 'lucide-react';

const SacramentLabels: Record<CatechismProgram['sacramentFocus'], string> = {
  Baptism: 'Baptism',
  FirstCommunion: 'First Communion',
  Confirmation: 'Confirmation',
  None: 'General',
};

export default function ProgramCard({ 
  program,
  onDelete 
}: { 
  program: CatechismProgram;
  onDelete: (id: string) => void;
}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = () => {
    onDelete(program.id);
    setIsConfirmOpen(false);
  };

  return (
    <>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-800 hover:shadow-md transition">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              {program.name}
            </h3>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded">
                {program.type}
              </span>
              <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded">
                {SacramentLabels[program.sacramentFocus]}
              </span>
            </div>
          </div>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
            {program.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
          {program.studentCount} students enrolled
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            View Roster
          </button>
          <button className="text-gray-600 dark:text-gray-400 hover:underline text-sm">
            Edit
          </button>
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="text-red-600 dark:text-red-400 hover:underline text-sm flex items-center gap-1"
            aria-label={`Delete program ${program.name}`}
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-gray-600/70 dark:bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-medium">&quot;{program.name}&quot;</span>?
              This will remove the program and all associated student records.
              <span className="text-red-600 dark:text-red-400 font-medium block mt-1">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}