'use client';

import { useState, useEffect } from 'react';
import { ChallengeProgress, CHALLENGES } from '@/lib/types';
import { loadState, saveState, updateChallengeProgress } from '@/lib/storage';

const PART_NAMES: Record<number, string> = {
  1: 'Laying the Groundwork',
  2: 'Wasting Time',
  3: 'The End of Time Management',
  4: 'Quiet Your Mind',
  5: 'The Attention Muscle',
  6: 'Taking Productivity to the Next Level',
};

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<ChallengeProgress[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState(1);
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);

  useEffect(() => {
    const state = loadState();
    setChallenges(state.challenges);
    setCurrentChallenge(state.currentChallenge);
  }, []);

  const handleStatusChange = (challengeNumber: number, status: ChallengeProgress['status']) => {
    const state = loadState();
    const updatedState = updateChallengeProgress(state, challengeNumber, status);
    setChallenges(updatedState.challenges);
    setCurrentChallenge(updatedState.currentChallenge);
  };

  const handleSetCurrent = (challengeNumber: number) => {
    const state = loadState();
    state.currentChallenge = challengeNumber;
    saveState(state);
    setCurrentChallenge(challengeNumber);
    setSelectedChallenge(null);
  };

  const completedCount = challenges.filter(c => c.status === 'completed').length;
  const progressPercent = (completedCount / CHALLENGES.length) * 100;

  // Group challenges by part
  const challengesByPart = CHALLENGES.reduce((acc, challenge) => {
    if (!acc[challenge.part]) {
      acc[challenge.part] = [];
    }
    acc[challenge.part].push(challenge);
    return acc;
  }, {} as Record<number, typeof CHALLENGES[number][]>);

  const selectedChallengeData = selectedChallenge
    ? challenges.find(c => c.challengeNumber === selectedChallenge)
    : null;

  if (selectedChallenge && selectedChallengeData) {
    const challengeInfo = CHALLENGES.find(c => c.number === selectedChallenge);

    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedChallenge(null)}
            className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all challenges
          </button>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm text-gray-500">Challenge {selectedChallenge} of 22</span>
                <h1 className="text-2xl font-bold text-gray-800 mt-1">
                  {selectedChallengeData.title}
                </h1>
                <span className="text-sm text-indigo-600">
                  Part {challengeInfo?.part}: {PART_NAMES[challengeInfo?.part || 1]}
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedChallengeData.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : selectedChallengeData.status === 'in_progress'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-600'
              }`}>
                {selectedChallengeData.status === 'completed'
                  ? 'Completed'
                  : selectedChallengeData.status === 'in_progress'
                    ? 'In Progress'
                    : 'Not Started'}
              </span>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex gap-2">
                {selectedChallengeData.status !== 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(selectedChallenge, 'in_progress')}
                    className="flex-1 bg-amber-100 text-amber-700 py-2 px-4 rounded-lg font-medium hover:bg-amber-200 transition-colors"
                  >
                    Start Challenge
                  </button>
                )}
                {selectedChallengeData.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange(selectedChallenge, 'completed')}
                    className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
                {selectedChallengeData.status === 'completed' && (
                  <button
                    onClick={() => handleStatusChange(selectedChallenge, 'not_started')}
                    className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              {selectedChallenge !== currentChallenge && (
                <button
                  onClick={() => handleSetCurrent(selectedChallenge)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Set as Current Challenge
                </button>
              )}

              {selectedChallenge === currentChallenge && (
                <p className="text-center text-indigo-600 font-medium">
                  This is your current challenge
                </p>
              )}
            </div>

            {selectedChallengeData.startedAt && (
              <p className="text-sm text-gray-500 mt-4">
                Started: {new Date(selectedChallengeData.startedAt).toLocaleDateString()}
              </p>
            )}
            {selectedChallengeData.completedAt && (
              <p className="text-sm text-gray-500">
                Completed: {new Date(selectedChallengeData.completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Productivity Challenges</h1>
          <p className="text-gray-600">22 challenges from &quot;The Productivity Project&quot; by Chris Bailey</p>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{completedCount} of 22 completed</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Current challenge */}
          {currentChallenge <= 22 && (
            <div className="mt-4 bg-indigo-50 rounded-xl p-4">
              <p className="text-sm text-indigo-600 font-medium mb-1">Current Challenge</p>
              <p className="text-indigo-800 font-semibold">
                {challenges.find(c => c.challengeNumber === currentChallenge)?.title}
              </p>
            </div>
          )}
        </div>

        {/* Challenges by part */}
        <div className="space-y-8">
          {Object.entries(challengesByPart).map(([part, partChallenges]) => (
            <div key={part}>
              <h2 className="text-sm font-medium text-gray-500 mb-3">
                Part {part}: {PART_NAMES[parseInt(part)]}
              </h2>
              <div className="space-y-2">
                {partChallenges.map((challenge) => {
                  const progress = challenges.find(c => c.challengeNumber === challenge.number);
                  const isCurrent = challenge.number === currentChallenge;

                  return (
                    <button
                      key={challenge.number}
                      onClick={() => setSelectedChallenge(challenge.number)}
                      className={`w-full text-left rounded-xl p-4 transition-all ${
                        isCurrent
                          ? 'bg-indigo-100 ring-2 ring-indigo-400'
                          : 'bg-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            progress?.status === 'completed'
                              ? 'bg-green-500 text-white'
                              : progress?.status === 'in_progress'
                                ? 'bg-amber-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                          }`}>
                            {progress?.status === 'completed' ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              challenge.number
                            )}
                          </span>
                          <div>
                            <p className={`font-medium ${isCurrent ? 'text-indigo-800' : 'text-gray-800'}`}>
                              {challenge.title}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-indigo-600">Current challenge</p>
                            )}
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
