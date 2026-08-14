'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'

type PasswordFieldProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  autoComplete: string
}

export function PasswordField({
  value,
  onChange,
  placeholder,
  autoComplete,
}: PasswordFieldProps) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  return (
    <div className="settings-field__control">
      <input
        type={visible ? 'text' : 'password'}
        className="settings-field__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="settings-field__eye"
        aria-label={visible ? t('auth.hidePassword') : t('auth.showPassword')}
        onClick={() => setVisible((v) => !v)}
      >
        <Icon name={visible ? 'eye' : 'eye-off'} size={18} />
      </button>
    </div>
  )
}
