'use client'

import '@/i18n'
import { MobileProvider } from '@/hooks'
import { AntdProvider } from '@/providers/AntdProvider'
import { MainLayout } from '@/layouts/MainLayout'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MobileProvider>
      <AntdProvider>
        <MainLayout>{children}</MainLayout>
      </AntdProvider>
    </MobileProvider>
  )
}
