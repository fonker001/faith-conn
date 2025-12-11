// app/catechist/components/layout/GlobalSearch.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import SearchResults from './SearchResults';
import { SearchResult } from '../types';
import { searchDashboard } from '../mockData';

export default function GlobalSearch({ 
  isMobile = false,
}: { 
  isMobile?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    if (query.trim()) {
      setResults(searchDashboard(query));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false); // Optional: hide results if empty
    }
  }, [query]);

  return (
    <div className={`relative ${isMobile ? 'w-full' : 'w-full max-w-md'}`} ref={containerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search programs, students, resources..."
          className={`block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            isMobile ? 'text-sm' : ''
          }`}
        />
        {query && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuery(''); // Only clear input, don't close panel
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-30 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <SearchResults results={results} onNavigate={() => setIsOpen(false)} />
        </div>
      )}

      {isOpen && results.length === 0 && query.trim() && (
        <div className="absolute z-30 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-4 text-center text-gray-500 dark:text-gray-400">
          No results found
        </div>
      )}
    </div>
  );
}