import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import type { BetSlipItem, BetSlipTab } from '@/types/bet'
import './index.css'

const tabs: { id: BetSlipTab; labelKey: string }[] = [
  { id: 'single', labelKey: 'betSlip.single' },
  { id: 'parlay', labelKey: 'betSlip.parlay' },
  { id: 'settled', labelKey: 'betSlip.settled' },
]

type BetSlipProps = {
  open: boolean
  onClose: () => void
  items: BetSlipItem[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function BetSlip({ open, onClose, items, onRemove, onClear }: BetSlipProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<BetSlipTab>('single')
  const [stake, setStake] = useState('100')

  const stakeNum = Number(stake) || 0
  const totalOdds = items.reduce((acc, item) => acc * item.odds, items.length ? 1 : 0)
  const potentialWin =
    activeTab === 'parlay' && items.length > 1
      ? stakeNum * totalOdds
      : items.reduce((sum, item) => sum + stakeNum * item.odds, 0)

  const showList = activeTab !== 'settled' ? items : []

  return (
    <>
      <div
        className={`betslip-backdrop ${open ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`betslip ${open ? 'open' : ''}`}
        aria-hidden={!open}
        aria-label={t('betSlip.title')}
      >
        <div className="betslip-header">
          <h2>
            <Icon name="ticket" size={18} />
            {t('betSlip.title')}
            {items.length > 0 ? (
              <span className="betslip-count">{items.length}</span>
            ) : null}
          </h2>
          <button
            type="button"
            className="betslip-close"
            onClick={onClose}
            aria-label={t('betSlip.close')}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="betslip-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`betslip-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div className="betslip-body">
          {showList.length > 0 ? (
            <ul className="betslip-list">
              {showList.map((item) => (
                <li key={item.id} className="betslip-item">
                  <div className="betslip-item-top">
                    <span className="betslip-league">
                      {t(`bets.${item.id}.league`)}
                    </span>
                    <button
                      type="button"
                      className="betslip-remove"
                      onClick={() => onRemove(item.id)}
                      aria-label={t('betSlip.remove')}
                    >
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                  <p className="betslip-match">{t(`bets.${item.id}.match`)}</p>
                  <div className="betslip-pick">
                    <div>
                      <p className="betslip-market">
                        {t(`bets.${item.id}.market`)}
                      </p>
                      <p className="betslip-selection">
                        {t(`bets.${item.id}.selection`)}
                      </p>
                    </div>
                    <span className="betslip-odds">{item.odds.toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="betslip-empty">
              {activeTab === 'settled'
                ? t('betSlip.emptySettled')
                : t('betSlip.empty')}
            </div>
          )}
        </div>

        {activeTab !== 'settled' && items.length > 0 ? (
          <div className="betslip-footer">
            <label className="betslip-stake">
              <span>{t('betSlip.stake')}</span>
              <input
                type="number"
                min="1"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
              />
            </label>
            <div className="betslip-summary">
              <span>{t('betSlip.potentialWin')}</span>
              <strong>{potentialWin.toFixed(2)}</strong>
            </div>
            <div className="betslip-actions">
              <button type="button" className="betslip-clear" onClick={onClear}>
                {t('betSlip.clear')}
              </button>
              <button type="button" className="betslip-submit">
                {t('betSlip.placeBet')}
              </button>
            </div>
          </div>
        ) : null}
      </aside>
    </>
  )
}
