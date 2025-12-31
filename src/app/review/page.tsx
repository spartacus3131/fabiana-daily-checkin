'use client';

import { useState, useEffect } from 'react';
import { DailyEntry } from '@/lib/types';
import { loadState } from '@/lib/storage';

export default function ReviewPage() {
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DailyEntry | null>(null);

  useEffect(() => {
    const state = loadState();
    // Sort entries by date, newest first
    const sorted = [...state.entries].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEntries(sorted);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupedByDate = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, DailyEntry[]>);

  if (selectedEntry) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedEntry(null)}
            className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all entries
          </button>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {formatDate(selectedEntry.date)}
              </h1>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                selectedEntry.type === 'morning'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-indigo-100 text-indigo-700'
              }`}>
                {selectedEntry.type === 'morning' ? 'Morning Check-in' : 'Evening Reflection'}
              </span>
            </div>

            <div className="space-y-4">
              {selectedEntry.messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Past Check-ins</h1>

        {entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500">No check-ins yet</p>
            <p className="text-gray-400 text-sm mt-1">Start your first check-in to see your entries here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByDate).map(([date, dayEntries]) => (
              <div key={date}>
                <h2 className="text-sm font-medium text-gray-500 mb-3">
                  {formatDate(date)}
                </h2>
                <div className="space-y-2">
                  {dayEntries.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => setSelectedEntry(entry)}
                      className="w-full text-left bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            entry.type === 'morning'
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-indigo-100 text-indigo-600'
                          }`}>
                            {entry.type === 'morning' ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                              </svg>
                            )}
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">
                              {entry.type === 'morning' ? 'Morning Check-in' : 'Evening Reflection'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {entry.messages.length} messages
                            </p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
