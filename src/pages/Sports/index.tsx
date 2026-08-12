import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { Icon } from '@/components/Icon'
import { SearchModal } from '@/components/SearchModal'
import { useIsMobile } from '@/hooks'
import { popularLeagues, sportsProvider, sportTypes } from '@/mock/sports'
import type { OddsCell, SportsTab, SportTypeId } from '@/types/sports'
import {
  loadRecentSearches,
  pushRecentSearch,
  saveRecentSearches,
} from '@/utils/recentSearch'
import './index.css'

const RECENT_KEY = 'sports-recent-searches'
const DEFAULT_RECENT = ['欧洲冠军联赛', '阿马迪']

const tabs: { id: SportsTab; icon: string }[] = [
  { id: 'lobby', icon: 'lobby' },
  { id: 'virtual', icon: 'live' },
  { id: 'myBets', icon: 'bets' },
  { id: 'favorites', icon: 'star' },
]

const marketFilters = [
  { id: 'popular', icon: 'fire', labelKey: 'sports.popularEvents' },
  { id: 'live', icon: 'live', labelKey: 'sports.live' },
  { id: 'early', icon: 'clock', labelKey: 'sports.early' },
  { id: 'parlay', icon: 'bets', labelKey: 'sports.parlay' },
  { id: 'outright', icon: 'trophy', labelKey: 'sports.outright' },
] as const

type MarketFilter = (typeof marketFilters)[number]['id']

function OddsButton({ cell, prefix }: { cell: OddsCell; prefix?: string }) {
  return (
    <button type="button" className={`odds-btn ${cell.hot ? 'is-hot' : ''}`}>
      {cell.line ? (
        <span className="odds-btn__line">
          {prefix}
          {cell.line}
        </span>
      ) : null}
      <em>{cell.odds}</em>
    </button>
  )
}

