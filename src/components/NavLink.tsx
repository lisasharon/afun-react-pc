'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEventHandler, ReactNode } from 'react'

type NavLinkProps = {
  to: string
  end?: boolean
  className?: string | ((args: { isActive: boolean }) => string)
  children: ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavLink({ to, end, className, children, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = end
    ? pathname === to
    : pathname === to || (to !== '/' && pathname.startsWith(to))
  const cls = typeof className === 'function' ? className({ isActive }) : className

  return (
    <Link href={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  )
}
