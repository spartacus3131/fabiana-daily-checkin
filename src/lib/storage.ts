'use client';

import { DailyEntry, ChallengeProgress, UserState, CHALLENGES } from './types';

const STORAGE_KEY = 'fabiana_productivity';

function getDefaultState(): UserState {
  return {
    currentChallenge: 1,
    challenges: CHALLENGES.map(c => ({
      challengeNumber: c.number,
      title: c.title,
      status: 'not_started' as const,
    })),
    entries: [],
  };
}

export function loadState(): UserState {
  if (typeof window === 'undefined') return getDefaultState();

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return getDefaultState();

    const parsed = JSON.parse(saved);
    // Ensure all challenges exist
    if (!parsed.challenges || parsed.challenges.length < CHALLENGES.length) {
      parsed.challenges = CHALLENGES.map(c => {
        const existing = parsed.challenges?.find((p: ChallengeProgress) => p.challengeNumber === c.number);
        return existing || {
          challengeNumber: c.number,
          title: c.title,
          status: 'not_started' as const,
        };
      });
    }
    return parsed;
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: UserState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export function getEntryForDate(state: UserState, date: string, type: 'morning' | 'evening'): DailyEntry | undefined {
  return state.entries.find(e => e.date === date && e.type === type);
}

export function saveEntry(state: UserState, entry: DailyEntry): UserState {
  const existingIndex = state.entries.findIndex(e => e.id === entry.id);
  if (existingIndex >= 0) {
    state.entries[existingIndex] = entry;
  } else {
    state.entries.push(entry);
  }
  saveState(state);
  return state;
}

export function updateChallengeProgress(
  state: UserState,
  challengeNumber: number,
  status: ChallengeProgress['status'],
  notes?: string
): UserState {
  const challenge = state.challenges.find(c => c.challengeNumber === challengeNumber);
  if (challenge) {
    challenge.status = status;
    if (status === 'in_progress' && !challenge.startedAt) {
      challenge.startedAt = new Date();
    }
    if (status === 'completed') {
      challenge.completedAt = new Date();
    }
    if (notes) {
      challenge.notes = notes;
    }

    // Update current challenge if needed
    if (status === 'completed' && challengeNumber === state.currentChallenge) {
      const nextIncomplete = state.challenges.find(c => c.status !== 'completed');
      if (nextIncomplete) {
        state.currentChallenge = nextIncomplete.challengeNumber;
      }
    }
  }
  saveState(state);
  return state;
}

export function getCurrentChallenge(state: UserState): ChallengeProgress | undefined {
  return state.challenges.find(c => c.challengeNumber === state.currentChallenge);
}