export function Sports() {
  const { t, i18n } = useTranslation()
  const isMobile = useIsMobile()
  const [tab, setTab] = useState<SportsTab>('lobby')
  const [sport, setSport] = useState<SportTypeId>('football')
  const [market, setMarket] = useState<MarketFilter>('popular')
  const [saved, setSaved] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [recent, setRecent] = useState(() =>
    loadRecentSearches(RECENT_KEY, DEFAULT_RECENT),
  )

  const keyword = query.trim().toLowerCase()
  const popularKeywords = [
    t('sports.leagues.ucl'),
    t('sports.teams.alashkert'),
    t('sports.teams.bodo'),
  ]
  const eventNames = popularLeagues.flatMap((league) => [
    t(league.nameKey),
    ...league.matches.flatMap((match) => [t(match.homeKey), t(match.awayKey)]),
  ])
  const searchHits = keyword
    ? [...new Set(eventNames)].filter((name) =>
        name.toLowerCase().includes(keyword),
      )
    : []

  const updateRecent = (next: string[]) => {
    setRecent(next)
    saveRecentSearches(RECENT_KEY, next)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  const applyKeyword = (value: string) => {
    setQuery(value)
    setRecent(pushRecentSearch(RECENT_KEY, recent, value))
  }

  const toggleSaved = (id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const formatKickoff = (value: string) => {
    const date = dayjs(value).locale(i18n.language === 'en' ? 'en' : 'zh-cn')
    if (i18n.language === 'en') return date.format('MMM D, ddd HH:mm')
    return `${date.format('MM月DD日')} ${date.format('ddd')} ${date.format('HH:mm')}`
  }

  return (
    <section className="sports-page">
      <article className="sports-vip">
        <div className="sports-vip__text">
          <strong>{t('sports.vipTitle')}</strong>
          <span>{t('sports.vipDesc')}</span>
        </div>
        <div className="sports-vip__art" aria-hidden>
          <span className="sports-diamond" />
        </div>
      </article>

      <div className="sports-search" onClick={() => setSearchOpen(true)}>
        <Icon name="search" size={18} />
        <input
          type="search"
          readOnly
          placeholder={t('sports.searchEvents')}
          value={query}
          aria-label={t('sports.searchEvents')}
        />
      </div>

      <SearchModal
        open={searchOpen}
        onClose={closeSearch}
        query={query}
        onQueryChange={setQuery}
        placeholder={t('sports.searchEvents')}
        recent={recent}
        popular={popularKeywords}
        recentTitle={t('sports.recentSearches')}
        popularTitle={t('sports.popularSearches')}
        clearTitle={t('sports.clearSearches', { count: recent.length })}
        emptyText={t('sports.emptySearch')}
        onClearRecent={() => updateRecent([])}
        onRemoveRecent={(item) =>
          updateRecent(recent.filter((entry) => entry !== item))
        }
        onSelectKeyword={applyKeyword}
        onSubmit={() => setRecent(pushRecentSearch(RECENT_KEY, recent, query))}
        results={
          keyword ? (
            searchHits.length > 0 ? (
              <ul className="search-modal__tags">
                {searchHits.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="search-modal__tag"
                      onClick={() => applyKeyword(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null
          ) : undefined
        }
      />

      <button type="button" className="sports-provider">
        <span>
          {t('sports.provider')}: {sportsProvider}
        </span>
        <Icon name="chevron-down" size={16} />
      </button>

      <div className="sports-tabs" role="tablist">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`sports-tab ${tab === item.id ? 'active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            <Icon name={item.icon} size={18} />
            <span>{t(`sports.${item.id}`)}</span>
          </button>
        ))}
      </div>

      {tab !== 'lobby' ? (
        <p className="sports-empty">{t('sports.comingSoon')}</p>
      ) : (
        <>
          <div className="sports-types" role="tablist" aria-label={t('nav.sports')}>
            {sportTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`sports-type ${sport === item.id ? 'active' : ''}`}
                onClick={() => setSport(item.id)}
              >
                <span className="sports-type__icon">
                  <Icon name={item.id} size={22} />
                  <b>{item.count}</b>
                </span>
                <span>{t(`sports.types.${item.id}`)}</span>
              </button>
            ))}
          </div>

          {!isMobile ? (
            <div className="sports-filters" role="tablist">
              {marketFilters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={market === item.id ? 'active' : ''}
                  onClick={() => setMarket(item.id)}
                >
                  <Icon name={item.icon} size={16} />
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
          ) : (
            <button type="button" className="sports-events__title">
              {t('sports.popularEvents')}
              <Icon name="chevron-down" size={16} />
            </button>
          )}

          {sport !== 'football' || market !== 'popular' ? (
            <p className="sports-empty">{t('sports.comingSoon')}</p>
          ) : (
            <div className="sports-events">
              {popularLeagues.map((league) => (
                <section key={league.id} className="sports-league">
                  <header className="sports-league__head">
                    {t(league.nameKey)}
                    <Icon name="chevron-down" size={14} />
                  </header>
                  {league.matches.map((match) => (
                    <article key={match.id} className="match-card">
                      <header className="match-card__head">
                        <time dateTime={match.kickoff}>
                          {formatKickoff(match.kickoff)}
                        </time>
                        <button
                          type="button"
                          className={saved.includes(match.id) ? 'is-on' : ''}
                          aria-label={t('sports.favorites')}
                          onClick={() => toggleSaved(match.id)}
                        >
                          <Icon name="star" size={16} />
                        </button>
                      </header>

                      <div className="match-card__body">
                        <div className="match-teams">
                          <span>{t(match.homeKey)}</span>
                          <span>{t(match.awayKey)}</span>
                        </div>
                        <div className="match-markets">
                          <div className="match-market">
                            <p>{t('sports.handicap')}</p>
                            <OddsButton cell={match.handicap[0]} />
                            <OddsButton cell={match.handicap[1]} />
                          </div>
                          <div className="match-market">
                            <p>{t('sports.totals')}</p>
                            <OddsButton
                              cell={match.totals[0]}
                              prefix={t('sports.over')}
                            />
                            <OddsButton
                              cell={match.totals[1]}
                              prefix={t('sports.under')}
                            />
                          </div>
                          <div className="match-market">
                            <p>{t('sports.moneyline')}</p>
                            <OddsButton cell={match.moneyline[0]} />
                            <OddsButton cell={match.moneyline[1]} />
                          </div>
                        </div>
                      </div>

                      {isMobile ? (
                        <footer className="match-card__tags">
                          <button type="button">{t('sports.handicapTotals')}</button>
                          <button type="button">{t('sports.correctScore')}</button>
                        </footer>
                      ) : null}
                    </article>
                  ))}
                </section>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
