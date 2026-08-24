'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { fetchWheelConfig, requestWheelSpin } from '@/api/wheel'
import type { WheelPrize } from '@/types/wheel'
import './index.css'

const TURNS = 6
const DURATION_MS = 4200

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function slicePath(cx: number, cy: number, r: number, start: number, end: number) {
  const from = polar(cx, cy, r, start)
  const to = polar(cx, cy, r, end)
  const large = end - start > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${from.x} ${from.y} A ${r} ${r} 0 ${large} 1 ${to.x} ${to.y} Z`
}

export function LuckyWheel() {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const [prizes, setPrizes] = useState<WheelPrize[]>([])
  const [chances, setChances] = useState(0)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<string | null>(null)

  const lang = i18n.language === 'en' ? 'en' : 'zh-CN'
  const slice = prizes.length ? 360 / prizes.length : 0

  const load = useCallback(() => {
    setLoading(true)
    setFailed(false)
    fetchWheelConfig(lang)
      .then((data) => {
        setPrizes(data.prizes)
        setChances(data.chances)
        setRotation(0)
        setResult(null)
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false))
  }, [lang])

  useEffect(() => {
    load()
  }, [load])

  const slices = useMemo(() => {
    return prizes.map((prize, index) => {
      const start = index * slice
      const end = start + slice
      const mid = start + slice / 2
      const labelPos = polar(200, 200, 118, mid)
      return { prize, start, end, mid, labelPos }
    })
  }, [prizes, slice])

  const handleSpin = async () => {
    if (spinning || loading || !prizes.length) return
    if (chances <= 0) {
      message.warning(t('promo.wheelNoChance'))
      return
    }

    setSpinning(true)
    setResult(null)

    try {
      const data = await requestWheelSpin(lang)
      const index = prizes.findIndex((item) => item.id === data.prizeId)
      const target = index >= 0 ? index : 0
      const center = target * slice + slice / 2
      const current = ((rotation % 360) + 360) % 360
      const targetDeg = (360 - center) % 360
      const delta = (targetDeg - current + 360) % 360
      setRotation(rotation + TURNS * 360 + delta)
      window.setTimeout(() => {
        setChances(data.chances)
        setResult(data.label)
        setSpinning(false)
        if (data.extraChance) message.success(t('promo.wheelExtraChance'))
      }, DURATION_MS)
    } catch {
      setSpinning(false)
      message.error(t('promo.wheelSpinFailed'))
    }
  }

  return (
    <section className="lucky-wheel">
      <div className="lucky-wheel__copy">
        <p className="lucky-wheel__eyebrow">{t('promo.wheelEyebrow')}</p>
        <h2>{t('promo.wheelTitle')}</h2>
        <p className="lucky-wheel__desc">{t('promo.wheelSubtitle')}</p>
        <p className="lucky-wheel__chances">
          {t('promo.wheelChances', { count: chances })}
        </p>
      </div>

      <div className="lucky-wheel__stage">
        {loading ? (
          <div className="lucky-wheel__state">{t('promo.wheelLoading')}</div>
        ) : failed ? (
          <div className="lucky-wheel__state">
            <p>{t('promo.wheelLoadFailed')}</p>
            <button type="button" className="lucky-wheel__retry" onClick={load}>
              {t('promo.wheelRetry')}
            </button>
          </div>
        ) : (
          <>
            <div className="lucky-wheel__pointer" aria-hidden />
            <div className="lucky-wheel__rim">
              <div
                className={`lucky-wheel__disc ${spinning ? 'is-spinning' : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <svg viewBox="0 0 400 400" role="img" aria-label={t('promo.wheelTitle')}>
                  {slices.map(({ prize, start, end, mid, labelPos }) => (
                    <g key={prize.id}>
                      <path
                        d={slicePath(200, 200, 196, start, end)}
                        fill={prize.color}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                      />
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        fill={prize.textColor}
                        fontSize="15"
                        fontWeight="700"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${mid}, ${labelPos.x}, ${labelPos.y})`}
                      >
                        {prize.label}
                      </text>
                    </g>
                  ))}
                  <circle cx="200" cy="200" r="196" fill="none" stroke="#f5d76e" strokeWidth="6" />
                </svg>
              </div>
              <button
                type="button"
                className="lucky-wheel__hub"
                onClick={() => void handleSpin()}
                disabled={spinning || chances <= 0}
              >
                {spinning ? t('promo.wheelSpinning') : t('promo.wheelSpin')}
              </button>
            </div>
          </>
        )}
      </div>

      {result ? (
        <div className="lucky-wheel__result" role="status">
          <strong>{t('promo.wheelResult')}</strong>
          <span>{result}</span>
        </div>
      ) : null}
    </section>
  )
}
