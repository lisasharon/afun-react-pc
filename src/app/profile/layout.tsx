'use client'

import { PersonalCenterLayout } from '@/views/PersonalCenter'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <PersonalCenterLayout>{children}</PersonalCenterLayout>
}
