import type { WheelConfig, WheelPrize, WheelSpinResult } from '@/types/wheel'

const PRIZES: Omit<WheelPrize, 'label'>[] = [
  { id: 'thanks', color: '#1a2a22', textColor: '#c8d4cc', weight: 28 },
  { id: 'bonus-8', color: '#1f4a28', textColor: '#f4fff4', weight: 18 },
  { id: 'spins-18', color: '#16351c', textColor: '#d8f0d8', weight: 14 },
  { id: 'bonus-28', color: '#2a6b34', textColor: '#f4fff4', weight: 12 },
  { id: 'deposit-5', color: '#1a2a22', textColor: '#c8d4cc', weight: 12 },
  { id: 'points-88', color: '#1f4a28', textColor: '#f4fff4', weight: 10 },
  { id: 'again', color: '#16351c', textColor: '#d8f0d8', weight: 5 },
  { id: 'bonus-188', color: '#3dca4d', textColor: '#0a120c', weight: 1 },
]

const LABELS: Record<string, { 'zh-CN': string; en: string }> = {
  thanks: { 'zh-CN': '谢谢参与', en: 'Thanks' },
  'bonus-8': { 'zh-CN': '8.88 彩金', en: '8.88 Bonus' },
  'spins-18': { 'zh-CN': '18次旋转', en: '18 Spins' },
  'bonus-28': { 'zh-CN': '28.88 彩金', en: '28.88 Bonus' },
  'deposit-5': { 'zh-CN': '+5% 存款', en: '+5% Deposit' },
  'points-88': { 'zh-CN': '88 积分', en: '88 Points' },
  again: { 'zh-CN': '再来一次', en: 'Try Again' },
  'bonus-188': { 'zh-CN': '188 彩金', en: '188 Bonus' },
}

let remainingChances = 3

function localize(lang: string): WheelPrize[] {
  const key = lang === 'en' ? 'en' : 'zh-CN'
  return PRIZES.map((prize) => ({
    ...prize,
    label: LABELS[prize.id][key],
  }))
}

export function getWheelConfig(lang: string): WheelConfig {
  return {
    prizes: localize(lang),
    chances: remainingChances,
  }
}

function pickPrize(prizes: WheelPrize[]) {
  const total = prizes.reduce((sum, item) => sum + item.weight, 0)
  let cursor = Math.random() * total
  for (const prize of prizes) {
    cursor -= prize.weight
    if (cursor <= 0) return prize
  }
  return prizes[prizes.length - 1]
}

export function spinWheel(lang: string): WheelSpinResult | null {
  if (remainingChances <= 0) return null
  remainingChances -= 1
  const prizes = localize(lang)
  const prize = pickPrize(prizes)
  const extraChance = prize.id === 'again'
  if (extraChance) remainingChances += 1
  return {
    prizeId: prize.id,
    label: prize.label,
    extraChance,
    chances: remainingChances,
  }
}
