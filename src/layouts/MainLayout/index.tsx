import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { MessageCenter } from '@/components/MessageCenter'
import { FloatingSupport } from '@/components/FloatingSupport'
import { useIsMobile } from '@/hooks'
import './index.css'

export function MainLayout() {
  const isMobile = useIsMobile()
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [messagesOpen, setMessagesOpen] = useState(false)

  useEffect(() => {
    setSidebarExpanded(!isMobile)
  }, [isMobile])

  const toggleSidebar = () => setSidebarExpanded((v) => !v)
  const closeSidebar = () => setSidebarExpanded(false)
  const openMessages = () => setMessagesOpen(true)
  const closeMessages = () => setMessagesOpen(false)

  const layoutClass = [
    'main-layout',
    sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed',
    messagesOpen ? 'messages-open' : '',
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
          messagesOpen={messagesOpen}
          showMobileMenu={isMobile}
          onMenuClick={toggleSidebar}
        />
        <main className="main-layout__page">
          <Outlet />
        </main>
      </div>
      <MessageCenter open={messagesOpen} onClose={closeMessages} />
      <FloatingSupport />
    </div>
  )
}
