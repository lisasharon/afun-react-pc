'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
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

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
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
  }, [pathname, isMobile])

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
  const isProfileRoute = pathname.startsWith('/profile')
  const isBrowseRoute = pathname.startsWith('/browse')
  const isSportsRoute = pathname.startsWith('/sports')
  const isPromoRoute = pathname.startsWith('/promotion')
  const showHeader = !(isMobile && isProfileRoute)
  const showFooter =
    !isMobile || (!isProfileRoute && !isBrowseRoute && !isSportsRoute && !isPromoRoute)
  const showSupport = isMobile && !isBrowseRoute && !isProfileRoute
  const authOpen = authMode !== null

  const layoutClass = [
    'main-layout',
    isMobile ? 'is-mobile' : 'is-desktop',
    sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed',
    panelOpen ? 'messages-open' : '',
    panelOpen ? 'drawer-open' : '',
    isSportsRoute ? 'is-sports' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={layoutClass}>
      {!isMobile && (
        <Sidebar
          expanded={sidebarExpanded}
          onToggle={toggleSidebar}
          onClose={closeSidebar}
        />
      )}
      <div className="main-layout__content">
        {showHeader && (
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
        )}
        <main
          className={`main-layout__page ${isMobile && isProfileRoute ? 'main-layout__page--flush' : ''}`}
          ref={pageRef}
        >
          <div className="main-layout__page-body">
            {children}
          </div>
          {showFooter && <Footer />}
        </main>
      </div>
      {!isMobile && (
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
      )}
      {showSupport && <FloatingSupport />}
      {isMobile && <BottomNav onOpenAuth={setAuthMode} />}
      <AuthModal
        open={authOpen}
        mode={authMode || 'login'}
        onClose={() => setAuthMode(null)}
        onSwitchMode={setAuthMode}
      />
    </div>
  )
}
