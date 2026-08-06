import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
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

type RecordTab = 'deposit' | 'withdraw' | 'other'
type CurrencyTab = 'fiat' | 'crypto'

const financeMenus = [
  { id: 'deposit' as const, icon: 'wallet' },
  { id: 'withdraw' as const, icon: 'cards' },
  { id: 'transfer' as const, icon: 'transfer' },
] as const

const recordMenus = [
  { id: 'transactions' as const, icon: 'task' },
  { id: 'betHistory' as const, icon: 'ticket' },
] as const

const promoMenus = [
  { id: 'affiliate' as const, icon: 'gift' },
  { id: 'interest' as const, icon: 'star' },
  { id: 'redeem' as const, icon: 'blog' },
  { id: 'rebate' as const, icon: 'clock' },
] as const

const serviceMenus = [
  { id: 'personalInfo' as const, icon: 'user' },
  { id: 'kycInfo' as const, icon: 'user' },
  { id: 'setting' as const, icon: 'user' },
  { id: 'selfExclusion' as const, icon: 'user' },
  { id: 'logOut' as const, icon: 'user' },
] as const

export function PersonalCenter() {
  const { t } = useTranslation()
  const [activeMenu, setActiveMenu] = useState<MenuKey>('transactions')
  const [recordTab, setRecordTab] = useState<RecordTab>('deposit')
  const [currencyTab, setCurrencyTab] = useState<CurrencyTab>('fiat')
  const [copied, setCopied] = useState(false)

  const username = 'annatest001'
  const vipLevel = 'VIP3'

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
                <button type="button" className="profile-date">
                  <Icon name="calendar" size={16} />
                  2026/8/5
                  <Icon name="chevron-down" size={14} />
                </button>
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
