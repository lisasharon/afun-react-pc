import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import { promotionsMock } from '@/mock/promotions'
import type { PromotionCategory } from '@/types/promotion'
import './index.css'

const tabs: { id: PromotionCategory; labelKey: string }[] = [
  { id: 'all', labelKey: 'promotion.all' },
  { id: 'deposit', labelKey: 'promotion.deposit' },
  { id: 'sports', labelKey: 'promotion.sports' },
  { id: 'casino', labelKey: 'promotion.casino' },
]

export function Promotion() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<PromotionCategory>('all')

  const list =
    activeTab === 'all'
      ? promotionsMock
      : promotionsMock.filter((p) => p.category === activeTab)

  return (
    <div className="promotion-page">
      <header className="promotion-header">
        <h1>
          <Icon name="gift" size={22} />
          {t('promotion.title')}
        </h1>
        <p>{t('promotion.subtitle')}</p>
      </header>

      <div className="promotion-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`promotion-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      <div className="promotion-grid">
        {list.map((item) => (
          <article
            key={item.id}
            className="promotion-card"
            style={{ background: item.gradient }}
          >
            {item.badge ? (
              <span className={`promotion-badge ${item.badge}`}>
                {t(`promotion.badge.${item.badge}`)}
              </span>
            ) : null}
            <div className="promotion-card-body">
              <h2>{t(`promotions.${item.id}.title`)}</h2>
              <p>{t(`promotions.${item.id}.desc`)}</p>
              <div className="promotion-meta">
                <span>{t(`promotions.${item.id}.period`)}</span>
              </div>
              <button type="button" className="promotion-cta">
                {t(`promotions.${item.id}.cta`)}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
