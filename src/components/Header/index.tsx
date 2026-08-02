import { Icon } from '@/components/Icon'
import './index.css'

type HeaderProps = {
  onOpenMessages: () => void
  messagesOpen: boolean
  onMenuClick?: () => void
  showMobileMenu?: boolean
}

export function Header({
  onOpenMessages,
  messagesOpen,
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
            aria-label="消息中心"
            onClick={onOpenMessages}
          >
            <Icon name="bell" size={20} />
            <span className="icon-dot" />
          </button>
          <button
            type="button"
            className={`icon-btn ${messagesOpen ? 'active' : ''}`}
            aria-label="站内信"
            onClick={onOpenMessages}
          >
            <Icon name="message" size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
