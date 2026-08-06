import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs, { type Dayjs } from 'dayjs'
import { Icon } from '@/components/Icon'
import { AppDatePicker } from '@/components/AppDatePicker'
import { useIsMobile } from '@/hooks'
import './index.css'

type MenuKey =
  | 'deposit'
  | 'withdraw'
  | 'transfer'
  | 'transactions'
  | 'betHistory'
  | 'affiliate'
  | 'interest'
  | 'redeem'
  | 'rebate'
  | 'personalInfo'
  | 'kycInfo'
  | 'setting'
  | 'selfExclusion'
  | 'logOut'
  | 'vipClub'
  | 'kyc'

type RecordTab = 'deposit' | 'withdraw' | 'other'
type CurrencyTab = 'fiat' | 'crypto'

const financeMenus = [
  { id: 'deposit' as const, icon: 'wallet' },
  { id: 'withdraw' as const, icon: 'bank-card' },
  { id: 'transfer' as const, icon: 'transfer' },
] as const

const recordMenus = [
  { id: 'transactions' as const, icon: 'task' },
  { id: 'betHistory' as const, icon: 'ticket' },
] as const

const promoMenus = [
  { id: 'affiliate' as const, icon: 'affiliate' },
  { id: 'interest' as const, icon: 'interest' },
  { id: 'redeem' as const, icon: 'redeem' },
  { id: 'rebate' as const, icon: 'rebate' },
] as const

const serviceMenus = [
  { id: 'personalInfo' as const, icon: 'user' },
  { id: 'kycInfo' as const, icon: 'shield' },
  { id: 'setting' as const, icon: 'settings' },
  { id: 'selfExclusion' as const, icon: 'user' },
  { id: 'logOut' as const, icon: 'user' },
] as const

const mobilePrimary = [
  {
    id: 'transactions' as const,
    icon: 'task',
    titleKey: 'profile.transactions',
    descKey: 'profile.transactionsDesc',
  },
  {
    id: 'betHistory' as const,
    icon: 'ticket',
    titleKey: 'profile.betHistory',
    descKey: 'profile.betHistoryDesc',
  },
  {
    id: 'affiliate' as const,
    icon: 'affiliate',
    titleKey: 'profile.affiliate',
    descKey: 'profile.affiliateDesc',
  },
] as const

const mobileSecondary = [
  { id: 'vipClub' as const, icon: 'vip', titleKey: 'profile.vipClub' },
  { id: 'rebate' as const, icon: 'rebate', titleKey: 'profile.rebate' },
  { id: 'interest' as const, icon: 'interest', titleKey: 'profile.interest' },
  { id: 'redeem' as const, icon: 'redeem', titleKey: 'profile.redeem' },
  { id: 'kyc' as const, icon: 'shield', titleKey: 'profile.kyc' },
  { id: 'setting' as const, icon: 'settings', titleKey: 'profile.setting' },
] as const

