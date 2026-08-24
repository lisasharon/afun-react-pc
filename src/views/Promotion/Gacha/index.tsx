'use client'

import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { fetchGachaConfig, requestGachaDraw } from '@/api/gacha'
import type { GachaPrize } from '@/types/gacha'
import './index.css'

const SHAKE_MS = 1100
const REVEAL_MS = 1600

const CAPSULE_LAYOUT = [
  { left: '18%', top: '36%', size: 52, rotate: -16, delay: '0s' },
  { left: '42%', top: '28%', size: 48, rotate: 10, delay: '0.04s' },
  { left: '64%', top: '38%', size: 54, rotate: -6, delay: '0.08s' },
  { left: '8%', top: '52%', size: 44, rotate: 22, delay: '0.02s' },
  { left: '32%', top: '50%', size: 56, rotate: -4, delay: '0.1s' },
  { left: '56%', top: '54%', size: 50, rotate: 14, delay: '0.06s' },
  { left: '76%', top: '50%', size: 42, rotate: -18, delay: '0.12s' },
  { left: '20%', top: '66%', size: 46, rotate: 8, delay: '0.03s' },
  { left: '44%', top: '68%', size: 50, rotate: -12, delay: '0.09s' },
  { left: '66%', top: '66%', size: 44, rotate: 18, delay: '0.05s' },
  { left: '12%', top: '40%', size: 38, rotate: -24, delay: '0.14s' },
  { left: '80%', top: '36%', size: 40, rotate: 6, delay: '0.07s' },
]

type PrizeKind = 'thanks' | 'coins' | 'gift' | 'card'

function prizeKind(id: string): PrizeKind {
  if (id === 'thanks') return 'thanks'
  if (id.startsWith('bonus') || id.startsWith('points')) return 'coins'
  if (id.startsWith('deposit')) return 'gift'
  return 'card'
}

function Capsule({
  color,
  kind,
  className,
  style,
}: {
  color: string
  kind: PrizeKind
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={`gacha__capsule ${className ?? ''}`}
      style={{ '--capsule': color, ...style } as CSSProperties}
    >
      <span className={`gacha__prize gacha__prize--${kind}`} />
      <span className="gacha__capsule-shell" />
      <span className="gacha__capsule-shine" />
    </span>
  )
}

export function GachaMachine() {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const [prizes, setPrizes] = useState<GachaPrize[]>([])
  const [chances, setChances] = useState(0)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [dropped, setDropped] = useState<{ label: string; color: string; kind: PrizeKind } | null>(
    null,
  )
  const [result, setResult] = useState<string | null>(null)

  const lang = i18n.language === 'en' ? 'en' : 'zh-CN'
  const visuals = prizes.length
    ? CAPSULE_LAYOUT.map((slot, index) => ({
        ...slot,
        prize: prizes[index % prizes.length],
      }))
    : []

  const load = useCallback(() => {
    setLoading(true)
    setFailed(false)
    fetchGachaConfig(lang)
      .then((data) => {
        setPrizes(data.prizes)
        setChances(data.chances)
        setDropped(null)
        setResult(null)
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false))
  }, [lang])

  useEffect(() => {
    load()
  }, [load])

  const handleDraw = async () => {
    if (drawing || loading || !prizes.length) return
    if (chances <= 0) {
      message.warning(t('promo.gachaNoChance'))
      return
    }

    setDrawing(true)
    setDropped(null)
    setResult(null)

    try {
      const data = await requestGachaDraw(lang)
      window.setTimeout(() => {
        setDropped({ label: data.label, color: data.color, kind: prizeKind(data.prizeId) })
      }, SHAKE_MS)
      window.setTimeout(() => {
        setChances(data.chances)
        setResult(data.label)
        setDrawing(false)
      }, REVEAL_MS)
    } catch {
      setDrawing(false)
      message.error(t('promo.gachaDrawFailed'))
    }
  }

  return (
    <section className="gacha">
      <div className="gacha__copy">
        <p className="gacha__eyebrow">{t('promo.gachaEyebrow')}</p>
        <h2>{t('promo.gachaTitle')}</h2>
        <p className="gacha__desc">{t('promo.gachaSubtitle')}</p>
        <p className="gacha__chances">{t('promo.gachaChances', { count: chances })}</p>
        <ul className="gacha__pool">
          {prizes.map((prize) => (
            <li key={prize.id}>
              <span className="gacha__dot" style={{ background: prize.color }} />
              {prize.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="gacha__stage">
        {loading ? (
          <div className="gacha__state">{t('promo.gachaLoading')}</div>
        ) : failed ? (
          <div className="gacha__state">
            <p>{t('promo.gachaLoadFailed')}</p>
            <button type="button" className="gacha__retry" onClick={load}>
              {t('promo.gachaRetry')}
            </button>
          </div>
        ) : (
          <div className={`gacha__machine ${drawing ? 'is-drawing' : ''}`}>
            <span className="gacha__ear gacha__ear--left" />
            <span className="gacha__ear gacha__ear--right" />
            <div className="gacha__dome">
              <div className="gacha__balls">
                {visuals.map((item, index) => (
                  <Capsule
                    key={`${item.prize.id}-${index}`}
                    color={item.prize.color}
                    kind={prizeKind(item.prize.id)}
                    style={{
                      left: item.left,
                      top: item.top,
                      width: item.size,
                      height: item.size,
                      rotate: `${item.rotate}deg`,
                      animationDelay: item.delay,
                    }}
                  />
                ))}
              </div>
              <div className="gacha__glare" aria-hidden />
            </div>
            <div className="gacha__collar" />
            <div className="gacha__base">
              <div className="gacha__slot">
                {dropped ? (
                  <Capsule
                    color={dropped.color}
                    kind={dropped.kind}
                    className="gacha__dropped"
                  />
                ) : null}
              </div>
              <button
                type="button"
                className="gacha__lever"
                onClick={() => void handleDraw()}
                disabled={drawing || chances <= 0}
              >
                {drawing ? t('promo.gachaDrawing') : t('promo.gachaDraw')}
              </button>
            </div>
          </div>
        )}
      </div>

      {result ? (
        <div className="gacha__result" role="status">
          <strong>{t('promo.gachaResult')}</strong>
          <span>{result}</span>
        </div>
      ) : null}
    </section>
  )
}
