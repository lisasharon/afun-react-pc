import type { GachaConfig, GachaDrawResult } from '@/types/gacha'

async function readJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Gacha API ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchGachaConfig(lang: string) {
  return fetch(`/api/gacha?lang=${encodeURIComponent(lang)}`, {
    cache: 'no-store',
  }).then((res) => readJson<GachaConfig>(res))
}

export function requestGachaDraw(lang: string) {
  return fetch('/api/gacha/draw', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang }),
  }).then((res) => readJson<GachaDrawResult>(res))
}
