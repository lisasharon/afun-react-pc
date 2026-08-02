export type BetSlipItem = {
  id: string
  league: string
  match: string
  market: string
  selection: string
  odds: number
}

export type BetSlipTab = 'single' | 'parlay' | 'settled'
