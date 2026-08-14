'use client'

import { useState, type FormEvent } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { FieldLabel } from './FieldLabel'

type TextFormProps = {
  labelKey: string
  placeholderKey: string
  emptyTipKey: string
}

export function TextForm({ labelKey, placeholderKey, emptyTipKey }: TextFormProps) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) {
      message.warning(t(emptyTipKey))
      return
    }
    message.success(t('profile.settingsSaved'))
    setValue('')
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <label className="settings-field">
        <FieldLabel>{t(labelKey)}</FieldLabel>
        <input
          type="text"
          className="settings-field__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t(placeholderKey)}
          autoComplete="off"
        />
      </label>
      <button type="submit" className="settings-submit">
        {t('profile.confirm')}
      </button>
    </form>
  )
}
