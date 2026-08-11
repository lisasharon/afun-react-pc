import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AuthModal, type AuthMode } from '@/components/AuthModal'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
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
  const [authMode, setAuthMode] = useState<AuthMode | null>(null)

  useEffect(() => {
    setSidebarExpanded(!isMobile)
  }, [isMobile])

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0, left: 0 })
    if (isMobile) setSidebarExpanded(false)
    setMessagesOpen(false)
    setBetSlipOpen(false)
    setAuthMode(null)
  }, [location.pathname, isMobile])

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
  const isProfileRoute = location.pathname.startsWith('/profile')
  const hideFooter =
    isMobile &&
    (isProfileRoute ||
      location.pathname.startsWith('/browse') ||
      location.pathname.startsWith('/sports') ||
      location.pathname.startsWith('/promotion'))

  const layoutClass = [
    'main-layout',
    isMobile ? 'is-mobile' : 'is-desktop',
    sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed',
    panelOpen ? 'messages-open' : '',
    panelOpen ? 'drawer-open' : '',
    location.pathname.startsWith('/sports') ? 'is-sports' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={layoutClass}>
      {!isMobile ? (
        <Sidebar
          expanded={sidebarExpanded}
          onToggle={toggleSidebar}
          onClose={closeSidebar}
        />
      ) : null}
      <div className="main-layout__content">
        {!(isMobile && isProfileRoute) ? (
          <Header
            onOpenMessages={openMessages}
            onOpenBetSlip={openBetSlip}
            messagesOpen={messagesOpen}
            betSlipOpen={betSlipOpen}
            notifyUnread={notifyUnread}
            betSlipCount={betSlipCount}
            isMobile={isMobile}
            onOpenAuth={setAuthMode}
          />
        ) : null}
        <main
          className={`main-layout__page ${isMobile && isProfileRoute ? 'main-layout__page--flush' : ''}`}
          ref={pageRef}
        >
          <div className="main-layout__page-body">
            <Outlet />
          </div>
          {/* 桌面全站 Footer；移动端仅娱乐城显示，浏览/体育/优惠/个人中心不显示 */}
          {!hideFooter ? <Footer /> : null}
        </main>
      </div>
      {!isMobile ? (
        <>
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
        </>
      ) : null}
      {isMobile && location.pathname !== '/browse' && !isProfileRoute ? (
        <FloatingSupport />
      ) : null}
      {isMobile ? <BottomNav onOpenAuth={setAuthMode} /> : null}
      <AuthModal
        open={authMode !== null}
        mode={authMode ?? 'login'}
        onClose={() => setAuthMode(null)}
        onSwitchMode={setAuthMode}
      />
    </div>
  )
}
