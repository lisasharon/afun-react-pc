import { useState } from 'react'
import { Icon } from '@/components/Icon'
import './index.css'

const tabs = [
  { id: 'notify', label: '通知', badge: 4 },
  { id: 'mail', label: '站内信' },
  { id: 'announce', label: '公告' },
  { id: 'feedback', label: '有奖反馈' },
] as const

type MessageCenterProps = {
  open: boolean
  onClose: () => void
}

export function MessageCenter({ open, onClose }: MessageCenterProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('notify')

  return (
    <>
      <div
        className={`message-backdrop ${open ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`message-center ${open ? 'open' : ''}`}
        aria-hidden={!open}
        aria-label="消息中心"
      >
        <div className="message-header">
          <h2>
            <Icon name="bell" size={18} />
            消息中心
          </h2>
          <button
            type="button"
            className="message-close"
            onClick={onClose}
            aria-label="关闭消息中心"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="message-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`message-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {'badge' in tab && tab.badge ? (
                <span className="tab-badge">{tab.badge}</span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="message-body" role="tabpanel">
          {activeTab === 'notify' && (
            <ul className="message-list">
              <li>
                <span className="msg-dot" />
                <div>
                  <p className="msg-title">首存奖励已到账</p>
                  <p className="msg-time">今天 14:22</p>
                </div>
              </li>
              <li>
                <span className="msg-dot" />
                <div>
                  <p className="msg-title">每周锦标赛即将开始</p>
                  <p className="msg-time">今天 10:05</p>
                </div>
              </li>
              <li>
                <span className="msg-dot" />
                <div>
                  <p className="msg-title">VIP 升级礼包可领取</p>
                  <p className="msg-time">昨天 21:40</p>
                </div>
              </li>
              <li>
                <span className="msg-dot read" />
                <div>
                  <p className="msg-title">系统维护通知</p>
                  <p className="msg-time">08-01 18:00</p>
                </div>
              </li>
            </ul>
          )}
          {activeTab !== 'notify' && (
            <div className="message-empty">
              暂无{tabs.find((t) => t.id === activeTab)?.label}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
