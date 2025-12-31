'use client';

import { useState, useEffect } from 'react';
import { WeeklyGoal, ParkingLotItem } from '@/lib/types';
import {
  loadState,
  getCurrentWeekGoals,
  getActiveParkingLotItems,
  addWeeklyGoal,
  updateWeeklyGoal,
  deleteWeeklyGoal,
  addParkingLotItem,
  promoteParkingLotItem,
  resolveParkingLotItem,
  deleteParkingLotItem,
  getCurrentWeekMonday,
} from '@/lib/storage';

export default function GoalsPage() {
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([]);
  const [parkingLot, setParkingLot] = useState<ParkingLotItem[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [newParkingItem, setNewParkingItem] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const state = loadState();
    setWeeklyGoals(getCurrentWeekGoals(state));
    setParkingLot(getActiveParkingLotItems(state));
  };

  const handleAddGoal = () => {
    if (!newGoal.trim()) return;
    const state = loadState();
    addWeeklyGoal(state, newGoal.trim());
    setNewGoal('');
    refreshData();
  };

  const handleUpdateGoalStatus = (goalId: string, status: WeeklyGoal['status']) => {
    const state = loadState();
    updateWeeklyGoal(state, goalId, { status });
    refreshData();
  };

  const handleDeleteGoal = (goalId: string) => {
    const state = loadState();
    deleteWeeklyGoal(state, goalId);
    refreshData();
  };

  const handleAddParkingItem = () => {
    if (!newParkingItem.trim()) return;
    const state = loadState();
    addParkingLotItem(state, newParkingItem.trim(), 'manual entry');
    setNewParkingItem('');
    refreshData();
  };

  const handlePromoteItem = (itemId: string) => {
    const state = loadState();
    promoteParkingLotItem(state, itemId);
    refreshData();
  };

  const handleResolveItem = (itemId: string) => {
    const state = loadState();
    resolveParkingLotItem(state, itemId);
    refreshData();
  };

  const handleDeleteParkingItem = (itemId: string) => {
    const state = loadState();
    deleteParkingLotItem(state, itemId);
    refreshData();
  };

  const weekOfDate = new Date(getCurrentWeekMonday());
  const weekOfFormatted = weekOfDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Goals & Parking Lot</h1>

        {/* Weekly Goals Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Goals</h2>
            <span className="text-sm text-gray-500">Week of {weekOfFormatted}</span>
          </div>

          {/* Add new goal */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
              placeholder="Add a weekly goal..."
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddGoal}
              disabled={!newGoal.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>

          {/* Goals list */}
          {weeklyGoals.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No goals set for this week yet. Add some above or set them during your morning check-in!
            </p>
          ) : (
            <ul className="space-y-2">
              {weeklyGoals.map((goal) => (
                <li
                  key={goal.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    goal.status === 'completed'
                      ? 'bg-green-50'
                      : goal.status === 'in_progress'
                        ? 'bg-amber-50'
                        : 'bg-gray-50'
                  }`}
                >
                  <button
                    onClick={() => {
                      const nextStatus = goal.status === 'pending'
                        ? 'in_progress'
                        : goal.status === 'in_progress'
                          ? 'completed'
                          : 'pending';
                      handleUpdateGoalStatus(goal.id, nextStatus);
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      goal.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : goal.status === 'in_progress'
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-200'
                    }`}
                  >
                    {goal.status === 'completed' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {goal.status === 'in_progress' && (
                      <span className="text-xs font-bold">...</span>
                    )}
                  </button>
                  <span className={`flex-1 ${goal.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {goal.text}
                  </span>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Parking Lot Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Parking Lot</h2>
          <p className="text-sm text-gray-500 mb-4">
            Items to revisit later - not today&apos;s priorities
          </p>

          {/* Add new parking lot item */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newParkingItem}
              onChange={(e) => setNewParkingItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddParkingItem()}
              placeholder="Add something to the parking lot..."
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddParkingItem}
              disabled={!newParkingItem.trim()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>

          {/* Parking lot list */}
          {parkingLot.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              Parking lot is empty. Items will appear here when you defer things during check-ins.
            </p>
          ) : (
            <ul className="space-y-2">
              {parkingLot.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <span className="flex-1 text-gray-700">{item.text}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handlePromoteItem(item.id)}
                      className="text-indigo-600 hover:text-indigo-800 text-xs font-medium px-2 py-1 rounded hover:bg-indigo-50"
                      title="Promote to priority"
                    >
                      Promote
                    </button>
                    <button
                      onClick={() => handleResolveItem(item.id)}
                      className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded hover:bg-green-50"
                      title="Mark as resolved"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleDeleteParkingItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
