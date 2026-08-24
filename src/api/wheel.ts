import type { WheelConfig, WheelSpinResult } from '@/types/wheel'

async function readJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Wheel API ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchWheelConfig(lang: string) {
  return fetch(`/api/wheel?lang=${encodeURIComponent(lang)}`, {
    cache: 'no-store',
  }).then((res) => readJson<WheelConfig>(res))
}

export function requestWheelSpin(lang: string) {
  return fetch('/api/wheel/spin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang }),
  }).then((res) => readJson<WheelSpinResult>(res))
}
