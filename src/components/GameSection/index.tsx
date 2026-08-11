import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { categories, games } from '@/mock/games'
import { Icon } from '@/components/Icon'
import { useIsMobile } from '@/hooks'
import './index.css'

const RECENT_KEY = 'casino-recent-searches'
const RECENT_MAX = 10
const DEFAULT_RECENT = ['麻将胡了', '埃及秘宝']

const coverStyles: Record<string, string> = {
  mahjong:
    'radial-gradient(circle at 30% 30%, #ffe08a, transparent 50%), linear-gradient(160deg, #8b1a1a, #2a0a0a 60%, #1a3a1a)',
  mahjong2:
    'radial-gradient(circle at 70% 20%, #ffd700, transparent 45%), linear-gradient(160deg, #6b1010, #1a0505 55%, #0a2a1a)',
  caishen:
    'radial-gradient(circle at 50% 20%, #ffeb3b, transparent 40%), linear-gradient(180deg, #c41e3a, #5a0a14)',
  dragon:
    'radial-gradient(circle at 40% 40%, #4ade80, transparent 50%), linear-gradient(160deg, #0a3a2a, #051a10)',
  queen:
    'radial-gradient(circle at 60% 30%, #f472b6, transparent 45%), linear-gradient(160deg, #4a0a2a, #1a0510)',
  egypt:
    'radial-gradient(circle at 50% 25%, #fbbf24, transparent 40%), linear-gradient(160deg, #3a2a0a, #1a1205)',
  diaochan:
    'radial-gradient(circle at 40% 30%, #c084fc, transparent 45%), linear-gradient(160deg, #3a1a5a, #1a0a2a)',
  fruit:
    'radial-gradient(circle at 30% 40%, #4ade80, transparent 40%), radial-gradient(circle at 70% 60%, #f87171, transparent 35%), linear-gradient(160deg, #1a3a1a, #0a1a0a)',
  gold:
    'radial-gradient(circle at 50% 30%, #fde68a, transparent 45%), linear-gradient(160deg, #5a4010, #2a1a05)',
  race:
    'radial-gradient(circle at 70% 40%, #60a5fa, transparent 45%), linear-gradient(160deg, #0a1a3a, #050a1a)',
}

const categoryLabelKeys: Record<string, string> = {
  lobby: 'home.lobby',
  providers: 'home.providers',
  minigames: 'home.minigames',
  slots: 'home.slots',
  fishing: 'home.fishing',
  cards: 'home.cards',
  lottery: 'home.lottery',
}

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

export function GameSection() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [activeCategory, setActiveCategory] = useState('lobby')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [recent, setRecent] = useState<string[]>(loadRecent)
  const inputRef = useRef<HTMLInputElement>(null)

  const keyword = query.trim().toLowerCase()
  const popular = games.map((game) => t(`games.${game.id}`))
  const results = keyword
    ? games.filter((game) => t(`games.${game.id}`).toLowerCase().includes(keyword))
    : []

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  const updateRecent = (next: string[]) => {
    setRecent(next)
    saveRecent(next)
  }

  const pushRecent = (value: string) => {
    const next = value.trim()
    if (!next) return
    updateRecent([next, ...recent.filter((item) => item !== next)].slice(0, RECENT_MAX))
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
    inputRef.current?.blur()
  }

  const clearInput = () => {
    if (query) {
      setQuery('')
      inputRef.current?.focus()
      return
    }
    closeSearch()
  }

  const applyKeyword = (value: string) => {
    setQuery(value)
    pushRecent(value)
    inputRef.current?.focus()
  }

  return (
    <section className={`game-section ${searchOpen ? 'is-searching' : ''}`}>
      <div className="search-bar">
        <Icon name="search" size={18} />
        <input
          ref={inputRef}
          type="search"
          placeholder={t('home.searchGames')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') pushRecent(query)
          }}
          aria-label={t('home.searchGames')}
        />
        {searchOpen ? (
          <button
            type="button"
            className="search-bar__clear"
            aria-label={t('common.close')}
            onClick={clearInput}
          >
            <Icon name="close" size={14} />
          </button>
        ) : null}
      </div>

      {searchOpen ? (
        <div className="game-search-panel">
          {keyword ? (
            results.length > 0 ? (
              <div className="game-search-results">
                {results.map((game) => (
                  <article key={game.id} className="game-card">
                    <div
                      className="game-cover"
                      style={{ background: coverStyles[game.cover] }}
                    >
                      {game.provider ? (
                        <span className="provider-badge">{game.provider}</span>
                      ) : null}
                      <div className="cover-deco" data-cover={game.cover} />
                      <div className="player-count">
                        <Icon name="user" size={12} />
                        {game.players}
                      </div>
                    </div>
                    <h3 className="game-name">{t(`games.${game.id}`)}</h3>
                  </article>
                ))}
              </div>
            ) : (
              <p className="game-search-empty">{t('home.emptySearch')}</p>
            )
          ) : (
            <>
              {recent.length > 0 ? (
                <div className="game-search-block">
                  <div className="game-search-head">
                    <h3>{t('home.recentSearches')}</h3>
                    <button type="button" onClick={() => updateRecent([])}>
                      {t('home.clearSearches', { count: recent.length })}
                    </button>
                  </div>
                  <ul className="game-search-tags">
                    {recent.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          className="game-search-tag"
                          onClick={() => applyKeyword(item)}
                        >
                          {item}
                        </button>
                        <button
                          type="button"
                          className="game-search-tag__remove"
                          aria-label={t('common.close')}
                          onClick={() =>
                            updateRecent(recent.filter((entry) => entry !== item))
                          }
                        >
                          <Icon name="close" size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="game-search-block">
                <div className="game-search-head">
                  <h3>{t('home.popularSearches')}</h3>
                </div>
                <ul className="game-search-tags">
                  {popular.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className="game-search-tag"
                        onClick={() => applyKeyword(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      ) : null}

      <div className="categories" role="tablist" aria-label={t('home.gameCategories')}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`category ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <Icon name={cat.icon} size={22} />
            <span>{t(categoryLabelKeys[cat.id])}</span>
          </button>
        ))}
      </div>

      <div className="hot-header">
        <h2>
          <Icon name="fire" size={20} />
          {t('home.hotGames')}
        </h2>
        <div className="hot-controls">
          <button type="button" className="view-all">
            {t('common.all')} {games.length}
          </button>
          <button type="button" className="nav-arrow" aria-label={t('common.prev')}>
            <Icon name="chevron-left" size={16} />
          </button>
          <button type="button" className="nav-arrow" aria-label={t('common.next')}>
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>

      <div className={`game-grid ${isMobile ? 'game-grid--mobile' : ''}`}>
        {games.map((game, index) => (
          <article
            key={game.id}
            className={`game-card ${isMobile && index < 2 ? 'game-card--large' : ''}`}
          >
            <div
              className="game-cover"
              style={{ background: coverStyles[game.cover] }}
            >
              {game.provider && (
                <span className="provider-badge">{game.provider}</span>
              )}
              <div className="cover-deco" data-cover={game.cover} />
              {isMobile ? (
                <div className="game-cover-meta">
                  <h3 className="game-cover-title">{t(`games.${game.id}`)}</h3>
                  <div className="player-count player-count--live">
                    <span className="live-dot" />
                    {t('home.playing', { count: game.players })}
                  </div>
                </div>
              ) : (
                <div className="player-count">
                  <Icon name="user" size={12} />
                  {game.players}
                </div>
              )}
            </div>
            {!isMobile ? (
              <h3 className="game-name">{t(`games.${game.id}`)}</h3>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
