import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import { formatDateTime } from '@/utils/format'
import type { AppLang } from '@/i18n'
import './index.css'

type SidebarProps = {
  expanded: boolean
  onToggle: () => void
  onClose: () => void
}

const quickLinkKeys = [
  { icon: 'game', labelKey: 'sidebar.games' },
  { icon: 'star', labelKey: 'sidebar.favorites' },
  { icon: 'clock', labelKey: 'sidebar.recent' },
] as const

const navItems = [
  { icon: 'gift', labelKey: 'sidebar.promotions', href: '#promo' },
  { icon: 'task', labelKey: 'sidebar.tasks', href: '#tasks' },
  { icon: 'vip', labelKey: 'sidebar.vip', href: '#vip' },
  { icon: 'blog', labelKey: 'sidebar.blog', href: '#blog' },
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
  const [now, setNow] = useState(() => new Date())
  const [mode, setMode] = useState<'casino' | 'sports'>('casino')
  const [activeCollapsed, setActiveCollapsed] = useState('lobby')
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

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

  return (
    <>
      <div
        className={`sidebar-backdrop ${expanded ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!expanded}
      />
      <aside
        className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}
        aria-label={t('sidebar.nav')}
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

          {expanded ? (
            <div className="sidebar-mode">
              <button
                type="button"
                className={mode === 'casino' ? 'active' : ''}
                onClick={() => setMode('casino')}
              >
                {t('sidebar.casino')}
              </button>
              <button
                type="button"
                className={mode === 'sports' ? 'active' : ''}
                onClick={() => setMode('sports')}
              >
                {t('sidebar.sports')}
              </button>
            </div>
          ) : null}
        </div>

        {expanded ? (
          <>
            <div className="promo-card referral">
              <div className="promo-card-body">
                <p className="promo-title">{t('sidebar.inviteTitle')}</p>
                <p className="promo-desc">{t('sidebar.inviteDesc')}</p>
                <button type="button" className="copy-btn">
                  {t('sidebar.copyLink')}
                </button>
              </div>
              <div className="promo-art money-bag" aria-hidden>
                <span className="bag">$</span>
              </div>
            </div>

            <div className="quick-links">
              {quickLinkKeys.map((item) => (
                <button type="button" className="quick-link" key={item.labelKey}>
                  <span className="quick-icon">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <span>{t(item.labelKey)}</span>
                </button>
              ))}
            </div>

            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <a href={item.href} key={item.labelKey}>
                  <Icon name={item.icon} size={18} />
                  {t(item.labelKey)}
                </a>
              ))}
            </nav>

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

            <div className="sidebar-footer">
              <div className="footer-links">
                <button type="button">
                  <Icon name="help" size={16} />
                  {t('common.help')}
                </button>
                <button type="button">
                  <Icon name="headset" size={16} />
                  {t('common.onlineSupport')}
                </button>
              </div>

              <div className="lang-switcher" ref={langRef}>
                <button
                  type="button"
                  className="lang-btn"
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen((v) => !v)}
                >
                  <Icon name="globe" size={16} />
                  {t('common.language')}: {currentLangLabel}
                  <Icon name="chevron-down" size={14} />
                </button>
                {langOpen ? (
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
                ) : null}
              </div>

              <time className="clock" dateTime={now.toISOString()}>
                {formatDateTime(now)}
              </time>
            </div>
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
