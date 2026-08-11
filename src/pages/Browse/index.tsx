import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { useIsMobile } from '@/hooks'
import { formatDateTime } from '@/utils/format'
import { copyText } from '@/utils/copy'
import type { AppLang } from '@/i18n'
import './index.css'

const LIVE_COUNT = 109
const RECENT_KEY = 'browse-recent-searches'
const RECENT_MAX = 10

const DEFAULT_RECENT = ['犀牛闪电', '埃及绿宝石']

const quickLinks = [
  { icon: 'game', labelKey: 'sidebar.games' },
  { icon: 'star', labelKey: 'sidebar.favorites' },
  { icon: 'clock', labelKey: 'sidebar.recent' },
] as const

const casinoFeatures = [
  { icon: 'gift', labelKey: 'sidebar.promotions', to: '/promotion' },
  { icon: 'vip', labelKey: 'sidebar.vip', to: '/vip' },
  { icon: 'blog', labelKey: 'sidebar.blog', to: '/blog' },
] as const

const sportsPrimary = [
  { icon: 'live', labelKey: 'sidebar.liveBetting', badge: LIVE_COUNT },
  { icon: 'bets', labelKey: 'sidebar.myBets' },
  { icon: 'rebate', labelKey: 'sidebar.rebate' },
] as const

const sportsFeatures = [
  { icon: 'gift', labelKey: 'sidebar.promotions', to: '/promotion' },
  { icon: 'task', labelKey: 'sidebar.tasks', to: '/tasks' },
  { icon: 'vip', labelKey: 'sidebar.vip', to: '/vip' },
  { icon: 'blog', labelKey: 'sidebar.blog', to: '/blog' },
] as const

const languages: { code: AppLang; labelKey: 'sidebar.langZh' | 'sidebar.langEn' }[] = [
  { code: 'zh-CN', labelKey: 'sidebar.langZh' },
  { code: 'en', labelKey: 'sidebar.langEn' },
]

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    if (!raw) return DEFAULT_RECENT
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return DEFAULT_RECENT
    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return DEFAULT_RECENT
  }
}

function saveRecent(items: string[]) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(items))
}

