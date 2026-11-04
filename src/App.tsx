import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ScoutingDeskHero } from './components/ScoutingDeskHero';
import { StatSummaryCards } from './components/StatSummaryCards';
import { PlayerDirectoryTable } from './components/PlayerDirectoryTable';
import { SelectedPlayerCard } from './components/SelectedPlayerCard';
import { ClubContextCard } from './components/ClubContextCard';
import { GuideModal } from './components/GuideModal';
import { Footer } from './components/Footer';

import { SQUAD_SEASONS_DATA } from './data/squadStatsData';
import { Player, PositionCode } from './types/scout';
import { getSeasonStandings } from './services/standingsService';

export const App: React.FC = () => {
  // Available seasons in reverse chronological order
  const allSeasons = useMemo(
    () => [...SQUAD_SEASONS_DATA].reverse().map((s) => s.season),
    []
  );

  // Filter States - Default to current live season (2026-27) matching Premier League reference
  const defaultSeason = allSeasons[0] ?? '2026-27';
  const [selectedSeason, setSelectedSeason] = useState<string>(defaultSeason);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<PositionCode | 'All positions'>('All positions');
  const [selectedClub, setSelectedClub] = useState<string>('All clubs');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
  const [selectedPlayerName, setSelectedPlayerName] = useState<string>('Erling Haaland');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Active Season Data
  const activeSeasonData = useMemo(() => {
    return SQUAD_SEASONS_DATA.find((s) => s.season === selectedSeason) ?? SQUAD_SEASONS_DATA[0];
  }, [selectedSeason]);

  // Enriched Standings with accurate position, W, D, L, GD, and points
  const enrichedStandings = useMemo(() => {
    return getSeasonStandings(selectedSeason, activeSeasonData.standings);
  }, [selectedSeason, activeSeasonData]);

  // Robust club normalizer ensuring 100% deduplication across all aliases
  const normalizeClub = (club: string): string => {
    if (!club) return '';
    const trimmed = club.trim();
    switch (trimmed) {
      case 'Ipswich Town':
        return 'Ipswich';
      case 'Coventry City':
        return 'Coventry';
      case 'Man United':
      case 'Manchester United':
        return 'Man Utd';
      case 'Manchester City':
        return 'Man City';
      case 'Tottenham':
      case 'Tottenham Hotspur':
        return 'Spurs';
      case 'Nottingham Forest':
      case 'Nott':
        return "Nott'm Forest";
      case 'Wolverhampton':
      case 'Wolverhampton Wanderers':
        return 'Wolves';
      case 'Sheffield United':
        return 'Sheffield Utd';
      case 'West Bromwich Albion':
        return 'West Brom';
      default:
        return trimmed;
    }
  };

  // Standings lookup map supporting both exact name & normalized alias
  const standingsMap = useMemo(() => {
    const map = new Map<string, typeof enrichedStandings[0]>();
    for (const s of enrichedStandings) {
      map.set(s.team, s);
      map.set(normalizeClub(s.team), s);
    }
    return map;
  }, [enrichedStandings]);

  const allClubs = useMemo(() => {
    const fromStandings = enrichedStandings.map((s) => normalizeClub(s.team));
    const fromPlayers = activeSeasonData.players.map((p) => normalizeClub(p.team));
    return [...new Set([...fromStandings, ...fromPlayers])].filter(Boolean).sort();
  }, [activeSeasonData, enrichedStandings]);

  // Season players ranked by points descending (top performers first, not 0-minute reserves)
  const seasonRankedPlayers = useMemo(() => {
    return [...activeSeasonData.players].sort(
      (a, b) => b.points - a.points || b.goals - a.goals || b.minutes - a.minutes
    );
  }, [activeSeasonData]);

  // Filtered & sorted players list
  const filteredPlayers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return seasonRankedPlayers
      .filter((p) => {
        if (!q) return true;
        const text = `${p.name} ${p.shortName} ${normalizeClub(p.team)} ${p.team}`.toLowerCase();
        return text.includes(q);
      })
      .filter((p) => {
        if (selectedPosition === 'All positions') return true;
        return p.position === selectedPosition;
      })
      .filter((p) => {
        if (selectedClub === 'All clubs') return true;
        return normalizeClub(p.team) === selectedClub;
      });
  }, [seasonRankedPlayers, searchQuery, selectedPosition, selectedClub]);

  // Selected Player with cross-season persistence:
  // When changing seasons, keeps the same player and displays their stats for that season!
  const selectedPlayer: Player = useMemo(() => {
    // 1. By ID within current season
    if (selectedPlayerId) {
      const foundById = activeSeasonData.players.find((p) => p.id === selectedPlayerId);
      if (foundById) return foundById;
    }

    // 2. By Player Name across seasons (when user switches/scrolls seasons!)
    if (selectedPlayerName) {
      const cleanTarget = selectedPlayerName.toLowerCase().trim();
      const foundByName = activeSeasonData.players.find((p) => {
        const pName = p.name.toLowerCase();
        return pName === cleanTarget || p.shortName.toLowerCase() === cleanTarget || pName.includes(cleanTarget);
      });
      if (foundByName) return foundByName;
    }

    // 3. Fallback to top filtered player
    if (filteredPlayers.length > 0) {
      return filteredPlayers[0];
    }

    // 4. Fallback to top points scorer of the season
    return seasonRankedPlayers[0] ?? activeSeasonData.players[0];
  }, [activeSeasonData, selectedPlayerId, selectedPlayerName, filteredPlayers, seasonRankedPlayers]);

  const selectedStanding = selectedPlayer
    ? (standingsMap.get(normalizeClub(selectedPlayer.team)) || standingsMap.get(selectedPlayer.team))
    : undefined;

  // Handle Season Change: preserve selectedPlayerName so their stats appear in the selected season!
  const handleSeasonChange = (newSeason: string) => {
    setSelectedSeason(newSeason);
    setSelectedPlayerId(''); // Clears season-specific ID so name lookup resolves player in new season
    setSelectedClub('All clubs');
    setSearchQuery('');
    setShowAll(false);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', backgroundColor: '#080c14' }}>
      {/* High-Performance Atmospheric Athletic Canvas Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 90% 50% at 50% -10%, rgba(56, 189, 248, 0.08), transparent 70%),
            radial-gradient(ellipse 60% 40% at 95% 100%, rgba(16, 185, 129, 0.04), transparent 70%),
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Foreground Scrollable Application Workspace */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Sticky Professional Header */}
        <Header onOpenGuide={() => setShowGuide(true)} />

        {/* Clean Scouting Desk Masthead */}
        <ScoutingDeskHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSeason={selectedSeason}
          onSeasonChange={handleSeasonChange}
          allSeasons={allSeasons}
          selectedPosition={selectedPosition}
          onPositionChange={setSelectedPosition}
        />

        {/* Main Content Workspace — Floats seamlessly directly below hero */}
        <main
          style={{
            flex: 1,
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            padding: '16px 24px 48px 24px',
          }}
        >
          {/* Stat Metric Tiles */}
          <StatSummaryCards
            playersCount={activeSeasonData.players.length}
            clubsCount={enrichedStandings.length}
            season={selectedSeason}
          />

          {/* 2-Column Responsive Workspace Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Player Directory Table */}
            <div style={{ minWidth: 0, flex: '1.2' }}>
              <PlayerDirectoryTable
                players={filteredPlayers}
                allClubs={allClubs}
                selectedClub={selectedClub}
                onClubChange={setSelectedClub}
                selectedPlayer={selectedPlayer}
                onSelectPlayer={(p) => {
                  setSelectedPlayerId(p.id);
                  setSelectedPlayerName(p.name);
                }}
                season={selectedSeason}
                standingsMap={standingsMap}
                showAll={showAll}
                onToggleShowAll={() => setShowAll((prev) => !prev)}
              />
            </div>

            {/* Right Column: Player Profile & Club Context Sidebar */}
            <aside
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                minWidth: 0,
                flex: '0.8',
              }}
            >
              {selectedPlayer && (
                <SelectedPlayerCard
                  player={selectedPlayer}
                  season={selectedSeason}
                  standing={selectedStanding}
                />
              )}

              {selectedStanding && (
                <ClubContextCard
                  standing={selectedStanding}
                  standings={enrichedStandings}
                />
              )}
            </aside>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Guide Modal */}
        {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
      </div>
    </div>
  );
};

export default App;
