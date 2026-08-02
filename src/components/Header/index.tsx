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
  return (
    <header className="header">
      <div className="header-left">
        {showMobileMenu ? (
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={onMenuClick}
            aria-label="打开菜单"
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
          存款
        </button>

        <div className="header-icons">
          <button type="button" className="icon-btn" aria-label="搜索">
            <Icon name="search" size={20} />
          </button>
          <button type="button" className="icon-btn" aria-label="个人中心">
            <Icon name="user" size={20} />
          </button>
          <button
            type="button"
            className={`icon-btn ${messagesOpen ? 'active' : ''}`}
            aria-label={
              notifyUnread > 0 ? `消息中心，${notifyUnread} 条未读` : '消息中心'
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
              betSlipCount > 0 ? `投注单，${betSlipCount} 项` : '投注单'
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
