import React from 'react';
import { Standing } from '../types/scout';
import { Trophy, ArrowUpRight } from 'lucide-react';

interface ClubContextCardProps {
  standing: Standing;
  standings: Standing[];
}

export const ClubContextCard: React.FC<ClubContextCardProps> = ({ standing, standings }) => {
  const getOrdinal = (n: number) => {
    if (n === 1) return 'st';
    if (n === 2) return 'nd';
    if (n === 3) return 'rd';
    return 'th';
  };

  const startIndex = Math.max(0, standing.position - 3);
  const slicedStandings = standings.slice(startIndex, Math.min(standings.length, startIndex + 5));

  const formatGd = (gd?: number) => {
    if (gd === undefined || Number.isNaN(gd)) return '0';
    if (gd > 0) return `+${gd}`;
    return String(gd);
  };

  return (
    <section
      style={{
        backgroundColor: '#0c121e',
        border: '1px solid #1e293b',
        borderRadius: '14px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#38bdf8',
            }}
          >
            <Trophy size={15} />
            <span>League Table Context</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              marginTop: '6px',
            }}
          >
            {standing.team} Standing
          </h2>

          <p
            style={{
              fontSize: '13px',
              color: '#94a3b8',
              marginTop: '2px',
            }}
          >
            Premier League standings reference
          </p>
        </div>

        {/* Big Position Display */}
        <div style={{ textAlign: 'right' }}>
          <div
            className="font-display"
            style={{
              fontSize: '38px',
              fontWeight: 800,
              lineHeight: 1,
              color: '#38bdf8',
            }}
          >
            {standing.position}
            <sup style={{ fontSize: '16px', fontWeight: 700 }}>{getOrdinal(standing.position)}</sup>
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#94a3b8',
              marginTop: '4px',
            }}
          >
            position
          </div>
        </div>
      </div>

      {/* Quick Club Record Metric Strip (W - D - L - GD - Pts) */}
      <div
        style={{
          marginTop: '18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '6px',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: '#080d18',
          border: '1px solid #1e293b',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Won</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>{standing.wins}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Drawn</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>{standing.draws}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Lost</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#f87171', marginTop: '2px' }}>{standing.losses}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>GD</div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: (standing.goalDifference ?? 0) >= 0 ? '#38bdf8' : '#f87171',
              marginTop: '2px',
            }}
          >
            {formatGd(standing.goalDifference)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Pts</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{standing.points}</div>
        </div>
      </div>

      {/* Mini Standings Preview Table with GD */}
      <div
        style={{
          marginTop: '16px',
          borderRadius: '10px',
          border: '1px solid #1e293b',
          overflow: 'hidden',
          backgroundColor: '#080d18',
        }}
      >
        {/* Table Head: Club | P | W | D | L | GD | Pts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr repeat(6, 32px)',
            gap: '6px',
            padding: '8px 12px',
            backgroundColor: '#0a101f',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#94a3b8',
          }}
        >
          <span>Club</span>
          <span style={{ textAlign: 'center' }}>P</span>
          <span style={{ textAlign: 'center' }}>W</span>
          <span style={{ textAlign: 'center' }}>D</span>
          <span style={{ textAlign: 'center' }}>L</span>
          <span style={{ textAlign: 'center' }}>GD</span>
          <span style={{ textAlign: 'center' }}>Pts</span>
        </div>

        {/* Table Rows */}
        {slicedStandings.map((club) => {
          const isCurrentClub = club.team === standing.team;

          return (
            <div
              key={club.team}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr repeat(6, 32px)',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderTop: '1px solid #162032',
                fontSize: '12px',
                backgroundColor: isCurrentClub ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                fontWeight: isCurrentClub ? 700 : 500,
                color: isCurrentClub ? '#38bdf8' : '#ffffff',
                borderLeft: isCurrentClub ? '3px solid #38bdf8' : '3px solid transparent',
                transition: 'background-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <span
                  style={{
                    width: '16px',
                    fontSize: '11px',
                    color: isCurrentClub ? '#38bdf8' : '#64748b',
                  }}
                >
                  {club.position}
                </span>
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: isCurrentClub ? '#ffffff' : '#e2e8f0',
                  }}
                >
                  {club.team}
                </span>
              </div>

              <span className="tabular-nums" style={{ textAlign: 'center', color: '#94a3b8' }}>
                {club.played}
              </span>
              <span className="tabular-nums" style={{ textAlign: 'center', color: '#cbd5e1' }}>
                {club.wins}
              </span>
              <span className="tabular-nums" style={{ textAlign: 'center', color: '#cbd5e1' }}>
                {club.draws}
              </span>
              <span className="tabular-nums" style={{ textAlign: 'center', color: '#cbd5e1' }}>
                {club.losses}
              </span>
              <span
                className="tabular-nums"
                style={{
                  textAlign: 'center',
                  fontWeight: 600,
                  color: (club.goalDifference ?? 0) >= 0 ? '#38bdf8' : '#94a3b8',
                }}
              >
                {formatGd(club.goalDifference)}
              </span>
              <span
                className="tabular-nums"
                style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  color: isCurrentClub ? '#38bdf8' : '#ffffff',
                }}
              >
                {club.points}
              </span>
            </div>
          );
        })}
      </div>

      {/* Table Context Footer with full GD */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#94a3b8',
        }}
      >
        <span>Club Record:</span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 700,
            color: '#38bdf8',
          }}
        >
          <span>
            {standing.wins}W · {standing.draws}D · {standing.losses}L · {formatGd(standing.goalDifference)} GD
          </span>
          <ArrowUpRight size={14} />
        </span>
      </div>
    </section>
  );
};
