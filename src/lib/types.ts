export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface WeeklyGoal {
  id: string;
  text: string;
  status: 'pending' | 'in_progress' | 'completed';
  weekOf: string; // YYYY-MM-DD of the Monday of that week
  createdAt: Date;
  completedAt?: Date;
}

export interface ParkingLotItem {
  id: string;
  text: string;
  addedAt: Date;
  source?: string; // e.g., "morning check-in 2024-01-15"
  promoted?: boolean; // if it became a priority
  promotedAt?: Date;
  resolved?: boolean;
  resolvedAt?: Date;
}

export interface DailyEntry {
  id: string;
  date: string; // YYYY-MM-DD
  type: 'morning' | 'evening' | 'challenge';
  challengeNumber?: number; // Only for type: 'challenge'
  challengeTitle?: string; // Only for type: 'challenge'
  messages: Message[];
  summary?: {
    brainDump?: string;
    top3?: string[];
    whatGotDone?: string[];
    gratitude?: string[];
    insights?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ChallengeProgress {
  challengeNumber: number;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  notes?: string;
}

export interface UserState {
  currentChallenge: number;
  challenges: ChallengeProgress[];
  entries: DailyEntry[];
  weeklyGoals: WeeklyGoal[];
  parkingLot: ParkingLotItem[];
}

export const CHALLENGES = [
  { number: 1, title: "The Values Challenge", part: 1 },
  { number: 2, title: "The Impact Challenge", part: 1 },
  { number: 3, title: "The Rule of 3 Challenge", part: 1 },
  { number: 4, title: "The Prime-Time Challenge", part: 2 },
  { number: 5, title: "The Flipping Challenge", part: 2 },
  { number: 6, title: "The Time-Traveling Challenge", part: 2 },
  { number: 7, title: "The Disconnecting Challenge", part: 2 },
  { number: 8, title: "The Shrink Your Work Challenge", part: 3 },
  { number: 9, title: "The Working in Prime Time Challenge", part: 3 },
  { number: 10, title: "The Maintenance Challenge", part: 3 },
  { number: 11, title: "The Zenning Out Challenge", part: 3 },
  { number: 12, title: "The Delegation Challenge", part: 3 },
  { number: 13, title: "The Capture Challenge", part: 4 },
  { number: 14, title: "The Hot Spot Challenge", part: 4 },
  { number: 15, title: "The Wandering Challenge", part: 4 },
  { number: 16, title: "The Notification Challenge", part: 5 },
  { number: 17, title: "The Single-Tasking Challenge", part: 5 },
  { number: 18, title: "The Meditation Challenge", part: 5 },
  { number: 19, title: "The Lamest Diet Challenge", part: 6 },
  { number: 20, title: "The Water Challenge", part: 6 },
  { number: 21, title: "The Heart Rate Challenge", part: 6 },
  { number: 22, title: "The Sleeping Challenge", part: 6 },
] as const;
