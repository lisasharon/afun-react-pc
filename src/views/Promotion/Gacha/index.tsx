'use client'

import { useCallback, useEffect, useState } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { fetchGachaConfig, requestGachaDraw } from '@/api/gacha'
import type { GachaPrize } from '@/types/gacha'
import './index.css'

const SHAKE_MS = 900
const REVEAL_MS = 1400

export function GachaMachine() {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const [prizes, setPrizes] = useState<GachaPrize[]>([])
  const [chances, setChances] = useState(0)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [dropped, setDropped] = useState<{ label: string; color: string } | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const lang = i18n.language === 'en' ? 'en' : 'zh-CN'

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
        setDropped({ label: data.label, color: data.color })
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
          <>
            <div className={`gacha__machine ${drawing ? 'is-shaking' : ''}`}>
              <div className="gacha__dome">
                {prizes.map((prize, index) => (
                  <span
                    key={prize.id}
                    className="gacha__capsule"
                    style={{
                      background: prize.color,
                      left: `${14 + (index % 4) * 20}%`,
                      top: `${18 + Math.floor(index / 4) * 28}%`,
                      animationDelay: `${index * 0.06}s`,
                    }}
                  />
                ))}
              </div>
              <div className="gacha__body">
                <div className="gacha__slot">
                  {dropped ? (
                    <span
                      className="gacha__dropped"
                      style={{ background: dropped.color }}
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
          </>
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
