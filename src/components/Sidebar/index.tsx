import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { useIsMobile } from '@/hooks'
import { formatDateTime } from '@/utils/format'
import { copyText } from '@/utils/copy'
import type { AppLang } from '@/i18n'
import './index.css'

type SidebarProps = {
  expanded: boolean
  onToggle: () => void
  onClose: () => void
}

type SidebarMode = 'casino' | 'sports'

const LIVE_COUNT = 109

/** 娱乐城专属 */
const casinoQuickLinks = [
  { icon: 'game', labelKey: 'sidebar.games' },
  { icon: 'star', labelKey: 'sidebar.favorites' },
  { icon: 'clock', labelKey: 'sidebar.recent' },
] as const

/** 体育专属 */
const sportsPrimary = [
  { icon: 'live', labelKey: 'sidebar.liveBetting', badge: LIVE_COUNT },
  { icon: 'bets', labelKey: 'sidebar.myBets' },
  { icon: 'rebate', labelKey: 'sidebar.rebate' },
] as const

/** 娱乐城 / 体育共用 */
const sharedFeatures = [
  { icon: 'gift', labelKey: 'sidebar.promotions', to: '/promotion' },
  { icon: 'task', labelKey: 'sidebar.tasks', to: '/tasks' },
  { icon: 'vip', labelKey: 'sidebar.vip', to: '/vip' },
  { icon: 'blog', labelKey: 'sidebar.blog', to: '/blog' },
] as const

const collapsedIcons = [
  { icon: 'lobby', labelKey: 'sidebar.lobby' },
  { icon: 'gift', labelKey: 'sidebar.promoShort' },
  { icon: 'slots', labelKey: 'sidebar.slots' },
  { icon: 'cards', labelKey: 'sidebar.cards' },
  { icon: 'game', labelKey: 'sidebar.games' },
  { icon: 'fishing', labelKey: 'sidebar.fishing' },
  { icon: 'lottery', labelKey: 'sidebar.lottery' },
  { icon: 'star', labelKey: 'sidebar.favoriteShort' },
] as const

const languages: { code: AppLang; labelKey: 'sidebar.langZh' | 'sidebar.langEn' }[] = [
  { code: 'zh-CN', labelKey: 'sidebar.langZh' },
  { code: 'en', labelKey: 'sidebar.langEn' },
]

