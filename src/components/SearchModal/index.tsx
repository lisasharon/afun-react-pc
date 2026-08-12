'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import './index.css'

export type SearchModalProps = {
  open: boolean
  onClose: () => void
  query: string
  onQueryChange: (value: string) => void
  placeholder: string
  recent: string[]
  popular: string[]
  recentTitle: string
  popularTitle: string
  clearTitle: string
  emptyText: string
  onClearRecent: () => void
  onRemoveRecent: (item: string) => void
  onSelectKeyword: (item: string) => void
  onSubmit?: () => void
  /** 有搜索词时的自定义结果；不传则显示空态文案 */
  results?: ReactNode
}

export function SearchModal({
  open,
  onClose,
  query,
  onQueryChange,
  placeholder,
  recent,
  popular,
  recentTitle,
  popularTitle,
  clearTitle,
  emptyText,
  onClearRecent,
  onRemoveRecent,
  onSelectKeyword,
  onSubmit,
  results,
}: SearchModalProps) {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const keyword = query.trim()

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  const clearInput = () => {
    if (query) {
      onQueryChange('')
      inputRef.current?.focus()
      return
    }
    onClose()
  }

  return createPortal(
    <div className="search-modal" onClick={onClose}>
      <div
        className="search-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={placeholder}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal__bar">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSubmit?.()
            }}
            aria-label={placeholder}
          />
          <button
            type="button"
            className="search-modal__clear"
            aria-label={t('common.close')}
            onClick={clearInput}
          >
            <Icon name="close" size={14} />
          </button>
        </div>

        <div className="search-modal__body">
          {keyword ? (
            results ?? <p className="search-modal__empty">{emptyText}</p>
          ) : (
            <>
              {recent.length > 0 ? (
                <div className="search-modal__block">
                  <div className="search-modal__head">
                    <h3>{recentTitle}</h3>
                    <button type="button" onClick={onClearRecent}>
                      {clearTitle}
                    </button>
                  </div>
                  <ul className="search-modal__tags">
                    {recent.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          className="search-modal__tag"
                          onClick={() => onSelectKeyword(item)}
                        >
                          {item}
                        </button>
                        <button
                          type="button"
                          className="search-modal__tag-remove"
                          aria-label={t('common.close')}
                          onClick={() => onRemoveRecent(item)}
                        >
                          <Icon name="close" size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="search-modal__block">
                <div className="search-modal__head">
                  <h3>{popularTitle}</h3>
                </div>
                <ul className="search-modal__tags">
                  {popular.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className="search-modal__tag"
                        onClick={() => onSelectKeyword(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