export function Browse() {
  const { t, i18n } = useTranslation()
  const isMobile = useIsMobile()
  const [mode, setMode] = useState<'casino' | 'sports'>('casino')
  const [query, setQuery] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const [recent, setRecent] = useState<string[]>(loadRecent)
  const [now, setNow] = useState(() => new Date())
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const inviteLink = `${window.location.origin}/invite`

  const copyInviteLink = () => {
    void copyText(inviteLink, t('common.copySuccess'), t('common.copyFailed'))
  }

  const updateRecent = (next: string[]) => {
    setRecent(next)
    saveRecent(next)
  }

  const pushRecent = (keyword: string) => {
    const value = keyword.trim()
    if (!value) return
    updateRecent([value, ...recent.filter((item) => item !== value)].slice(0, RECENT_MAX))
  }

  const removeRecent = (keyword: string) => {
    updateRecent(recent.filter((item) => item !== keyword))
  }

  const clearRecent = () => updateRecent([])

  const exitSearch = () => {
    setSearchActive(false)
    setQuery('')
    inputRef.current?.blur()
  }

  const clearInput = () => {
    if (query) {
      setQuery('')
      inputRef.current?.focus()
      return
    }
    exitSearch()
  }

  const applyRecent = (keyword: string) => {
    setQuery(keyword)
    pushRecent(keyword)
    inputRef.current?.focus()
  }

  const submitSearch = () => {
    const value = query.trim()
    if (!value) return
    pushRecent(value)
  }

  /* 浏览页是侧栏的移动端替代，桌面直接回娱乐城 */
  if (!isMobile) {
    return <Navigate to="/" replace />
  }

  return (
    <section className={`browse-page ${searchActive ? 'is-searching' : ''}`}>
      <div className="browse-search">
        <Icon name="search" size={18} />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchActive(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              submitSearch()
            }
            if (e.key === 'Escape') exitSearch()
          }}
          placeholder={t('home.searchGames')}
          aria-label={t('home.searchGames')}
        />
        {searchActive ? (
          <button
            type="button"
            className="browse-search__clear"
            aria-label={t('common.close')}
            onClick={clearInput}
          >
            <Icon name="close" size={14} />
          </button>
        ) : null}
      </div>

      {searchActive ? (
        <div className="browse-search-panel">
          {recent.length > 0 ? (
            <div className="browse-recent">
              <div className="browse-recent__head">
                <h2>{t('home.recentSearches')}</h2>
                <button type="button" onClick={clearRecent}>
                  {t('home.clearSearches', { count: recent.length })}
                </button>
              </div>
              <ul className="browse-recent__tags">
                {recent.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="browse-recent__tag"
                      onClick={() => applyRecent(item)}
                    >
                      <span>{item}</span>
                    </button>
                    <button
                      type="button"
                      className="browse-recent__remove"
                      aria-label={t('common.close')}
                      onClick={() => removeRecent(item)}
                    >
                      <Icon name="close" size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="browse-search-panel__empty" aria-hidden />
        </div>
      ) : (
        <>
          <div className={`browse-mode browse-mode--${mode}`}>
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

          {mode === 'casino' ? (
            <>
              <div className="browse-promo referral">
                <div className="browse-promo__body">
                  <p className="browse-promo__title">{t('sidebar.inviteTitle')}</p>
                  <p className="browse-promo__desc">{t('sidebar.inviteDesc')}</p>
                  <button
                    type="button"
                    className="browse-promo__btn"
                    onClick={copyInviteLink}
                  >
                    {t('sidebar.copyLink')}
                  </button>
                </div>
                <div className="browse-promo__art money-bag" aria-hidden>
                  <span className="bag">$</span>
                </div>
              </div>

              <div className="browse-quick">
                {quickLinks.map((item) => (
                  <button type="button" className="browse-quick__item" key={item.labelKey}>
                    <span className="browse-quick__icon">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <span>{t(item.labelKey)}</span>
                  </button>
                ))}
              </div>

              <div className="browse-card">
                {casinoFeatures.map((item) => (
                  <NavLink to={item.to} key={item.labelKey} className="browse-link">
                    <Icon name={item.icon} size={18} />
                    <span>{t(item.labelKey)}</span>
                  </NavLink>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="browse-card">
                {sportsPrimary.map((item) => (
                  <button type="button" className="browse-link" key={item.labelKey}>
                    <Icon name={item.icon} size={18} />
                    <span>{t(item.labelKey)}</span>
                    {'badge' in item ? (
                      <span className="browse-badge">{item.badge}</span>
                    ) : null}
                  </button>
                ))}
              </div>

              <div className="browse-card">
                <button type="button" className="browse-link browse-link--chevron">
                  <Icon name="sports" size={18} />
                  <span>{t('sidebar.sportEvents')}</span>
                  <Icon name="chevron-right" size={16} />
                </button>
              </div>

              <div className="browse-card">
                <button type="button" className="browse-link browse-link--chevron">
                  <Icon name="odds" size={18} />
                  <span>{t('sidebar.oddsFormat')}</span>
                  <Icon name="chevron-right" size={16} />
                </button>
              </div>

              <div className="browse-card">
                {sportsFeatures.map((item) => (
                  <NavLink to={item.to} key={item.labelKey} className="browse-link">
                    <Icon name={item.icon} size={18} />
                    <span>{t(item.labelKey)}</span>
                  </NavLink>
                ))}
              </div>
            </>
          )}

          <div className="browse-promo app-download">
            <div className="browse-promo__body">
              <p className="browse-promo__title">{t('sidebar.downloadTitle')}</p>
              <p className="browse-promo__desc">{t('sidebar.downloadDesc')}</p>
            </div>
            <div className="browse-promo__art phones" aria-hidden>
              <span className="phone phone-1" />
              <span className="phone phone-2" />
            </div>
          </div>

          <div className="browse-card browse-card--footer" ref={langRef}>
            <button type="button" className="browse-link">
              <Icon name="help" size={18} />
              <span>{t('common.help')}</span>
            </button>
            <button type="button" className="browse-link">
              <Icon name="headset" size={18} />
              <span>{t('common.onlineSupport')}</span>
            </button>
            <button
              type="button"
              className="browse-link browse-link--chevron"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              <Icon name="globe" size={18} />
              <span>
                {t('common.language')}: {currentLangLabel}
              </span>
              <Icon name="chevron-right" size={16} />
            </button>
            {langOpen ? (
              <div className="browse-lang-menu" role="listbox">
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
            <div className="browse-time">
              <Icon name="clock" size={16} />
              <time dateTime={now.toISOString()}>{formatDateTime(now)}</time>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
