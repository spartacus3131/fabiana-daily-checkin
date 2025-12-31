'use client';

import { DailyEntry, ChallengeProgress, UserState, CHALLENGES, WeeklyGoal, ParkingLotItem } from './types';

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
    weeklyGoals: [],
    parkingLot: [],
  };
}

// Get the Monday of the current week
export function getCurrentWeekMonday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
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
    // Ensure weeklyGoals and parkingLot exist
    if (!parsed.weeklyGoals) parsed.weeklyGoals = [];
    if (!parsed.parkingLot) parsed.parkingLot = [];

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

export function getChallengeEntry(state: UserState, date: string, challengeNumber: number): DailyEntry | undefined {
  return state.entries.find(e => e.date === date && e.type === 'challenge' && e.challengeNumber === challengeNumber);
}

export function getAllChallengeEntries(state: UserState): DailyEntry[] {
  return state.entries.filter(e => e.type === 'challenge').sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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

// Weekly Goals functions
export function getCurrentWeekGoals(state: UserState): WeeklyGoal[] {
  const currentWeek = getCurrentWeekMonday();
  return state.weeklyGoals.filter(g => g.weekOf === currentWeek);
}

export function addWeeklyGoal(state: UserState, text: string): UserState {
  const goal: WeeklyGoal = {
    id: crypto.randomUUID(),
    text,
    status: 'pending',
    weekOf: getCurrentWeekMonday(),
    createdAt: new Date(),
  };
  state.weeklyGoals.push(goal);
  saveState(state);
  return state;
}

export function updateWeeklyGoal(
  state: UserState,
  goalId: string,
  updates: Partial<Pick<WeeklyGoal, 'text' | 'status'>>
): UserState {
  const goal = state.weeklyGoals.find(g => g.id === goalId);
  if (goal) {
    if (updates.text) goal.text = updates.text;
    if (updates.status) {
      goal.status = updates.status;
      if (updates.status === 'completed') {
        goal.completedAt = new Date();
      }
    }
    saveState(state);
  }
  return state;
}

export function deleteWeeklyGoal(state: UserState, goalId: string): UserState {
  state.weeklyGoals = state.weeklyGoals.filter(g => g.id !== goalId);
  saveState(state);
  return state;
}

// Parking Lot functions
export function getActiveParkingLotItems(state: UserState): ParkingLotItem[] {
  return state.parkingLot.filter(item => !item.resolved && !item.promoted);
}

export function addParkingLotItem(state: UserState, text: string, source?: string): UserState {
  const item: ParkingLotItem = {
    id: crypto.randomUUID(),
    text,
    addedAt: new Date(),
    source,
  };
  state.parkingLot.push(item);
  saveState(state);
  return state;
}

export function promoteParkingLotItem(state: UserState, itemId: string): UserState {
  const item = state.parkingLot.find(i => i.id === itemId);
  if (item) {
    item.promoted = true;
    item.promotedAt = new Date();
    saveState(state);
  }
  return state;
}

export function resolveParkingLotItem(state: UserState, itemId: string): UserState {
  const item = state.parkingLot.find(i => i.id === itemId);
  if (item) {
    item.resolved = true;
    item.resolvedAt = new Date();
    saveState(state);
  }
  return state;
}

export function deleteParkingLotItem(state: UserState, itemId: string): UserState {
  state.parkingLot = state.parkingLot.filter(i => i.id !== itemId);
  saveState(state);
  return state;
}
