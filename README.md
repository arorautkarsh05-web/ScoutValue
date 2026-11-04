# ScoutValue — Premier League Scouting & Valuation Platform

A high-performance Premier League squad scouting and performance index. ScoutValue tracks player output, calculates continuous performance-weighted market valuations, and cross-references live standings and top leaderboards referenced against ESPN match records across eight seasons (2019–20 through 2026–27).

---

## Key Features

- **Dynamic Player Portrait Resolution**
  - Verified portrait directory covering 160+ Premier League players.
  - Real-time fallback resolution via the Wikipedia Commons PageImages API for historical and newly promoted squad members.
  - Responsive club-tinted vector SVG monogram cards as a reliable fallback for unphotographed reserves.
  - Multi-tier in-memory and `localStorage` client caching for instantaneous subsequent loads.

- **ESPN Reference Integration (2026–27 Live Season)**
  - Standings synchronized with official [ESPN Premier League Standings](https://www.espn.in/football/table/_/league/eng.1) (matches played, wins, draws, losses, goal differences, points).
  - Outfield scorers and assist leaderboards aligned with [ESPN Player Stats](https://www.espn.in/football/stats/_/league/eng.1).
  - Matchday normalization adapting estimated match appearances to the current matchday count (Matchday 9).

- **Performance-Weighted Valuation Model**
  - **Goal Contributions**: Weighted goal and assist figures tailored by tactical output.
  - **Availability & Durability**: Minutes played scaled against 2,800–3,400 minute starting thresholds.
  - **Positional Demand**: Multipliers reflecting transfer market premiums across Forwards, Midfielders, Defenders, and Goalkeepers.
  - **League Context Multiplier**: Adjusts individual player valuations based on club table position (Champions League tier down to relegation scrap).

- **Longitudinal Historical Database**
  - Full squad registers and final table standings for 8 consecutive seasons:
    - `2019–20`, `2020–21`, `2021–22`, `2022–23`, `2023–24`, `2024–25`, `2025–26`, and `2026–27`.
  - Cross-season player tracking: selecting a player persists across season switches to analyze historical progression.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Typography** | Space Grotesk & DM Sans |
| **Image Resolution** | Wikipedia MediaWiki Action API & Commons |
| **Data Sources** | Premier League Historical Records & ESPN Live Tables |

---

## Project Structure

```
full-squad-stats-updated/
├── public/                 # Static broadcast media and assets
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Sticky brand navigation & workspace indicator
│   │   ├── ScoutingDeskHero.tsx    # Hero section with season, position, and search controls
│   │   ├── StatSummaryCards.tsx    # Active season totals (players, clubs, season status)
│   │   ├── PlayerDirectoryTable.tsx# Sortable player table with dynamic avatars & club filtering
│   │   ├── SelectedPlayerCard.tsx  # In-depth profile card with verified portrait & valuation
│   │   ├── ClubContextCard.tsx     # League standing snapshot around the selected player's team
│   │   ├── GuideModal.tsx          # Valuation formula breakdown & metric explanations
│   │   └── Footer.tsx              # Footnotes, methodology disclaimers, and data reference
│   ├── data/
│   │   └── squadStatsData.ts       # Multi-season player rosters and performance data
│   ├── services/
│   │   ├── playerPhotoService.ts   # Portrait verification, Wikipedia resolver & SVG generator
│   │   ├── standingsService.ts     # Verified official league tables (2019–20 to 2026–27)
│   │   └── valuation.ts            # Performance valuation algorithm & formatting helpers
│   ├── types/
│   │   └── scout.ts                # TypeScript interfaces (Player, Standing, SeasonData)
│   ├── App.tsx                     # Main application layout and state orchestration
│   ├── index.css                   # Global theme tokens, typography, and scroll styles
│   └── main.tsx                    # React application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `pnpm`

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd full-squad-stats-updated
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   Outputs minified assets to the `dist/` directory.

---

## Valuation Methodology

The estimated transfer value is calculated using four deterministic metrics:

$$\text{Valuation} = \Big(\text{Baseline} \times 0.45 + \text{Output} \times \text{Durability}\Big) \times \text{Position Multiplier} \times \text{Club Finish Multiplier}$$

- **Output Score**: Combines goals, assists, total points, and points per game.
- **Durability Factor**: Derived from minutes played relative to starter availability.
- **Position Multipliers**: FWD (1.20×), MID (1.12×), DEF (0.95×), GK (0.85×).
- **Club Position Adjustments**: Tiered multiplier from 1st place (1.28×) to relegation (0.88×).

*Note: Valuations represent analytical estimates based on match statistics and do not constitute official contractual or buy-out figures.*

---

## License

MIT License. Designed for football research and performance analysis.

