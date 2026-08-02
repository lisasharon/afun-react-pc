export type Game = {
  id: string
  name: string
  provider?: string
  players: number
  cover: string
  accent: string
}

export type Banner = {
  id: string
  title: string
  subtitle: string
  cta: string
  gradient: string
  tag?: string
}

export type GameCategory = {
  id: string
  label: string
  icon: string
}
