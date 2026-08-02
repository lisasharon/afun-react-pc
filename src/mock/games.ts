import type { Banner, Game, GameCategory } from '@/types/game'

export type { Banner, Game, GameCategory }

export const banners: Banner[] = [
  {
    id: '1',
    title: 'RULE THE SKIES',
    subtitle: 'JetX — 飞得越高，赢得越多',
    cta: '立即游戏',
    gradient: 'linear-gradient(135deg, #1a3a5c 0%, #0d2137 40%, #c45c26 100%)',
    tag: 'JetX',
  },
  {
    id: '2',
    title: 'GHS 12,000',
    subtitle: 'EGT Reel Rumble Tournament',
    cta: '立即参赛',
    gradient: 'linear-gradient(135deg, #2a1a4a 0%, #1a0f30 50%, #5c3d1a 100%)',
    tag: 'Tournament',
  },
  {
    id: '3',
    title: 'MEGA MILLION',
    subtitle: 'Weekly Jackpot — 每周巨奖等你来抽',
    cta: '立即抽取',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #0d1f18 40%, #1a4a2a 100%)',
    tag: 'Jackpot',
  },
]

export const categories: GameCategory[] = [
  { id: 'lobby', label: '大厅', icon: 'lobby' },
  { id: 'providers', label: '游戏提供商', icon: 'providers' },
  { id: 'slots', label: '老虎机', icon: 'slots' },
  { id: 'fishing', label: '捕鱼', icon: 'fishing' },
  { id: 'cards', label: '棋牌', icon: 'cards' },
  { id: 'lottery', label: '彩票游戏', icon: 'lottery' },
]

export const games: Game[] = [
  {
    id: '1',
    name: '麻将胡了',
    provider: 'PG',
    players: 83,
    cover: 'mahjong',
    accent: '#e8a838',
  },
  {
    id: '2',
    name: '麻将胡了2',
    provider: 'PG',
    players: 57,
    cover: 'mahjong2',
    accent: '#d4a017',
  },
  {
    id: '3',
    name: '财神到',
    provider: 'PG',
    players: 42,
    cover: 'caishen',
    accent: '#c41e3a',
  },
  {
    id: '4',
    name: '寻龙探宝',
    provider: 'PG',
    players: 36,
    cover: 'dragon',
    accent: '#1a6b4a',
  },
  {
    id: '5',
    name: '赏金女王',
    provider: 'PG',
    players: 29,
    cover: 'queen',
    accent: '#8b1a3a',
  },
  {
    id: '6',
    name: '埃及秘宝',
    provider: 'PG',
    players: 48,
    cover: 'egypt',
    accent: '#c9a227',
  },
  {
    id: '7',
    name: '夜戏貂蝉',
    provider: 'PG',
    players: 31,
    cover: 'diaochan',
    accent: '#6b2d8b',
  },
  {
    id: '8',
    name: '水果派对',
    provider: 'PG',
    players: 64,
    cover: 'fruit',
    accent: '#2d8b4a',
  },
  {
    id: '9',
    name: '金玉满堂',
    provider: 'PG',
    players: 22,
    cover: 'gold',
    accent: '#b8860b',
  },
  {
    id: '10',
    name: '极速赛车',
    provider: 'PG',
    players: 19,
    cover: 'race',
    accent: '#1a4a8b',
  },
]
