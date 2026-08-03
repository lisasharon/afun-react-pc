import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { categories, games } from '@/mock/games'
import { Icon } from '@/components/Icon'
import './index.css'

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
  slots: 'home.slots',
  fishing: 'home.fishing',
  cards: 'home.cards',
  lottery: 'home.lottery',
}

export function GameSection() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('lobby')
  const [query, setQuery] = useState('')

  const filtered = games.filter((g) =>
    t(`games.${g.id}`).toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <section className="game-section">
      <div className="search-bar">
        <Icon name="search" size={18} />
        <input
          type="search"
          placeholder={t('home.searchGames')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('home.searchGames')}
        />
      </div>

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
            {t('common.all')} {filtered.length}
          </button>
          <button type="button" className="nav-arrow" aria-label={t('common.prev')}>
            <Icon name="chevron-left" size={16} />
          </button>
          <button type="button" className="nav-arrow" aria-label={t('common.next')}>
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>

      <div className="game-grid">
        {filtered.map((game) => (
          <article key={game.id} className="game-card">
            <div
              className="game-cover"
              style={{ background: coverStyles[game.cover] }}
            >
              {game.provider && (
                <span className="provider-badge">{game.provider}</span>
              )}
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
    </section>
  )
}
