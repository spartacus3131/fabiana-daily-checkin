'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChallengeProgress, CHALLENGES } from '@/lib/types';
import { loadState, saveState, updateChallengeProgress } from '@/lib/storage';
import { getChallengeContent } from '@/lib/challengeContent';

const PART_NAMES: Record<number, string> = {
  1: 'Laying the Groundwork',
  2: 'Wasting Time',
  3: 'The End of Time Management',
  4: 'Quiet Your Mind',
  5: 'The Attention Muscle',
  6: 'Taking Productivity to the Next Level',
};

export default function ChallengesPage() {
  const router = useRouter();
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
  };

  const handleWorkThrough = (challengeNumber: number) => {
    // Set as current challenge and navigate to chat
    const state = loadState();
    state.currentChallenge = challengeNumber;
    saveState(state);
    // Store that we want to start a challenge conversation
    sessionStorage.setItem('startChallengeConversation', challengeNumber.toString());
    router.push('/');
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

  const selectedContent = selectedChallenge ? getChallengeContent(selectedChallenge) : null;

  if (selectedChallenge && selectedChallengeData && selectedContent) {
    return (
      <div className="min-h-screen p-4 pb-20">
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

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm text-gray-500">Challenge {selectedChallenge} of 22</span>
                <h1 className="text-2xl font-bold text-gray-800 mt-1">
                  {selectedContent.title}
                </h1>
                <span className="text-sm text-indigo-600">
                  Part {selectedContent.part}: {selectedContent.partName}
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

            {/* Work Through Button - Primary CTA */}
            <button
              onClick={() => handleWorkThrough(selectedChallenge)}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors mb-6 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Work Through This Challenge
            </button>

            {/* What You'll Get */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">What You&apos;ll Get</h2>
              <p className="text-gray-600">{selectedContent.whatYouGet}</p>
            </div>

            {/* The Challenge */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">The Challenge</h2>
              <p className="text-gray-700 bg-indigo-50 p-4 rounded-xl">{selectedContent.theChallenge}</p>
            </div>

            {/* Steps */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Steps</h2>
              <ol className="space-y-2">
                {selectedContent.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {idx + 1}
                    </span>
                    <span className="text-gray-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Tips</h2>
              <ul className="space-y-2">
                {selectedContent.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2 text-gray-600">
                    <span className="text-indigo-500">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reflection Questions */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Questions to Consider</h2>
              <ul className="space-y-2 bg-amber-50 p-4 rounded-xl">
                {selectedContent.questions.map((q, idx) => (
                  <li key={idx} className="text-gray-700 italic">&ldquo;{q}&rdquo;</li>
                ))}
              </ul>
            </div>

            {/* Status Buttons */}
            <div className="border-t pt-4 mt-6">
              <div className="flex gap-2">
                {selectedChallengeData.status !== 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(selectedChallenge, 'in_progress')}
                    className="flex-1 bg-amber-100 text-amber-700 py-2 px-4 rounded-lg font-medium hover:bg-amber-200 transition-colors"
                  >
                    Mark In Progress
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
                  className="w-full mt-2 border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                >
                  Set as Current Challenge
                </button>
              )}

              {selectedChallenge === currentChallenge && (
                <p className="text-center text-indigo-600 font-medium mt-2">
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
            <button
              onClick={() => setSelectedChallenge(currentChallenge)}
              className="w-full mt-4 bg-indigo-50 rounded-xl p-4 text-left hover:bg-indigo-100 transition-colors"
            >
              <p className="text-sm text-indigo-600 font-medium mb-1">Current Challenge</p>
              <p className="text-indigo-800 font-semibold">
                {challenges.find(c => c.challengeNumber === currentChallenge)?.title}
              </p>
              <p className="text-sm text-indigo-600 mt-1">Tap to view details →</p>
            </button>
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
