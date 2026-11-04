import React from 'react';
import { BarChart3, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuide }) => {
  return (
    <header
      style={{
        borderBottom: '1px solid #1e293b',
        backgroundColor: '#090e18',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#38bdf8',
              color: '#08111e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BarChart3 size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div
              className="font-display"
              style={{
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                lineHeight: 1.15,
              }}
            >
              ScoutValue
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#64748b',
              }}
            >
              Premier League Analytics
            </div>
          </div>
        </div>

        {/* Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#94a3b8',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              display: 'inline-block',
            }}
          />
          <span>2026–27 Matchday 9 Data</span>
          <span style={{ color: '#334155', margin: '0 4px' }}>·</span>
          <span style={{ color: '#cbd5e1', fontWeight: 600 }}>ESPN Source</span>
        </div>

        {/* Guide Trigger Button */}
        <button
          type="button"
          onClick={onOpenGuide}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#38bdf8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1e293b';
          }}
        >
          <HelpCircle size={15} color="#38bdf8" />
          <span>Scouting Model Guide</span>
        </button>
      </div>
    </header>
  );
};
