'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import { AUTH } from '@/mock/auth'
import './index.css'

export type WalletTab = 'deposit' | 'withdraw'

const QUICK_AMOUNTS = [100, 500, 1000, 5000]

type WalletModalProps = {
  open: boolean
  tab: WalletTab
  onTabChange: (tab: WalletTab) => void
  onClose: () => void
}

export function WalletModal({ open, tab, onTabChange, onClose }: WalletModalProps) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [amount, setAmount] = useState('')
  const isDeposit = tab === 'deposit'

  useEffect(() => {
    if (!open) return
    setAmount('')
  }, [open, tab])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = Number(amount)
    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      message.warning(t('profile.emptyAmount'))
      return
    }
    if (!isDeposit && value > Number(AUTH.balance)) {
      message.warning(t('profile.withdrawExceed'))
      return
    }
    message.success(
      isDeposit ? t('profile.depositSuccess') : t('profile.withdrawSuccess'),
    )
    setAmount('')
    onClose()
  }

  return (
    <div className="wallet-modal" onClick={onClose} role="presentation">
      <div
        className="wallet-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="wallet-modal__header">
          <div className="wallet-modal__tabs" role="tablist" id="wallet-modal-title">
            {(['deposit', 'withdraw'] as const).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={tab === item}
                className={`wallet-modal__tab ${tab === item ? 'active' : ''}`}
                onClick={() => onTabChange(item)}
              >
                {t(`profile.${item}`)}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="wallet-modal__close"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            <Icon name="close" size={18} />
          </button>
        </header>

        <form className="wallet-modal__body" onSubmit={handleSubmit}>
          <p className="wallet-modal__balance">
            {t('profile.balance')}
            <strong>
              {AUTH.currency}
              {AUTH.balance}
            </strong>
          </p>

          <label className="wallet-modal__field">
            <span>
              {t('profile.amount')} <em>*</em>
            </span>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="decimal"
              className="wallet-modal__input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t('profile.amountPlaceholder')}
            />
          </label>

          <div className="wallet-modal__quick">
            {QUICK_AMOUNTS.map((item) => (
              <button
                key={item}
                type="button"
                className={`wallet-modal__chip ${amount === String(item) ? 'active' : ''}`}
                onClick={() => setAmount(String(item))}
              >
                {item}
              </button>
            ))}
          </div>

          <button type="submit" className="wallet-modal__submit">
            {t(`profile.${tab}`)}
          </button>
        </form>
      </div>
    </div>
  )
}
