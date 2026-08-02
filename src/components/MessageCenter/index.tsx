import { useEffect, useState } from 'react'
import { Icon } from '@/components/Icon'
import {
  countUnread,
  type MessageItem,
  type MessageType,
} from '@/types/message'
import './index.css'

const tabs: { id: MessageType; label: string }[] = [
  { id: 'notify', label: '通知' },
  { id: 'mail', label: '站内信' },
  { id: 'announce', label: '公告' },
  { id: 'feedback', label: '有奖反馈' },
]

type MessageCenterProps = {
  open: boolean
  onClose: () => void
  messages: MessageItem[]
  activeTab: MessageType
  onTabChange: (tab: MessageType) => void
  onMarkRead: (id: string) => void
}

export function MessageCenter({
  open,
  onClose,
  messages,
  activeTab,
  onTabChange,
  onMarkRead,
}: MessageCenterProps) {
  const [activeMessage, setActiveMessage] = useState<MessageItem | null>(null)

  useEffect(() => {
    if (!open) setActiveMessage(null)
  }, [open])

  useEffect(() => {
    if (!activeMessage) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMessage(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeMessage])

  const list = messages.filter((m) => m.type === activeTab)

  const openMessage = (message: MessageItem) => {
    setActiveMessage(message)
    if (!message.read) onMarkRead(message.id)
  }

  const closeDetail = () => setActiveMessage(null)

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
          {tabs.map((tab) => {
            const unread = countUnread(messages, tab.id)
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`message-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label}
                {unread > 0 ? <span className="tab-badge">{unread}</span> : null}
              </button>
            )
          })}
        </div>

        <div className="message-body" role="tabpanel">
          {list.length > 0 ? (
            <ul className="message-list">
              {list.map((message) => (
                <li key={message.id}>
                  <button
                    type="button"
                    className="message-item"
                    onClick={() => openMessage(message)}
                  >
                    <span className={`msg-dot ${message.read ? 'read' : ''}`} />
                    <div>
                      <p className="msg-title">{message.title}</p>
                      <p className="msg-time">{message.time}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="message-empty">
              暂无{tabs.find((t) => t.id === activeTab)?.label}
            </div>
          )}
        </div>
      </aside>

      {activeMessage ? (
        <div className="msg-detail-root" role="presentation">
          <div className="msg-detail-mask" onClick={closeDetail} aria-hidden />
          <div
            className="msg-detail-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="msg-detail-title"
          >
            <div className="msg-detail-header">
              <h3 id="msg-detail-title">{activeMessage.title}</h3>
              <button
                type="button"
                className="message-close"
                onClick={closeDetail}
                aria-label="关闭详情"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <p className="msg-detail-time">{activeMessage.time}</p>
            <div className="msg-detail-content">{activeMessage.content}</div>
            <div className="msg-detail-footer">
              <button type="button" className="msg-detail-ok" onClick={closeDetail}>
                我知道了
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
