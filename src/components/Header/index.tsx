import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import type { MessageType } from '@/types/message'
import './index.css'

type HeaderProps = {
  onOpenMessages: (tab?: MessageType) => void
  onOpenBetSlip: () => void
  messagesOpen: boolean
  betSlipOpen: boolean
  notifyUnread?: number
  betSlipCount?: number
  onMenuClick?: () => void
  showMobileMenu?: boolean
}

function Badge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span className="icon-badge">{count > 99 ? '99+' : count}</span>
  )
}

export function Header({
  onOpenMessages,
  onOpenBetSlip,
  messagesOpen,
  betSlipOpen,
  notifyUnread = 0,
  betSlipCount = 0,
  onMenuClick,
  showMobileMenu,
}: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="header">
      <div className="header-left">
        {showMobileMenu ? (
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={onMenuClick}
            aria-label={t('common.openMenu')}
          >
            <Icon name="menu" size={22} />
          </button>
        ) : null}
        <a href="/" className="logo" aria-label="betup">
          <span className="logo-bet">bet</span>
          <span className="logo-up">up</span>
        </a>
      </div>

      <div className="header-actions">
        <button type="button" className="balance-btn">
          <span className="balance-amount">1382.51</span>
          <span className="balance-currency">¥</span>
          <Icon name="chevron-down" size={14} />
        </button>

        <button type="button" className="deposit-btn">
          {t('header.deposit')}
        </button>

        <div className="header-icons">
          <button type="button" className="icon-btn" aria-label={t('common.search')}>
            <Icon name="search" size={20} />
          </button>
          <button type="button" className="icon-btn" aria-label={t('common.profile')}>
            <Icon name="user" size={20} />
          </button>
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
    </header>
  )
}
