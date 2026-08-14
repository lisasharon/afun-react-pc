import type { ReactNode } from 'react'

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="settings-field__label">
      {children} <em>*</em>
    </span>
  )
}
