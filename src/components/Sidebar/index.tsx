import { useEffect, useState } from 'react'
import { Icon } from '@/components/Icon'
import { formatDateTime } from '@/utils/format'
import './index.css'

type SidebarProps = {
  expanded: boolean
  onToggle: () => void
  onClose: () => void
}

const quickLinks = [
  { icon: 'game', label: '游戏' },
  { icon: 'star', label: '收藏夹' },
  { icon: 'clock', label: '最近的' },
] as const

const navItems = [
  { icon: 'gift', label: '促销活动', href: '#promo' },
  { icon: 'task', label: '任务中心', href: '#tasks' },
  { icon: 'vip', label: 'VIP俱乐部', href: '#vip' },
  { icon: 'blog', label: '博客', href: '#blog' },
] as const

const collapsedIcons = [
  { icon: 'lobby', label: '大厅' },
  { icon: 'gift', label: '促销' },
  { icon: 'slots', label: '老虎机' },
  { icon: 'cards', label: '棋牌' },
  { icon: 'game', label: '游戏' },
  { icon: 'fishing', label: '捕鱼' },
  { icon: 'lottery', label: '彩票' },
  { icon: 'star', label: '收藏' },
] as const

export function Sidebar({ expanded, onToggle, onClose }: SidebarProps) {
  const [now, setNow] = useState(() => new Date())
  const [mode, setMode] = useState<'casino' | 'sports'>('casino')
  const [activeCollapsed, setActiveCollapsed] = useState('lobby')

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <>
      <div
        className={`sidebar-backdrop ${expanded ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!expanded}
      />
      <aside
        className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}
        aria-label="侧边导航"
      >
        <div className="sidebar-top">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={expanded ? '折叠菜单' : '展开菜单'}
          >
            <Icon name="menu" size={22} />
          </button>

          {expanded ? (
            <div className="sidebar-mode">
              <button
                type="button"
                className={mode === 'casino' ? 'active' : ''}
                onClick={() => setMode('casino')}
              >
                娱乐城
              </button>
              <button
                type="button"
                className={mode === 'sports' ? 'active' : ''}
                onClick={() => setMode('sports')}
              >
                体育
              </button>
            </div>
          ) : null}
        </div>

        {expanded ? (
          <>
            <div className="promo-card referral">
              <div className="promo-card-body">
                <p className="promo-title">邀请并赚钱</p>
                <p className="promo-desc">邀请好友，共享佣金奖励</p>
                <button type="button" className="copy-btn">
                  复制链接
                </button>
              </div>
              <div className="promo-art money-bag" aria-hidden>
                <span className="bag">$</span>
              </div>
            </div>

            <div className="quick-links">
              {quickLinks.map((item) => (
                <button type="button" className="quick-link" key={item.label}>
                  <span className="quick-icon">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <a href={item.href} key={item.label}>
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="promo-card app-download">
              <div className="promo-card-body">
                <p className="promo-title">下载 APP</p>
                <p className="promo-desc">领取专属奖励礼包</p>
              </div>
              <div className="promo-art phones" aria-hidden>
                <span className="phone phone-1" />
                <span className="phone phone-2" />
              </div>
            </div>

            <div className="sidebar-footer">
              <div className="footer-links">
                <button type="button">
                  <Icon name="help" size={16} />
                  帮助
                </button>
                <button type="button">
                  <Icon name="headset" size={16} />
                  在线客服
                </button>
              </div>
              <button type="button" className="lang-btn">
                <Icon name="globe" size={16} />
                语言: 简体中文
                <Icon name="chevron-down" size={14} />
              </button>
              <time className="clock" dateTime={now.toISOString()}>
                {formatDateTime(now)}
              </time>
            </div>
          </>
        ) : (
          <nav className="collapsed-nav">
            {collapsedIcons.map((item) => (
              <button
                key={item.label}
                type="button"
                title={item.label}
                className={`collapsed-item ${activeCollapsed === item.icon ? 'active' : ''}`}
                onClick={() => setActiveCollapsed(item.icon)}
              >
                <Icon name={item.icon} size={22} />
              </button>
            ))}
          </nav>
        )}
      </aside>
    </>
  )
}
