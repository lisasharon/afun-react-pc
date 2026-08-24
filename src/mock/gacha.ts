import type { GachaConfig, GachaDrawResult, GachaPrize } from '@/types/gacha'

const PRIZES: Omit<GachaPrize, 'label'>[] = [
  { id: 'thanks', color: '#8b97a8', weight: 26 },
  { id: 'bonus-5', color: '#3dca4d', weight: 20 },
  { id: 'spins-8', color: '#26A5E4', weight: 16 },
  { id: 'bonus-18', color: '#f5a623', weight: 14 },
  { id: 'points-58', color: '#E4405F', weight: 12 },
  { id: 'deposit-3', color: '#9333ea', weight: 8 },
  { id: 'bonus-88', color: '#f5d76e', weight: 4 },
]

const LABELS: Record<string, { 'zh-CN': string; en: string }> = {
  thanks: { 'zh-CN': '谢谢参与', en: 'Thanks' },
  'bonus-5': { 'zh-CN': '5.88 彩金', en: '5.88 Bonus' },
  'spins-8': { 'zh-CN': '8次旋转', en: '8 Spins' },
  'bonus-18': { 'zh-CN': '18.88 彩金', en: '18.88 Bonus' },
  'points-58': { 'zh-CN': '58 积分', en: '58 Points' },
  'deposit-3': { 'zh-CN': '+3% 存款', en: '+3% Deposit' },
  'bonus-88': { 'zh-CN': '88 彩金', en: '88 Bonus' },
}

let remainingChances = 5

function localize(lang: string): GachaPrize[] {
  const key = lang === 'en' ? 'en' : 'zh-CN'
  return PRIZES.map((prize) => ({
    ...prize,
    label: LABELS[prize.id][key],
  }))
}

export function getGachaConfig(lang: string): GachaConfig {
  return {
    prizes: localize(lang),
    chances: remainingChances,
  }
}

function pickPrize(prizes: GachaPrize[]) {
  const total = prizes.reduce((sum, item) => sum + item.weight, 0)
  let cursor = Math.random() * total
  for (const prize of prizes) {
    cursor -= prize.weight
    if (cursor <= 0) return prize
  }
  return prizes[prizes.length - 1]
}

export function drawGacha(lang: string): GachaDrawResult | null {
  if (remainingChances <= 0) return null
  remainingChances -= 1
  const prize = pickPrize(localize(lang))
  return {
    prizeId: prize.id,
    label: prize.label,
    color: prize.color,
    chances: remainingChances,
  }
}
