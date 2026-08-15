'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { AuthMode } from '@/components/AuthModal'
import type { WalletTab } from '@/components/WalletModal'
import { Icon } from '@/components/Icon'
import { AUTH } from '@/mock/auth'
import { profilePaths } from '@/views/PersonalCenter/menu'
import type { MessageType } from '@/types/message'
import './index.css'

type HeaderProps = {
  onOpenMessages: (tab?: MessageType) => void
  onOpenBetSlip: () => void
  onOpenAuth: (mode: AuthMode) => void
  onOpenWallet: (tab?: WalletTab) => void
  messagesOpen: boolean
  betSlipOpen: boolean
  notifyUnread?: number
  betSlipCount?: number
  isMobile?: boolean
}

function Badge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span className="icon-badge">{count > 99 ? '99+' : count}</span>
  )
}

function GuestActions({ onOpen }: { onOpen: (mode: AuthMode) => void }) {
  const { t } = useTranslation()

  return (
    <div className="header-auth">
      <button type="button" className="login-btn" onClick={() => onOpen('login')}>
        {t('header.login')}
      </button>
      <button
        type="button"
        className="register-btn"
        onClick={() => onOpen('register')}
      >
        {t('header.register')}
      </button>
    </div>
  )
}

export function Header({
  onOpenMessages,
  onOpenBetSlip,
  onOpenAuth,
  onOpenWallet,
  messagesOpen,
  betSlipOpen,
  notifyUnread = 0,
  betSlipCount = 0,
  isMobile,
}: HeaderProps) {
  const { t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const loggedIn = AUTH.isLoggedIn
  const isProfileRoute = pathname.startsWith('/profile')

  const handleDeposit = () => {
    if (isProfileRoute) {
      router.push(profilePaths.deposit)
      return
    }
    onOpenWallet('deposit')
  }

  if (isMobile) {
    return (
      <header className="header header--mobile">
        <a href="/" className="logo" aria-label="betup">
          <span className="logo-bet">bet</span>
          <span className="logo-up">up</span>
        </a>

        {loggedIn ? (
          <div className="header-actions">
            <button type="button" className="balance-btn">
              <span className="balance-currency">{AUTH.currency}</span>
              <span className="balance-amount">{AUTH.balance}</span>
            </button>
            <Link
              href="/profile/deposit"
              className="deposit-plus"
              aria-label={t('header.deposit')}
            >
              <Icon name="plus" size={16} />
            </Link>
            <button
              type="button"
              className={`icon-btn ${messagesOpen ? 'active' : ''}`}
              aria-label={
                notifyUnread > 0
                  ? t('header.messageCenterUnread', { count: notifyUnread })
                  : t('header.messageCenter')
              }
              onClick={() => onOpenMessages('notify')}
            >
              <Icon name="bell" size={20} />
              <Badge count={notifyUnread} />
            </button>
          </div>
        ) : (
          <>
            <GuestActions onOpen={onOpenAuth} />
            <button
              type="button"
              className="deposit-promo"
              aria-label={t('header.firstDeposit')}
            >
              <span className="deposit-promo__icon" aria-hidden>
                <Icon name="gift" size={14} />
              </span>
              <span className="deposit-promo__text">{t('header.firstDeposit')}</span>
            </button>
          </>
        )}
      </header>
    )
  }

  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo" aria-label="betup">
          <span className="logo-bet">bet</span>
          <span className="logo-up">up</span>
        </a>
      </div>

      {loggedIn ? (
        <div className="header-actions">
          <button type="button" className="balance-btn">
            <span className="balance-amount">{AUTH.balance}</span>
            <span className="balance-currency">{AUTH.currency}</span>
            <Icon name="chevron-down" size={14} />
          </button>

          <button type="button" className="deposit-btn" onClick={handleDeposit}>
            {t('header.deposit')}
          </button>

          <div className="header-icons">
            <button
              type="button"
              className="icon-btn icon-btn--search"
              aria-label={t('common.search')}
            >
              <Icon name="search" size={20} />
            </button>
            <Link href="/profile" className="icon-btn" aria-label={t('common.profile')}>
              <Icon name="user" size={20} />
            </Link>
            <button
              type="button"
              className={`icon-btn ${messagesOpen ? 'active' : ''}`}
              aria-label={
                notifyUnread > 0
                  ? t('header.messageCenterUnread', { count: notifyUnread })
                  : t('header.messageCenter')
              }
              onClick={() => onOpenMessages('notify')}
            >
              <Icon name="bell" size={20} />
              <Badge count={notifyUnread} />
            </button>
            <button
              type="button"
              className={`icon-btn ${betSlipOpen ? 'active' : ''}`}
              aria-label={
                betSlipCount > 0
                  ? t('header.betSlipCount', { count: betSlipCount })
                  : t('header.betSlip')
              }
              onClick={onOpenBetSlip}
            >
              <Icon name="ticket" size={20} />
              <Badge count={betSlipCount} />
            </button>
          </div>
        </div>
      ) : (
        <GuestActions onOpen={onOpenAuth} />
      )}
    </header>
  )
}