export function Sidebar({ expanded, onToggle, onClose }: SidebarProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const showFullMenu = expanded || isMobile
  const [now, setNow] = useState(() => new Date())
  const [mode, setMode] = useState<SidebarMode>(
    location.pathname.startsWith('/sports') ? 'sports' : 'casino',
  )
  const [activeCollapsed, setActiveCollapsed] = useState('lobby')
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    setMode(location.pathname.startsWith('/sports') ? 'sports' : 'casino')
  }, [location.pathname])

  const switchMode = (next: SidebarMode) => {
    setMode(next)
    navigate(next === 'sports' ? '/sports' : '/')
  }

  useEffect(() => {
    if (!langOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [langOpen])

  const currentLang = (i18n.language === 'en' ? 'en' : 'zh-CN') as AppLang
  const currentLangLabel = t(
    currentLang === 'en' ? 'sidebar.langEn' : 'sidebar.langZh',
  )

  const switchLang = (code: AppLang) => {
    void i18n.changeLanguage(code)
    setLangOpen(false)
  }

  const closeIfMobile = () => {
    if (isMobile) onClose()
  }

  const inviteLink = `${window.location.origin}/invite`

  const copyInviteLink = () => {
    void copyText(inviteLink, t('common.copySuccess'), t('common.copyFailed'))
  }

  /** —— 模式专属 —— */
  const casinoExclusive = (
    <>
      <div className="promo-card referral">
        <div className="promo-card-body">
          <p className="promo-title">{t('sidebar.inviteTitle')}</p>
          <p className="promo-desc">{t('sidebar.inviteDesc')}</p>
          <button type="button" className="copy-btn" onClick={copyInviteLink}>
            {t('sidebar.copyLink')}
          </button>
        </div>
        <div className="promo-art money-bag" aria-hidden>
          <span className="bag">$</span>
        </div>
      </div>

      <div className="quick-links">
        {casinoQuickLinks.map((item) => (
          <button type="button" className="quick-link" key={item.labelKey}>
            <span className="quick-icon">
              <Icon name={item.icon} size={22} />
            </span>
            <span>{t(item.labelKey)}</span>
          </button>
        ))}
      </div>
    </>
  )

  const sportsExclusive = (
    <>
      <div className="sidebar-menu-card">
        {sportsPrimary.map((item) => (
          <button type="button" className="sidebar-link" key={item.labelKey}>
            <Icon name={item.icon} size={18} />
            <span>{t(item.labelKey)}</span>
            {'badge' in item ? (
              <span className="sidebar-badge">{item.badge}</span>
            ) : null}
          </button>
        ))}
      </div>

      <p className="sidebar-group-label">{t('sidebar.topSports')}</p>
      <div className="sidebar-menu-card">
        <button type="button" className="sidebar-link sidebar-link--chevron">
          <Icon name="football" size={18} />
          <span>{t('sports.types.football')}</span>
          <Icon name="chevron-right" size={16} />
        </button>
        <button type="button" className="sidebar-link sidebar-link--chevron">
          <Icon name="basketball" size={18} />
          <span>{t('sports.types.basketball')}</span>
          <Icon name="chevron-right" size={16} />
        </button>
      </div>

      <div className="sidebar-menu-card">
        <button type="button" className="sidebar-link sidebar-link--chevron">
          <Icon name="sports" size={18} />
          <span>{t('sidebar.sportEvents')}</span>
          <Icon name="chevron-right" size={16} />
        </button>
      </div>

      <div className="sidebar-menu-card">
        <button type="button" className="sidebar-link sidebar-link--chevron">
          <Icon name="odds" size={18} />
          <span>{t('sidebar.oddsFormat')}</span>
          <Icon name="chevron-right" size={16} />
        </button>
      </div>
    </>
  )

  /** —— 共用：促销 / 任务 / VIP / 博客 —— */
  const sharedFeatureNav = (
    <nav className="sidebar-menu-card">
      {sharedFeatures.map((item) => (
        <NavLink
          to={item.to}
          key={item.labelKey}
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
          onClick={closeIfMobile}
        >
          <Icon name={item.icon} size={18} />
          <span>{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )

  /** —— 共用：下载 APP —— */
  const sharedAppDownload = (
    <div className="promo-card app-download">
      <div className="promo-card-body">
        <p className="promo-title">{t('sidebar.downloadTitle')}</p>
        <p className="promo-desc">{t('sidebar.downloadDesc')}</p>
      </div>
      <div className="promo-art phones" aria-hidden>
        <span className="phone phone-1" />
        <span className="phone phone-2" />
      </div>
    </div>
  )

  const langMenu = langOpen ? (
    <div className="lang-menu" role="listbox">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          role="option"
          aria-selected={currentLang === lang.code}
          className={currentLang === lang.code ? 'active' : ''}
          onClick={() => switchLang(lang.code)}
        >
          {t(lang.labelKey)}
        </button>
      ))}
    </div>
  ) : null

  /** —— 共用：帮助 / 客服 / 语言 / 时间 —— */
  const sharedFooter = (
    <div className="sidebar-menu-card sidebar-menu-card--footer" ref={langRef}>
      <button type="button" className="sidebar-link">
        <Icon name="help" size={18} />
        <span>{t('common.help')}</span>
      </button>
      <button type="button" className="sidebar-link">
        <Icon name="headset" size={18} />
        <span>{t('common.onlineSupport')}</span>
      </button>
      <button
        type="button"
        className="sidebar-link sidebar-link--chevron"
        aria-expanded={langOpen}
        onClick={() => setLangOpen((v) => !v)}
      >
        <Icon name="globe" size={18} />
        <span>
          {t('common.language')}: {currentLangLabel}
        </span>
        <Icon name="chevron-right" size={16} />
      </button>
      {langMenu}
      <div className="sidebar-time">
        <Icon name="clock" size={16} />
        <time dateTime={now.toISOString()}>{formatDateTime(now)}</time>
      </div>
    </div>
  )

  return (
    <>
      <div
        className={`sidebar-backdrop ${expanded ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!expanded}
      />
      <aside
        className={`sidebar ${expanded ? 'expanded' : 'collapsed'} mode-${mode}`}
        aria-label={t('sidebar.nav')}
        aria-hidden={isMobile ? !expanded : undefined}
      >
        <div className="sidebar-top">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={
              expanded ? t('common.collapseMenu') : t('common.expandMenu')
            }
          >
            <Icon name="menu" size={22} />
          </button>

          {showFullMenu ? (
            <div className={`sidebar-mode sidebar-mode--${mode}`}>
              <button
                type="button"
                className={mode === 'casino' ? 'active' : ''}
                onClick={() => switchMode('casino')}
              >
                {t('sidebar.casino')}
              </button>
              <button
                type="button"
                className={mode === 'sports' ? 'active' : ''}
                onClick={() => switchMode('sports')}
              >
                {t('sidebar.sports')}
              </button>
            </div>
          ) : null}
        </div>

        {showFullMenu ? (
          <>
            {mode === 'sports' ? sportsExclusive : casinoExclusive}
            {sharedFeatureNav}
            {sharedAppDownload}
            {sharedFooter}
          </>
        ) : (
          <nav className="collapsed-nav">
            {collapsedIcons.map((item) => (
              <button
                key={item.labelKey}
                type="button"
                title={t(item.labelKey)}
                className={`collapsed-item ${activeCollapsed === item.icon ? 'active' : ''}`}
                onClick={() => setActiveCollapsed(item.icon)}
              >
                <Icon name={item.icon} size={22} />
              </button>
            ))}
          </nav>
        )}
      </aside>
    </>
  )
}