export function PersonalCenter() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [activeMenu, setActiveMenu] = useState<MenuKey>('transactions')
  const [recordTab, setRecordTab] = useState<RecordTab>('deposit')
  const [currencyTab, setCurrencyTab] = useState<CurrencyTab>('fiat')
  const [recordDate, setRecordDate] = useState<Dayjs>(() => dayjs('2026-08-05'))
  const [copied, setCopied] = useState(false)

  const username = 'anna22'
  const vipLevel = 'VIP1'
  const balance = '2853.00'

  const copyAccount = async () => {
    await navigator.clipboard.writeText(username)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const getEmptyText = () => {
    if (activeMenu === 'betHistory') return t('profile.emptyBetHistory')
    if (activeMenu !== 'transactions') return t('profile.placeholder')
    if (recordTab === 'withdraw') return t('profile.emptyWithdraw')
    if (recordTab === 'other') return t('profile.emptyOther')
    return currencyTab === 'fiat'
      ? t('profile.emptyFiatDeposit')
      : t('profile.emptyCryptoDeposit')
  }

  const showRecordPanel =
    activeMenu === 'transactions' ||
    activeMenu === 'deposit' ||
    activeMenu === 'withdraw'

  if (isMobile) {
    return (
      <div className="profile-mobile">
        <header className="profile-mobile__nav">
          <button
            type="button"
            className="profile-mobile__nav-btn"
            aria-label={t('common.prev')}
            onClick={() => navigate(-1)}
          >
            <Icon name="chevron-left" size={22} />
          </button>
          <h1>{t('profile.title')}</h1>
          <button
            type="button"
            className="profile-mobile__nav-btn"
            aria-label={t('common.onlineSupport')}
          >
            <Icon name="headset" size={22} />
          </button>
        </header>

        <div className="profile-mobile__user">
          <div className="profile-avatar" />
          <div className="profile-mobile__user-meta">
            <div className="profile-account-row">
              <span>
                {t('profile.accountLabel')}: {username}
              </span>
              <button
                type="button"
                className="profile-copy"
                onClick={() => void copyAccount()}
                aria-label={t('profile.copySuccess')}
              >
                <Icon name="copy" size={14} />
              </button>
            </div>
            {copied ? (
              <span className="profile-copy-tip">{t('profile.copySuccess')}</span>
            ) : null}
            <p>
              {t('profile.levelLabel')}: {vipLevel}
            </p>
          </div>
          <button
            type="button"
            className="profile-mobile__user-more"
            aria-label={t('profile.personalInfo')}
          >
            <Icon name="chevron-right" size={18} />
          </button>
        </div>

        <section className="profile-mobile__wallet">
          <button type="button" className="profile-mobile__balance">
            <span className="profile-mobile__currency">M$</span>
            <strong>{balance}</strong>
            <span className="profile-mobile__refresh" aria-hidden>
              <Icon name="refresh" size={16} />
            </span>
            <Icon name="chevron-right" size={16} />
          </button>
          <div className="profile-mobile__actions">
            {financeMenus.map((item) => (
              <button type="button" key={item.id} className="profile-mobile__action">
                <span className="profile-mobile__action-icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <span>{t(`profile.${item.id}`)}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="profile-mobile__primary">
          {mobilePrimary.map((item) => (
            <button type="button" key={item.id} className="profile-mobile__primary-item">
              <span className="profile-mobile__primary-icon">
                <Icon name={item.icon} size={22} />
              </span>
              <span className="profile-mobile__primary-text">
                <strong>{t(item.titleKey)}</strong>
                <small>{t(item.descKey)}</small>
              </span>
              <Icon name="chevron-right" size={16} />
            </button>
          ))}
        </div>

        <div className="profile-mobile__banner">
          <div className="profile-mobile__banner-text">
            <strong>{t('profile.promoBannerTitle')}</strong>
            <span>{t('profile.promoBannerDesc')}</span>
          </div>
          <div className="profile-mobile__banner-art" aria-hidden>
            <span className="gift-box" />
          </div>
        </div>

        <div className="profile-mobile__secondary">
          {mobileSecondary.map((item) => (
            <button type="button" key={item.id} className="profile-mobile__secondary-item">
              <Icon name={item.icon} size={20} />
              <span>{t(item.titleKey)}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <header className="profile-page-title">
        <Icon name="user" size={20} />
        <h1>{t('profile.title')}</h1>
      </header>

      <div className="profile-body">
        <aside className="profile-aside">
          <div className="profile-user-card">
            <div className="profile-avatar" />
            <div className="profile-user-meta">
              <div className="profile-account-row">
                <span>
                  {t('profile.accountLabel')}: {username}
                </span>
                <button
                  type="button"
                  className="profile-copy"
                  onClick={copyAccount}
                  aria-label={t('profile.copySuccess')}
                >
                  <Icon name="copy" size={14} />
                </button>
              </div>
              {copied ? (
                <span className="profile-copy-tip">{t('profile.copySuccess')}</span>
              ) : null}
              <p>
                {t('profile.levelLabel')}: {vipLevel}
              </p>
            </div>
          </div>

          <nav className="profile-nav">
            <ul className="profile-nav-group">
              {financeMenus.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`profile-nav-item ${activeMenu === item.id ? 'active' : ''}`}
                    onClick={() => setActiveMenu(item.id)}
                  >
                    <Icon name={item.icon} size={18} />
                    {t(`profile.${item.id}`)}
                  </button>
                </li>
              ))}
            </ul>

            <ul className="profile-nav-group">
              {recordMenus.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`profile-nav-item ${activeMenu === item.id ? 'active' : ''}`}
                    onClick={() => setActiveMenu(item.id)}
                  >
                    <Icon name={item.icon} size={18} />
                    {t(`profile.${item.id}`)}
                  </button>
                </li>
              ))}
            </ul>

            <p className="profile-nav-label">{t('profile.promoCenter')}</p>
            <ul className="profile-nav-group">
              {promoMenus.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`profile-nav-item ${activeMenu === item.id ? 'active' : ''}`}
                    onClick={() => setActiveMenu(item.id)}
                  >
                    <Icon name={item.icon} size={18} />
                    {t(`profile.${item.id}`)}
                  </button>
                </li>
              ))}
            </ul>

            <p className="profile-nav-label">{t('profile.serviceCenter')}</p>
            <ul className="profile-nav-group">
              {serviceMenus.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`profile-nav-item ${activeMenu === item.id ? 'active' : ''}`}
                    onClick={() => setActiveMenu(item.id)}
                  >
                    <Icon name={item.icon} size={18} />
                    {t(`profile.${item.id}`)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="profile-main">
          {showRecordPanel || activeMenu === 'betHistory' ? (
            <section className="profile-panel">
              <div className="profile-panel-header">
                <div className="profile-main-tabs" role="tablist">
                  {(['deposit', 'withdraw', 'other'] as RecordTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={recordTab === tab}
                      className={`profile-main-tab ${recordTab === tab ? 'active' : ''}`}
                      onClick={() => setRecordTab(tab)}
                    >
                      {t(`profile.${tab}`)}
                    </button>
                  ))}
                </div>
                <AppDatePicker
                  className="profile-date-picker"
                  value={recordDate}
                  onChange={(date) => date && setRecordDate(date)}
                  placeholder={t('common.selectDate')}
                  aria-label={t('common.selectDate')}
                />
              </div>

              <div className="profile-panel-inner">
                {activeMenu !== 'betHistory' && recordTab === 'deposit' ? (
                  <div className="profile-inner-toolbar">
                    <div className="profile-sub-tabs" role="tablist">
                      {(['fiat', 'crypto'] as CurrencyTab[]).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          role="tab"
                          aria-selected={currencyTab === tab}
                          className={`profile-sub-tab ${currencyTab === tab ? 'active' : ''}`}
                          onClick={() => setCurrencyTab(tab)}
                        >
                          {t(`profile.${tab}`)}
                        </button>
                      ))}
                    </div>
                    <button type="button" className="profile-filter">
                      {t('common.all')}
                      <Icon name="chevron-down" size={14} />
                    </button>
                  </div>
                ) : activeMenu !== 'betHistory' ? (
                  <div className="profile-inner-toolbar profile-inner-toolbar--end">
                    <button type="button" className="profile-filter">
                      {t('common.all')}
                      <Icon name="chevron-down" size={14} />
                    </button>
                  </div>
                ) : null}

                <div className="profile-empty">
                  <div className="profile-empty-icon">
                    <Icon name="chart" size={48} />
                  </div>
                  <p>{getEmptyText()}</p>
                </div>
              </div>
            </section>
          ) : (
            <section className="profile-panel profile-panel--placeholder">
              <div className="profile-empty">
                <div className="profile-empty-icon">
                  <Icon name="chart" size={48} />
                </div>
                <p>{t('profile.placeholder')}</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
