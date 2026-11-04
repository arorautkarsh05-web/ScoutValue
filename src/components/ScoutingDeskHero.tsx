import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  CalendarDays,
  Users,
  Activity,
  ChevronDown,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PositionCode } from '../types/scout';
import { POSITION_NAMES, formatSeason } from '../services/valuation';

interface ScoutingDeskHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
  allSeasons: string[];
  selectedPosition: PositionCode | 'All positions';
  onPositionChange: (pos: PositionCode | 'All positions') => void;
}

export const ScoutingDeskHero: React.FC<ScoutingDeskHeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedSeason,
  onSeasonChange,
  allSeasons,
  selectedPosition,
  onPositionChange,
}) => {
  // Custom dropdown open states for scrollable menus
  const [seasonDropdownOpen, setSeasonDropdownOpen] = useState(false);
  const [positionDropdownOpen, setPositionDropdownOpen] = useState(false);

  const seasonRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (seasonRef.current && !seasonRef.current.contains(event.target as Node)) {
        setSeasonDropdownOpen(false);
      }
      if (positionRef.current && !positionRef.current.contains(event.target as Node)) {
        setPositionDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positionOptions: (PositionCode | 'All positions')[] = [
    'All positions',
    'GK',
    'DEF',
    'MID',
    'FWD',
  ];

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        borderBottom: 'none', // Removed dividing line between hero and indexed cards
        color: '#ffffff',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '36px 24px 24px 24px',
        }}
      >
        {/* Top Row: Badge + Season Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '18px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#38bdf8',
            }}
          >
            <Activity size={14} />
            <span>Premier League Scouting Desk</span>
          </div>

          {/* Clean Athletic Matchday Status Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#0e1422',
              border: '1px solid #1e293b',
              fontSize: '12px',
              color: '#94a3b8',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                display: 'inline-block',
                boxShadow: '0 0 6px #10b981',
              }}
            />
            <span style={{ fontWeight: 600, color: '#f1f5f9' }}>2026–27 Matchday 9</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span style={{ color: '#94a3b8' }}>ESPN Live Table Synced</span>
          </div>
        </div>

        {/* Intro Headlines */}
        <div style={{ maxWidth: '850px' }}>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(32px, 4.8vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              marginBottom: '14px',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)',
            }}
          >
            Premier League Scouting
            <br />
            <span
              style={{
                color: '#38bdf8',
              }}
            >
              &amp; Performance Index
            </span>
          </h1>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'rgba(226, 232, 240, 0.88)',
              maxWidth: '680px',
              textShadow: '0 1px 10px rgba(0, 0, 0, 0.6)',
            }}
          >
            Track player output, benchmark performance valuations, and review verified squad stats across eight seasons with live ESPN table integration.
          </p>
        </div>

        {/* 3-Column Search and Filters Grid with Solid Athletic Theme */}
        <div
          style={{
            marginTop: '28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
            maxWidth: '1000px',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minHeight: '54px',
              padding: '0 16px',
              borderRadius: '12px',
              border: '1px solid #1e293b',
              backgroundColor: '#0e1422',
              transition: 'border-color 0.15s ease',
            }}
          >
            <Search size={18} color="#38bdf8" style={{ flexShrink: 0 }} />
            <input
              type="text"
              className="hero-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by player or club..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px',
                fontWeight: 500,
                color: '#ffffff',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Scrollable Season Selector Dropdown */}
          <div
            ref={seasonRef}
            style={{ position: 'relative' }}
          >
            <div
              onClick={() => {
                setSeasonDropdownOpen((prev) => !prev);
                setPositionDropdownOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '54px',
                padding: '0 16px',
                borderRadius: '12px',
                border: seasonDropdownOpen
                  ? '1px solid #38bdf8'
                  : '1px solid #1e293b',
                backgroundColor: '#0e1422',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <CalendarDays size={18} color="#38bdf8" style={{ flexShrink: 0, marginRight: '12px' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#94a3b8',
                    lineHeight: 1,
                    marginTop: '2px',
                  }}
                >
                  Season
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginTop: '3px',
                  }}
                >
                  {formatSeason(selectedSeason)}
                </span>
              </div>
              <ChevronDown
                size={16}
                color="rgba(255, 255, 255, 0.7)"
                style={{
                  transform: seasonDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </div>

            {/* Custom Scrollable Season Menu */}
            {seasonDropdownOpen && (
              <div
                className="custom-scroll"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  maxHeight: '230px',
                  overflowY: 'auto',
                  backgroundColor: '#0b0f19',
                  borderRadius: '12px',
                  border: '1px solid #1e293b',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7)',
                  zIndex: 100,
                  padding: '6px',
                }}
              >
                {allSeasons.map((season) => {
                  const isSelected = season === selectedSeason;
                  return (
                    <div
                      key={season}
                      onClick={() => {
                        onSeasonChange(season);
                        setSeasonDropdownOpen(false);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#38bdf8' : '#ffffff',
                        backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>{formatSeason(season)}</span>
                      {isSelected && <Check size={14} color="#38bdf8" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Scrollable Position Selector Dropdown */}
          <div
            ref={positionRef}
            style={{ position: 'relative' }}
          >
            <div
              onClick={() => {
                setPositionDropdownOpen((prev) => !prev);
                setSeasonDropdownOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '54px',
                padding: '0 16px',
                borderRadius: '12px',
                border: positionDropdownOpen
                  ? '1px solid #38bdf8'
                  : '1px solid #1e293b',
                backgroundColor: '#0e1422',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Users size={18} color="#38bdf8" style={{ flexShrink: 0, marginRight: '12px' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#94a3b8',
                    lineHeight: 1,
                    marginTop: '2px',
                  }}
                >
                  Position
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginTop: '3px',
                  }}
                >
                  {selectedPosition === 'All positions'
                    ? 'All positions'
                    : POSITION_NAMES[selectedPosition]}
                </span>
              </div>
              <ChevronDown
                size={16}
                color="rgba(255, 255, 255, 0.7)"
                style={{
                  transform: positionDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </div>

            {/* Custom Scrollable Position Menu */}
            {positionDropdownOpen && (
              <div
                className="custom-scroll"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  maxHeight: '230px',
                  overflowY: 'auto',
                  backgroundColor: '#0b0f19',
                  borderRadius: '12px',
                  border: '1px solid #1e293b',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7)',
                  zIndex: 100,
                  padding: '6px',
                }}
              >
                {positionOptions.map((pos) => {
                  const isSelected = pos === selectedPosition;
                  const label =
                    pos === 'All positions' ? 'All positions' : `${pos} · ${POSITION_NAMES[pos]}`;
                  return (
                    <div
                      key={pos}
                      onClick={() => {
                        onPositionChange(pos);
                        setPositionDropdownOpen(false);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#38bdf8' : '#ffffff',
                        backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.14)' : 'transparent',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>{label}</span>
                      {isSelected && <Check size={14} color="#38bdf8" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
