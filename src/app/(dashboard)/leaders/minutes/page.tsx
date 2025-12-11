// src/app/(dashboard)/leaders/minutes/page.tsx
'use client';

import { useState } from 'react';

interface MeetingMinute {
  id: string;
  title: string;
  date: string;
  content: string;
}

const INITIAL_MINUTES: MeetingMinute[] = [
  { 
    id: "1", 
    title: "Leadership Strategy Meeting", 
    date: "2023-10-01", 
    content: "• Finalized Q4 budget allocation\n• Approved new youth outreach program\n• Scheduled facility maintenance for November" 
  },
  { 
    id: "2", 
    title: "Finance Committee Review", 
    date: "2023-09-24", 
    content: "• Q3 donations exceeded target by 12%\n• Reviewed expense reports for mission trip\n• Discussed end-of-year fundraising campaign" 
  },
];

export default function MeetingMinutesPage() {
  const [minutes, setMinutes] = useState<MeetingMinute[]>(INITIAL_MINUTES);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<MeetingMinute, 'id'>>({ 
    title: "", 
    date: new Date().toISOString().split('T')[0], 
    content: "" 
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editingId) {
      setMinutes(prev => 
        prev.map(m => m.id === editingId ? { ...m, ...formData } : m)
      );
      setEditingId(null);
    } else {
      const newMinute: MeetingMinute = { 
        id: Date.now().toString(), 
        ...formData 
      };
      setMinutes(prev => [newMinute, ...prev]);
    }
    
    setFormData({ title: "", date: new Date().toISOString().split('T')[0], content: "" });
    setShowForm(false);
  };

  const handleEdit = (minute: MeetingMinute) => {
    setEditingId(minute.id);
    setFormData({ title: minute.title, date: minute.date, content: minute.content });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently delete these meeting minutes?")) {
      setMinutes(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meeting Minutes</h1>
        <p className="text-gray-600 mt-1">
          Document, review, and track decisions from parish leadership meetings
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Add Minutes Button */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ 
              title: "", 
              date: new Date().toISOString().split('T')[0], 
              content: "" 
            });
          }}
          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors mb-6"
        >
          {showForm ? (
            <span>Cancel</span>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Minutes
            </>
          )}
        </button>

        {/* Minutes Form */}
        {showForm && (
          <div className="mb-8 p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-indigo-50 to-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="minute-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Title *
                  </label>
                  <input
                    id="minute-title"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Leadership Strategy Meeting"
                  />
                </div>
                <div>
                  <label htmlFor="minute-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Date *
                  </label>
                  <input
                    id="minute-date"
                    type="date"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="minute-content" className="block text-sm font-medium text-gray-700 mb-1">
                  Minutes Content *
                </label>
                <textarea
                  id="minute-content"
                  required
                  rows={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="• Decision: Approved new youth program&#10;• Action Item: John to contact vendors by Friday&#10;• Next Meeting: October 15, 2023"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use bullet points (•) for decisions, action items, and key discussion points
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-lg font-medium text-white ${
                    editingId 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {editingId ? "Update Minutes" : "Save Minutes"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Minutes List */}
        {minutes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No meeting minutes yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Start documenting your parish leadership meetings to keep track of decisions and action items.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create Your First Minutes
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {minutes.map((minute) => (
              <div
                key={minute.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{minute.title}</h3>
                    <div className="flex items-center mt-1">
                      <svg className="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-600 font-medium">{minute.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(minute)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(minute.id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {minute.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}