export type Game = {
  id: string
  provider?: string
  players: number
  cover: string
  accent: string
}

export type Banner = {
  id: string
  title: string
  gradient: string
  tag?: string
}

export type GameCategory = {
  id: string
  icon: string
}
