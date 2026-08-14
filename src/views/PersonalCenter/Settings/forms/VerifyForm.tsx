'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { FieldLabel } from './FieldLabel'

type VerifyFormProps = {
  labelKey: string
  placeholderKey: string
  emptyTipKey: string
  inputType: 'tel' | 'email'
}

export function VerifyForm({
  labelKey,
  placeholderKey,
  emptyTipKey,
  inputType,
}: VerifyFormProps) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [value, setValue] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown <= 0) return
    const id = window.setTimeout(() => setCountdown((s) => s - 1), 1000)
    return () => window.clearTimeout(id)
  }, [countdown])

  const handleSendCode = () => {
    if (!value.trim()) {
      message.warning(t(emptyTipKey))
      return
    }
    if (countdown > 0) return
    setCountdown(60)
    message.success(t('profile.codeSent'))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) {
      message.warning(t(emptyTipKey))
      return
    }
    if (!code.trim()) {
      message.warning(t('profile.emptyCode'))
      return
    }
    message.success(t('profile.settingsSaved'))
    setValue('')
    setCode('')
    setCountdown(0)
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <label className="settings-field">
        <FieldLabel>{t(labelKey)}</FieldLabel>
        <input
          type={inputType}
          className="settings-field__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t(placeholderKey)}
          autoComplete={inputType === 'email' ? 'email' : 'tel'}
        />
      </label>
      <label className="settings-field">
        <FieldLabel>{t('profile.verificationCode')}</FieldLabel>
        <div className="settings-code-row">
          <input
            type="text"
            inputMode="numeric"
            className="settings-field__input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('profile.verificationCodePlaceholder')}
            autoComplete="one-time-code"
          />
          <button
            type="button"
            className="settings-code-btn"
            disabled={countdown > 0}
            onClick={handleSendCode}
          >
            {countdown > 0
              ? t('profile.resendAfter', { count: countdown })
              : t('profile.sendCode')}
          </button>
        </div>
      </label>
      <button type="submit" className="settings-submit">
        {t('profile.confirm')}
      </button>
    </form>
  )
}
