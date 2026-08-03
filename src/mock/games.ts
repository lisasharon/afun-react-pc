import type { Banner, Game, GameCategory } from '@/types/game'

export type { Banner, Game, GameCategory }

export const banners: Banner[] = [
  {
    id: '1',
    title: 'RULE THE SKIES',
    gradient: 'linear-gradient(135deg, #1a3a5c 0%, #0d2137 40%, #c45c26 100%)',
    tag: 'JetX',
  },
  {
    id: '2',
    title: 'GHS 12,000',
    gradient: 'linear-gradient(135deg, #2a1a4a 0%, #1a0f30 50%, #5c3d1a 100%)',
    tag: 'Tournament',
  },
  {
    id: '3',
    title: 'MEGA MILLION',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #0d1f18 40%, #1a4a2a 100%)',
    tag: 'Jackpot',
  },
]

export const categories: GameCategory[] = [
  { id: 'lobby', icon: 'lobby' },
  { id: 'providers', icon: 'providers' },
  { id: 'slots', icon: 'slots' },
  { id: 'fishing', icon: 'fishing' },
  { id: 'cards', icon: 'cards' },
  { id: 'lottery', icon: 'lottery' },
]

export const games: Game[] = [
  { id: '1', provider: 'PG', players: 83, cover: 'mahjong', accent: '#e8a838' },
  { id: '2', provider: 'PG', players: 57, cover: 'mahjong2', accent: '#d4a017' },
  { id: '3', provider: 'PG', players: 42, cover: 'caishen', accent: '#c41e3a' },
  { id: '4', provider: 'PG', players: 36, cover: 'dragon', accent: '#1a6b4a' },
  { id: '5', provider: 'PG', players: 29, cover: 'queen', accent: '#8b1a3a' },
  { id: '6', provider: 'PG', players: 48, cover: 'egypt', accent: '#c9a227' },
  { id: '7', provider: 'PG', players: 31, cover: 'diaochan', accent: '#6b2d8b' },
  { id: '8', provider: 'PG', players: 64, cover: 'fruit', accent: '#2d8b4a' },
  { id: '9', provider: 'PG', players: 22, cover: 'gold', accent: '#b8860b' },
  { id: '10', provider: 'PG', players: 19, cover: 'race', accent: '#1a4a8b' },
]
