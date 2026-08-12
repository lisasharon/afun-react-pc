'use client'

import { NavLink } from '@/components/NavLink'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import { AUTH } from '@/mock/auth'
import type { AuthMode } from '@/components/AuthModal'
import './index.css'

const items = [
  { key: 'browse', icon: 'browse', to: '/browse' },
  { key: 'casino', icon: 'cards', to: '/' },
  { key: 'sports', icon: 'sports', to: '/sports' },
  { key: 'promo', icon: 'gift', to: '/promotion' },
  { key: 'mine', icon: 'user', to: '/profile' },
] as const

type BottomNavProps = {
  onOpenAuth: (mode: AuthMode) => void
}

export function BottomNav({ onOpenAuth }: BottomNavProps) {
  const { t } = useTranslation()

  return (
    <nav className="bottom-nav" aria-label={t('nav.bar')}>
      {items.map((item) => {
        if (item.key === 'mine' && !AUTH.isLoggedIn) {
          return (
            <button
              key={item.key}
              type="button"
              className="bottom-nav__item"
              onClick={() => onOpenAuth('login')}
            >
              <Icon name={item.icon} size={22} />
              <span>{t(`nav.${item.key}`)}</span>
            </button>
          )
        }

        return (
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
        )
      })}
    </nav>
  )
}
