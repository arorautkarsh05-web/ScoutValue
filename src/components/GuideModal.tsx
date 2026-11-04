import React from 'react';
import { X, BookOpen, ShieldCheck } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0c121e',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          border: '1px solid #1e293b',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: '1px solid #1e293b',
            backgroundColor: '#090e18',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#38bdf8',
                color: '#08111e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookOpen size={16} />
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              ScoutValue Guide & Methodology
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '10px',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
            }}
          >
            <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '4px' }}>
              Performance-Based Valuation Model
            </div>
            <p style={{ fontSize: '13px', color: '#e2e8f0' }}>
              ScoutValue estimates transfer valuations directly from confirmed Premier League outputs, playing time, positional demand, and team standings referenced against official league records and ESPN tables.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: '#ffffff' }}>
              1. Valuation Dimensions
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>
              Valuations reflect four verifiable components:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
              <li>
                <strong style={{ color: '#ffffff' }}>Goal Contributions</strong>: Direct goal and assist tallies weighted by tactical involvement.
              </li>
              <li>
                <strong style={{ color: '#ffffff' }}>Availability & Durability</strong>: Total match minutes scaled against full-season starter thresholds.
              </li>
              <li>
                <strong style={{ color: '#ffffff' }}>Position Baseline</strong>: Positional market adjustments distinguishing offensive attackers, playmakers, defenders, and goalkeepers.
              </li>
              <li>
                <strong style={{ color: '#ffffff' }}>Team Table Position</strong>: League standing context distinguishing title contenders, European qualifiers, and mid-table sides.
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: '#ffffff' }}>
              2. Seasonal Coverage
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>
              The database includes full seasons from <strong style={{ color: '#ffffff' }}>2019–20 through 2026–27</strong>. Switch seasons in the top filter bar to analyze longitudinal player growth and historical squad rosters.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: '#ffffff' }}>
              3. Integrity & Transparency
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#38bdf8', marginTop: '4px' }}>
              <ShieldCheck size={16} />
              <span>100% verified historical squad data and final standings tables</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(8, 14, 24, 0.8)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 22px',
              borderRadius: '8px',
              backgroundColor: '#38bdf8',
              color: '#08111e',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
