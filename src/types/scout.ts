export type PositionCode = 'GK' | 'DEF' | 'MID' | 'FWD' | '—' | string;

export interface Player {
  id: string;
  name: string;
  shortName: string;
  position: PositionCode;
  team: string;
  teamShort: string;
  teamId: number;
  minutes: number;
  goals: number;
  assists: number;
  points: number;
  pointsPerGame: number;
  nowCost: number;
  status: string;
  photoUrl?: string;
}

export interface Standing {
  team: string;
  shortName: string;
  position: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
  points: number;
}

export interface SeasonData {
  season: string;
  players: Player[];
  standings: Standing[];
}
