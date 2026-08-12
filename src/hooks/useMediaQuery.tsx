'use client'

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

const MOBILE_QUERY = '(max-width: 960px)'

const MobileContext = createContext<boolean | null>(null)

function subscribeQuery(query: string, onChange: () => void) {
  const mq = window.matchMedia(query)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => subscribeQuery(query, onChange),
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export function useIsMobile(breakpoint = 960) {
  const fromCtx = useContext(MobileContext)
  const matches = useMediaQuery(`(max-width: ${breakpoint}px)`)
  if (breakpoint === 960 && fromCtx !== null) return fromCtx
  return matches
}

export function MobileProvider({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery(MOBILE_QUERY)

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
}
