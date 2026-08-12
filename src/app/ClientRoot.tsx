'use client'

import dynamic from 'next/dynamic'
import { AppBoot } from './AppBoot'

const AppShell = dynamic(
  () => import('./AppShell').then((mod) => mod.AppShell),
  { ssr: false, loading: () => <AppBoot /> },
)

export function ClientRoot({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
