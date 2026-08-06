import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import './index.css'

const items = [
  { key: 'browse', icon: 'browse', to: '/browse' },
  { key: 'casino', icon: 'cards', to: '/' },
  { key: 'sports', icon: 'sports', to: '/sports' },
  { key: 'promo', icon: 'gift', to: '/promotion' },
  { key: 'mine', icon: 'user', to: '/profile' },
] as const

export function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav className="bottom-nav" aria-label={t('nav.bar')}>
      {items.map((item) => (
        <NavLink
          key={item.key}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? 'active' : ''}`
          }
        >
          <Icon name={item.icon} size={22} />
          <span>{t(`nav.${item.key}`)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
