'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import {
  countUnread,
  type MessageItem,
  type MessageType,
} from '@/types/message'
import './index.css'

const tabs: { id: MessageType; labelKey: string }[] = [
  { id: 'notify', labelKey: 'inbox.notify' },
  { id: 'mail', labelKey: 'inbox.mail' },
  { id: 'announce', labelKey: 'inbox.announce' },
  { id: 'feedback', labelKey: 'inbox.feedback' },
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
  const { t } = useTranslation()
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
  const activeTabLabel = t(
    tabs.find((tab) => tab.id === activeTab)?.labelKey ?? 'inbox.notify',
  )

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
        aria-label={t('inbox.title')}
      >
        <div className="message-header">
          <h2>
            <Icon name="bell" size={18} />
            {t('inbox.title')}
          </h2>
          <button
            type="button"
            className="message-close"
            onClick={onClose}
            aria-label={t('inbox.close')}
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
                {t(tab.labelKey)}
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
                      <p className="msg-title">
                        {t(`notices.${message.id}.title`)}
                      </p>
                      <p className="msg-time">
                        {t(`notices.${message.id}.time`)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="message-empty">
              {t('common.empty', { name: activeTabLabel })}
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
              <h3 id="msg-detail-title">
                {t(`notices.${activeMessage.id}.title`)}
              </h3>
              <button
                type="button"
                className="message-close"
                onClick={closeDetail}
                aria-label={t('inbox.closeDetail')}
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <p className="msg-detail-time">
              {t(`notices.${activeMessage.id}.time`)}
            </p>
            <div className="msg-detail-content">
              {t(`notices.${activeMessage.id}.content`)}
            </div>
            <div className="msg-detail-footer">
              <button type="button" className="msg-detail-ok" onClick={closeDetail}>
                {t('common.gotIt')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
