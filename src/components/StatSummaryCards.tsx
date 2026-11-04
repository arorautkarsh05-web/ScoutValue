import React from 'react';
import { Users, Trophy, CalendarDays } from 'lucide-react';
import { formatSeason, formatNumber } from '../services/valuation';

interface StatSummaryCardsProps {
  playersCount: number;
  clubsCount: number;
  season: string;
}

export const StatSummaryCards: React.FC<StatSummaryCardsProps> = ({
  playersCount,
  clubsCount,
  season,
}) => {
  const cards = [
    {
      label: 'Players indexed',
      value: formatNumber(playersCount),
      detail: `${formatSeason(season)} squad data`,
      icon: <Users size={18} color="#38bdf8" />,
    },
    {
      label: 'Clubs ranked',
      value: String(clubsCount),
      detail: 'Final league table',
      icon: <Trophy size={18} color="#38bdf8" />,
    },
    {
      label: 'Season selected',
      value: formatSeason(season),
      detail: 'Change season above',
      icon: <CalendarDays size={18} color="#38bdf8" />,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: '#0c121e',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '20px 24px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
            transition: 'border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#38bdf8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1e293b';
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#94a3b8',
              }}
            >
              {card.label}
            </span>
            <span>{card.icon}</span>
          </div>

          <div
            className="font-display tabular-nums"
            style={{
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginTop: '10px',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
            }}
          >
            {card.value}
          </div>

          <div
            style={{
              fontSize: '12px',
              color: '#94a3b8',
              marginTop: '4px',
            }}
          >
            {card.detail}
          </div>
        </div>
      ))}
    </div>
  );
};
