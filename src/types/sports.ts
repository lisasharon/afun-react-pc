export type SportsTab = 'lobby' | 'virtual' | 'myBets' | 'favorites'

export type SportTypeId =
  | 'football'
  | 'basketball'
  | 'tennis'
  | 'baseball'
  | 'darts'
  | 'handball'
  | 'hockey'

export type OddsCell = {
  line?: string
  odds: string
  hot?: boolean
}

export type SportsMatch = {
  id: string
  kickoff: string
  homeKey: string
  awayKey: string
  handicap: [OddsCell, OddsCell]
  totals: [OddsCell, OddsCell]
  moneyline: [OddsCell, OddsCell]
}

export type SportsLeague = {
  id: string
  nameKey: string
  matches: SportsMatch[]
}
