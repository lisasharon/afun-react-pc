import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { MessageCenter } from '@/components/MessageCenter'
import { BetSlip } from '@/components/BetSlip'
import { FloatingSupport } from '@/components/FloatingSupport'
import { Footer } from '@/components/Footer'
import { useIsMobile } from '@/hooks'
import { betSlipMock } from '@/mock/bets'
import { messagesMock } from '@/mock/messages'
import type { BetSlipItem } from '@/types/bet'
import { countUnread, type MessageItem, type MessageType } from '@/types/message'
import './index.css'

export function MainLayout() {
  const location = useLocation()
  const pageRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [betSlipOpen, setBetSlipOpen] = useState(false)
  const [messages, setMessages] = useState<MessageItem[]>(messagesMock)
  const [messageTab, setMessageTab] = useState<MessageType>('notify')
  const [betItems, setBetItems] = useState<BetSlipItem[]>(betSlipMock)

  useEffect(() => {
    setSidebarExpanded(!isMobile)
  }, [isMobile])

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  const notifyUnread = countUnread(messages)
  const betSlipCount = betItems.length

  const toggleSidebar = () => setSidebarExpanded((v) => !v)
  const closeSidebar = () => setSidebarExpanded(false)

  const openMessages = (tab: MessageType = 'notify') => {
    setMessageTab(tab)
    setBetSlipOpen(false)
    setMessagesOpen(true)
  }

  const closeMessages = () => setMessagesOpen(false)

  const openBetSlip = () => {
    setMessagesOpen(false)
    setBetSlipOpen(true)
  }

  const closeBetSlip = () => setBetSlipOpen(false)

  const markMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    )
  }

  const removeBet = (id: string) => {
    setBetItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearBets = () => setBetItems([])

  const panelOpen = messagesOpen || betSlipOpen

  const layoutClass = [
    'main-layout',
    sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed',
    panelOpen ? 'messages-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={layoutClass}>
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
      />
      <div className="main-layout__content">
        <Header
          onOpenMessages={openMessages}
          onOpenBetSlip={openBetSlip}
          messagesOpen={messagesOpen}
          betSlipOpen={betSlipOpen}
          notifyUnread={notifyUnread}
          betSlipCount={betSlipCount}
          showMobileMenu={isMobile}
          onMenuClick={toggleSidebar}
        />
        <main className="main-layout__page" ref={pageRef}>
          <div className="main-layout__page-body">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      <MessageCenter
        open={messagesOpen}
        onClose={closeMessages}
        messages={messages}
        activeTab={messageTab}
        onTabChange={setMessageTab}
        onMarkRead={markMessageRead}
      />
      <BetSlip
        open={betSlipOpen}
        onClose={closeBetSlip}
        items={betItems}
        onRemove={removeBet}
        onClear={clearBets}
      />
      <FloatingSupport />
    </div>
  )
}
