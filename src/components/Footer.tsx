import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid #1e293b',
        backgroundColor: '#090e18',
        padding: '24px',
        fontSize: '12px',
        color: '#94a3b8',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <span>ScoutValue valuations are statistical estimates derived from Premier League match data and ESPN standings.</span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#38bdf8',
            fontWeight: 600,
          }}
        >
          <ShieldCheck size={16} />
          <span>Premier League Data Reference</span>
        </span>
      </div>
    </footer>
  );
};
