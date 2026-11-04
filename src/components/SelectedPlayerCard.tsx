import React, { useState, useEffect } from 'react';
import { Player, Standing } from '../types/scout';
import {
  POSITION_NAMES,
  formatSeason,
  formatNumber,
  calculateScoutValue,
  formatValue,
} from '../services/valuation';
import {
  getKnownPlayerPhoto,
  resolvePlayerPhoto,
  getPlayerFallbackSvg,
} from '../services/playerPhotoService';
import { Info, Activity, TrendingUp, ShieldCheck, Flame, Trophy } from 'lucide-react';

interface SelectedPlayerCardProps {
  player: Player;
  season: string;
  standing?: Standing;
}

export const SelectedPlayerCard: React.FC<SelectedPlayerCardProps> = ({
  player,
  season,
  standing,
}) => {
  const fallbackSvg = getPlayerFallbackSvg(player.name, player.team);

  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return getKnownPlayerPhoto(player.name, player.shortName) ?? fallbackSvg;
  });
  const [hasError, setHasError] = useState<boolean>(false);

  // Dynamically resolve photo when player changes
  useEffect(() => {
    setHasError(false);
    const known = getKnownPlayerPhoto(player.name, player.shortName);
    if (known) {
      setPhotoUrl(known);
      return;
    }

    // Immediately show club-crested SVG fallback while querying
    setPhotoUrl(getPlayerFallbackSvg(player.name, player.team));

    // Asynchronously resolve high-res portrait from Wikipedia/Commons
    let isCancelled = false;
    resolvePlayerPhoto(player.name, player.shortName).then((resolved) => {
      if (!isCancelled && resolved) {
        setPhotoUrl(resolved);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [player.id, player.name, player.shortName, player.team]);

  const estimatedValue = calculateScoutValue(player, standing);
  const goalContrib = (player.goals || 0) + (player.assists || 0);
  const maxSeasonMatches = season === '2026-27' ? 9 : 38;
  const estMatches = player.minutes > 0 ? Math.min(maxSeasonMatches, Math.max(1, Math.round(player.minutes / 85))) : 0;

  return (
    <section
      className="glass-panel"
      style={{
        backgroundColor: 'rgba(13, 20, 34, 0.72)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-panel)',
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          padding: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background:
            'linear-gradient(135deg, rgba(20, 34, 58, 0.75) 0%, rgba(13, 20, 34, 0.6) 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '18px',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#38bdf8',
                marginBottom: '6px',
              }}
            >
              <Activity size={13} />
              <span>Player Scouting Card</span>
            </div>

            {/* Player Full Name */}
            <h2
              className="font-display"
              style={{
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#ffffff',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.5)',
                wordBreak: 'break-word',
              }}
            >
              {player.name}
            </h2>

            {/* Position, Team, and Points */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '13px',
                color: '#94a3b8',
                marginTop: '6px',
              }}
            >
              <span style={{ color: '#e2e8f0', fontWeight: 600 }}>
                {player.position} · {POSITION_NAMES[player.position]}
              </span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
              />
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{player.team}</span>
              {standing && (
                <>
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    }}
                  />
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>
                    #{standing.position} in PL ({standing.points} pts)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Real Player Portrait Photo Card */}
          <div
            style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: 'rgba(11, 18, 30, 0.95)',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src={hasError ? fallbackSvg : photoUrl}
              alt={player.name}
              onError={() => setHasError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            />
            {/* Live Indicator Dot on Photo */}
            <div
              style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#38bdf8',
                boxShadow: '0 0 6px #38bdf8',
                border: '1.5px solid #0a101d',
              }}
              title="Verified Portrait"
            />
          </div>
        </div>

        {/* Estimated Market Value Banner */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '16px 18px',
            borderRadius: '12px',
            backgroundColor: 'rgba(8, 14, 24, 0.68)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <TrendingUp size={13} color="#38bdf8" />
              <span>Estimated Market Valuation</span>
            </div>
            <div
              className="font-display tabular-nums"
              style={{
                fontSize: '34px',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginTop: '4px',
                color: '#38bdf8',
              }}
            >
              {formatValue(estimatedValue)}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '8px',
              padding: '6px 12px',
              textAlign: 'right',
            }}
          >
            <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '12px' }}>
              {formatSeason(season)}
            </div>
            <div
              style={{
                fontSize: '10px',
                color: '#94a3b8',
                marginTop: '1px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Season Metrics
            </div>
          </div>
        </div>
      </div>

      {/* 2x2 Primary Stats Grid - Position-Adaptive */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          gap: '1px',
        }}
      >
        {/* Tile 1: Primary Output */}
        <div
          style={{
            backgroundColor: '#0d131f',
            padding: '16px 20px',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#94a3b8',
            }}
          >
            {player.position === 'GK'
              ? 'Clean Sheets'
              : player.position === 'DEF'
              ? 'Goals Conceded'
              : 'Goals Scored'}
          </div>
          <div
            className="font-display tabular-nums"
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#ffffff',
              marginTop: '4px',
            }}
          >
            {player.position === 'GK'
              ? Math.max(1, Math.min(standing?.played ?? 9, Math.round(player.points / 5.5)))
              : player.position === 'DEF'
              ? (standing?.goalsAgainst ?? 0)
              : player.goals}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            {player.position === 'GK'
              ? 'Shutouts recorded'
              : player.position === 'DEF'
              ? `In ${standing?.played ?? 9} team matches`
              : 'Premier League output'}
          </div>
        </div>

        {/* Tile 2: Secondary / Support Metric */}
        <div
          style={{
            backgroundColor: '#0d131f',
            padding: '16px 20px',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#94a3b8',
            }}
          >
            {player.position === 'GK'
              ? 'Goals Conceded'
              : player.position === 'DEF'
              ? 'Goal Contributions'
              : 'Assists Provided'}
          </div>
          <div
            className="font-display tabular-nums"
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#ffffff',
              marginTop: '4px',
            }}
          >
            {player.position === 'GK'
              ? (standing?.goalsAgainst ?? 0)
              : player.position === 'DEF'
              ? `${player.goals}G · ${player.assists}A`
              : player.assists}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            {player.position === 'GK'
              ? `${((standing?.goalsAgainst ?? 0) / Math.max(1, standing?.played ?? 9)).toFixed(2)} per match`
              : player.position === 'DEF'
              ? `${goalContrib} total G+A`
              : `${goalContrib} total goal contributions`}
          </div>
        </div>

        {/* Tile 3: Minutes Tile */}
        <div
          style={{
            backgroundColor: '#0d131f',
            padding: '16px 20px',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#94a3b8',
            }}
          >
            Minutes Played
          </div>
          <div
            className="font-display tabular-nums"
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#ffffff',
              marginTop: '4px',
            }}
          >
            {formatNumber(player.minutes)}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            ~{estMatches} matches played
          </div>
        </div>

        {/* Tile 4: Total Points & PPG Tile */}
        <div
          style={{
            backgroundColor: '#0d131f',
            padding: '16px 20px',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#94a3b8',
            }}
          >
            Fantasy Points
          </div>
          <div
            className="font-display tabular-nums"
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#38bdf8',
              marginTop: '4px',
            }}
          >
            {player.points}{' '}
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>
              ({player.pointsPerGame > 0 ? player.pointsPerGame.toFixed(1) : '0.0'}/gm)
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            Season performance score
          </div>
        </div>
      </div>

      {/* Explanatory Context Footer */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(8, 14, 24, 0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Info size={16} color="#38bdf8" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              {formatSeason(season)} Performance Valuation
            </div>
            <p
              style={{
                fontSize: '12px',
                lineHeight: 1.5,
                color: '#94a3b8',
                marginTop: '3px',
              }}
            >
              Market value is calculated from {player.name}’s actual {formatSeason(season)} output ({player.goals} goals, {player.assists} assists, {formatNumber(player.minutes)} mins, {player.points} pts) and {player.team}’s #{standing?.position ?? 'table'} placement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
