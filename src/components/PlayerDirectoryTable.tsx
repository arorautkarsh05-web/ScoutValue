import React, { useState, useRef, useEffect } from 'react';
import { Player, Standing } from '../types/scout';
import {
  POSITION_NAMES,
  formatSeason,
  formatNumber,
  getInitials,
  calculateScoutValue,
  formatValue,
} from '../services/valuation';
import { getKnownPlayerPhoto, resolvePlayerPhoto, getPlayerFallbackSvg } from '../services/playerPhotoService';
import { ChevronDown, ArrowUpRight, Search, Users, Check } from 'lucide-react';

interface PlayerDirectoryTableProps {
  players: Player[];
  allClubs: string[];
  selectedClub: string;
  onClubChange: (club: string) => void;
  selectedPlayer: Player | null;
  onSelectPlayer: (player: Player) => void;
  season: string;
  standingsMap: Map<string, Standing>;
  showAll: boolean;
  onToggleShowAll: () => void;
}

interface PlayerAvatarProps {
  player: Player;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ player }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    return getKnownPlayerPhoto(player.name, player.shortName) || null;
  });
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
    const known = getKnownPlayerPhoto(player.name, player.shortName);
    if (known) {
      setPhotoUrl(known);
      return;
    }

    let isMounted = true;
    resolvePlayerPhoto(player.name, player.shortName).then((resolved) => {
      if (isMounted && resolved) {
        setPhotoUrl(resolved);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [player.id, player.name, player.shortName]);

  if (photoUrl && !loadFailed) {
    return (
      <img
        src={photoUrl}
        alt={player.name}
        onError={() => setLoadFailed(true)}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
      />
    );
  }

  return (
    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', userSelect: 'none' }}>
      {getInitials(player.name)}
    </span>
  );
};

export const PlayerDirectoryTable: React.FC<PlayerDirectoryTableProps> = ({
  players,
  allClubs,
  selectedClub,
  onClubChange,
  selectedPlayer,
  onSelectPlayer,
  season,
  standingsMap,
  showAll,
  onToggleShowAll,
}) => {
  const displayedPlayers = showAll ? players : players.slice(0, 12);

  // Custom Club Dropdown State with Scroll
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false);
  const clubRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clubRef.current && !clubRef.current.contains(event.target as Node)) {
        setClubDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section
      style={{
        backgroundColor: '#0c121e',
        border: '1px solid #1e293b',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          borderBottom: '1px solid #1e293b',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#38bdf8',
              marginBottom: '4px',
            }}
          >
            <Users size={13} />
            <span>Squad Registry</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#f8fafc',
              letterSpacing: '-0.02em',
            }}
          >
            {selectedClub === 'All Clubs' || selectedClub === 'All clubs' ? 'Premier League Squad Directory' : `${selectedClub} Squad`}
          </h2>

          <p
            style={{
              fontSize: '13px',
              color: '#94a3b8',
              marginTop: '2px',
            }}
          >
            {formatSeason(season)} campaign roster · {players.length} players indexed
          </p>
        </div>

        {/* Scrollable Custom Club Selector Dropdown */}
        <div ref={clubRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setClubDropdownOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 14px',
              borderRadius: '10px',
              border: clubDropdownOpen
                ? '1px solid #38bdf8'
                : '1px solid #243247',
              backgroundColor: '#080d18',
              minWidth: '220px',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease',
            }}
          >
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Club:</span>
            <span
              style={{
                flex: 1,
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                textAlign: 'right',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {selectedClub}
            </span>
            <ChevronDown
              size={15}
              color="rgba(255, 255, 255, 0.7)"
              style={{
                transform: clubDropdownOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}
            />
          </div>

          {/* Custom Scrollable Club Menu */}
          {clubDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                zIndex: 50,
                width: '260px',
                maxHeight: '320px',
                overflowY: 'auto',
                backgroundColor: '#0b0f19',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7)',
                padding: '6px',
              }}
            >
              <div
                style={{
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#94a3b8',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '4px',
                }}
              >
                Scroll to select club ({allClubs.length})
              </div>
              <div
                onClick={() => {
                  onClubChange('All clubs');
                  setClubDropdownOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: selectedClub === 'All clubs' ? 700 : 500,
                  color: selectedClub === 'All clubs' ? '#38bdf8' : '#e2e8f0',
                  backgroundColor:
                    selectedClub === 'All clubs' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  transition: 'background-color 0.12s ease',
                }}
                onMouseEnter={(e) => {
                  if (selectedClub !== 'All clubs')
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  if (selectedClub !== 'All clubs')
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>All clubs</span>
                {selectedClub === 'All clubs' && <Check size={14} color="#38bdf8" />}
              </div>

              {allClubs.map((club) => {
                const isCurrent = selectedClub === club;
                return (
                  <div
                    key={club}
                    onClick={() => {
                      onClubChange(club);
                      setClubDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? '#38bdf8' : '#e2e8f0',
                      backgroundColor: isCurrent
                        ? 'rgba(56, 189, 248, 0.15)'
                        : 'transparent',
                      transition: 'background-color 0.12s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrent) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrent) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span>{club}</span>
                    {isCurrent && <Check size={14} color="#38bdf8" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Scrollable Quick-Filter Club Chips */}
      <div
        ref={horizontalScrollRef}
        className="custom-scroll"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          borderBottom: '1px solid #1e293b',
          backgroundColor: '#090e18',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#64748b',
            marginRight: '4px',
            flexShrink: 0,
          }}
        >
          Filter by Club:
        </span>

        {/* All clubs pill */}
        <button
          type="button"
          onClick={() => onClubChange('All clubs')}
          style={{
            padding: '5px 12px',
            borderRadius: '9999px',
            border:
              selectedClub === 'All clubs'
                ? '1px solid #38bdf8'
                : '1px solid #1e293b',
            backgroundColor:
              selectedClub === 'All clubs'
                ? 'rgba(56, 189, 248, 0.16)'
                : '#0f172a',
            color: selectedClub === 'All clubs' ? '#38bdf8' : '#e2e8f0',
            fontSize: '12px',
            fontWeight: selectedClub === 'All clubs' ? 700 : 500,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          All clubs
        </button>

        {/* All Club Pills */}
        {allClubs.map((club) => {
          const isSelected = club === selectedClub;
          return (
            <button
              key={club}
              type="button"
              onClick={() => onClubChange(club)}
              style={{
                padding: '5px 12px',
                borderRadius: '9999px',
                border: isSelected
                  ? '1px solid #38bdf8'
                  : '1px solid #1e293b',
                backgroundColor: isSelected
                  ? 'rgba(56, 189, 248, 0.16)'
                  : '#0f172a',
                color: isSelected ? '#38bdf8' : '#cbd5e1',
                fontSize: '12px',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
            >
              {club}
            </button>
          );
        })}
      </div>

      {/* Table Content */}
      <div
        className="table-scroll-container"
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <table
          style={{
            width: '100%',
            textAlign: 'left',
            borderCollapse: 'collapse',
            fontSize: '14px',
            minWidth: '820px',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '1px solid #1e293b',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#94a3b8',
                backgroundColor: '#090e18',
              }}
            >
              <th style={{ padding: '12px 24px' }}>Player</th>
              <th style={{ padding: '12px 16px' }}>Club</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Matches</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Minutes</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Goals</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Assists</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>G+A</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Points</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>PPG</th>
              <th style={{ padding: '12px 24px', textAlign: 'right', color: '#38bdf8' }}>Est. Value</th>
            </tr>
          </thead>
          <tbody>
            {displayedPlayers.map((player) => {
              const isSelected = selectedPlayer?.id === player.id;
              const standing = standingsMap.get(player.team);
              const scoutValue = calculateScoutValue(player, standing);
              const maxSeasonMatches = season === '2026-27' ? 9 : 38;
              const matchesPlayed = player.minutes > 0 ? Math.min(maxSeasonMatches, Math.max(1, Math.round(player.minutes / 85))) : 0;

              return (
                <tr
                  key={player.id}
                  onClick={() => onSelectPlayer(player)}
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #162032',
                    backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #38bdf8' : '3px solid transparent',
                    transition: 'background-color 0.15s ease, border-left-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {/* Player Cell */}
                  <td style={{ padding: '12px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          flexShrink: 0,
                          backgroundColor: isSelected
                            ? '#38bdf8'
                            : 'rgba(255, 255, 255, 0.1)',
                          color: isSelected ? '#08111e' : '#ffffff',
                          border: isSelected
                            ? '1px solid #38bdf8'
                            : '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <PlayerAvatar player={player} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#ffffff' }}>
                          {player.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                          {player.position} · {POSITION_NAMES[player.position]}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Club Cell */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#ffffff' }}>
                      {player.teamShort}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      {player.team}
                    </div>
                  </td>

                  {/* Matches */}
                  <td
                    className="tabular-nums"
                    style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#94a3b8' }}
                  >
                    {matchesPlayed}
                  </td>

                  {/* Minutes */}
                  <td
                    className="tabular-nums"
                    style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#cbd5e1' }}
                  >
                    {formatNumber(player.minutes)}
                  </td>

                  {/* Goals */}
                  <td
                    className="tabular-nums"
                    style={{
                      padding: '12px 16px',
                      textAlign: 'right',
                      fontWeight: player.goals > 0 ? 700 : 500,
                      color: player.goals > 0 ? '#38bdf8' : '#64748b',
                    }}
                  >
                    {player.goals}
                  </td>

                  {/* Assists */}
                  <td
                    className="tabular-nums"
                    style={{
                      padding: '12px 16px',
                      textAlign: 'right',
                      fontWeight: player.assists > 0 ? 700 : 500,
                      color: player.assists > 0 ? '#e2e8f0' : '#64748b',
                    }}
                  >
                    {player.assists}
                  </td>

                  {/* G+A */}
                  <td
                    className="tabular-nums"
                    style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#ffffff' }}
                  >
                    {player.goals + player.assists}
                  </td>

                  {/* Points */}
                  <td
                    className="tabular-nums"
                    style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#ffffff' }}
                  >
                    {player.points}
                  </td>

                  {/* Points Per Game */}
                  <td
                    className="tabular-nums"
                    style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#94a3b8' }}
                  >
                    {typeof player.pointsPerGame === 'number' && player.pointsPerGame > 0
                      ? player.pointsPerGame.toFixed(1)
                      : (player.points / Math.max(1, Math.round(player.minutes / 82 || 1))).toFixed(1)}
                  </td>

                  {/* Scout Value */}
                  <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                    <span
                      className="font-display tabular-nums"
                      style={{
                        fontWeight: 700,
                        fontSize: '14px',
                        color: '#38bdf8',
                      }}
                    >
                      {formatValue(scoutValue)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {players.length === 0 && (
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <Search size={28} color="#64748b" style={{ margin: '0 auto' }} />
          <div style={{ fontWeight: 600, marginTop: '12px', color: '#ffffff' }}>
            No players found
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            Try a different name, club, or position.
          </div>
        </div>
      )}

      {/* Bottom Pagination / Toggle Bar */}
      {players.length > 12 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 24px',
            backgroundColor: '#090e18',
            borderTop: '1px solid #1e293b',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 500, color: '#94a3b8' }}>
            Showing {displayedPlayers.length} of {players.length} matching players
          </span>

          <button
            type="button"
            onClick={onToggleShowAll}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.16)';
              e.currentTarget.style.borderColor = '#38bdf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0f172a';
              e.currentTarget.style.borderColor = '#1e293b';
            }}
          >
            <span>{showAll ? 'Show top 12' : 'Show all players'}</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      )}
    </section>
  );
};
