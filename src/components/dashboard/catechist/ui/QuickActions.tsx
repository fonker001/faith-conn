'use client';

import { useState } from 'react';
// import ReportGenerator from '../reports/ReportGenerator';
import NewProgramModal from '../programs/NewProgramModal';
import UploadResourceModal from '../resources/UploadResourceModal';

export default function QuickActions() {
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [isReportGenerating, setIsReportGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsReportGenerating(true);
    // Simulate API call
    setTimeout(() => {
      alert('Report generated successfully! (In real app: download PDF)');
      setIsReportGenerating(false);
    }, 800);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => setIsProgramModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
      >
        <PlusIcon /> New Program
      </button>
      <button
        onClick={() => setIsResourceModalOpen(true)}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium flex items-center"
      >
        <UploadIcon /> Upload Resource
      </button>
      <button
        onClick={handleGenerateReport}
        disabled={isReportGenerating}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-70"
      >
        {isReportGenerating ? 'Generating...' : 'Generate Report'}
      </button>

      {/* Modals */}
      <NewProgramModal 
        isOpen={isProgramModalOpen} 
        onClose={() => setIsProgramModalOpen(false)} 
      />
      <UploadResourceModal 
        isOpen={isResourceModalOpen} 
        onClose={() => setIsResourceModalOpen(false)} 
      />
    </div>
  );
}

// Icons (keep them local for now)
function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );
}