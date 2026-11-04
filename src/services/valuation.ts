import { Player, Standing } from '../types/scout';

export const POSITION_NAMES: Record<string, string> = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward',
};

export const POSITION_MULTIPLIERS: Record<string, number> = {
  GK: 0.85,
  DEF: 0.95,
  MID: 1.12,
  FWD: 1.20,
};

export const formatSeason = (season: string): string => season.replace('-', '–');

export const formatNumber = (num: number): string => new Intl.NumberFormat('en-GB').format(num);

export const getInitials = (name: string): string =>
  name
    .replace(/[\uFFFD]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

/**
 * Calculates a realistic performance-based market value estimate in Millions (€m)
 * strictly tied to the player's output in the current selected season:
 * Goals, Assists, Minutes, Total Fantasy Points, PPG, and Club League Placement.
 */
export function calculateScoutValue(player: Player, standing?: Standing): number {
  if (!player) return 5.0;

  // Minutes & Durability Factor (0 to 1.15)
  // Max standard season is ~3,420 mins (38 * 90)
  const minutes = Math.max(0, player.minutes || 0);
  const minutesFactor = minutes === 0 ? 0.25 : Math.min(1.2, 0.35 + (minutes / 2800) * 0.75);

  // Direct Output Value (Goals + Assists + Fantasy Points in selected season)
  const goalsVal = (player.goals || 0) * (player.position === 'DEF' ? 4.5 : 3.2);
  const assistsVal = (player.assists || 0) * 2.6;
  const pointsVal = (player.points || 0) * 0.22;
  const ppgBonus = Math.max(0, (player.pointsPerGame || 0) - 2.5) * 5.5;

  const seasonPerformanceOutput = goalsVal + assistsVal + pointsVal + ppgBonus;

  // Base tier from player's cost baseline (scaled from FPL £4.0m-£15.0m baseline to €10m-€45m base)
  const baselineCost = Math.max(4.0, player.nowCost || 5.0);
  const baseTier = baselineCost * 3.2;

  // Table Finish Bonus (Top 4 UCL finish gives prestige multiplier)
  let tableMultiplier = 1.0;
  if (standing && standing.position > 0) {
    if (standing.position === 1) tableMultiplier = 1.28;
    else if (standing.position <= 4) tableMultiplier = 1.18;
    else if (standing.position <= 7) tableMultiplier = 1.08;
    else if (standing.position <= 14) tableMultiplier = 0.98;
    else tableMultiplier = 0.88; // Relegation struggle discount
  }

  // Positional Premium
  const posMult = POSITION_MULTIPLIERS[player.position] ?? 1.0;

  // Combined Valuation
  let totalValue: number;
  if (minutes === 0 && (player.points || 0) === 0) {
    // Unplayed / Reserve in this season
    totalValue = Math.max(2.5, baseTier * 0.35 * tableMultiplier);
  } else {
    // Active season formula
    totalValue = (baseTier * 0.45 + seasonPerformanceOutput * minutesFactor) * posMult * tableMultiplier;
  }

  // Cap and round to 1 decimal place (realistic range €2.0m to €195m)
  const boundedValue = Math.min(195.0, Math.max(2.0, totalValue));
  return Math.round(boundedValue * 10) / 10;
}

export function formatValue(value: number): string {
  if (!value || Number.isNaN(value)) return '€10m';
  return value >= 100 ? `€${Math.round(value)}m` : `€${value.toFixed(1)}m`;
}
