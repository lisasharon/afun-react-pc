import type { SportsLeague, SportTypeId } from '@/types/sports'

export const sportsProvider = 'Meibo'

export const sportTypes: { id: SportTypeId; count: number }[] = [
  { id: 'football', count: 91 },
  { id: 'basketball', count: 8 },
  { id: 'tennis', count: 52 },
  { id: 'baseball', count: 14 },
  { id: 'darts', count: 6 },
  { id: 'handball', count: 4 },
  { id: 'hockey', count: 11 },
]

export const popularLeagues: SportsLeague[] = [
  {
    id: 'ucl',
    nameKey: 'sports.leagues.ucl',
    matches: [
      {
        id: 'm1',
        kickoff: '2026-08-11T23:00:00',
        homeKey: 'sports.teams.alashkert',
        awayKey: 'sports.teams.levski',
        handicap: [
          { line: '0.00', odds: '1.952', hot: true },
          { line: '0.00', odds: '1.90' },
        ],
        totals: [
          { line: '2.5', odds: '1.88' },
          { line: '2.5', odds: '1.95', hot: true },
        ],
        moneyline: [{ odds: '2.15', hot: true }, { odds: '2.80' }],
      },
      {
        id: 'm2',
        kickoff: '2026-08-12T00:00:00',
        homeKey: 'sports.teams.bodo',
        awayKey: 'sports.teams.stgilloise',
        handicap: [
          { line: '-0.25', odds: '1.90' },
          { line: '+0.25', odds: '1.92', hot: true },
        ],
        totals: [
          { line: '2.5', odds: '1.85', hot: true },
          { line: '2.5', odds: '1.98' },
        ],
        moneyline: [{ odds: '1.95' }, { odds: '3.40' }],
      },
    ],
  },
]
