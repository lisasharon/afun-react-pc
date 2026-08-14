'use client'

import { useState, type FormEvent } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { FieldLabel } from './FieldLabel'
import { PasswordField } from './PasswordField'

type PasswordFormProps = {
  currentLabelKey: string
  currentPlaceholderKey: string
  newLabelKey: string
  newPlaceholderKey: string
}

export function PasswordForm({
  currentLabelKey,
  currentPlaceholderKey,
  newLabelKey,
  newPlaceholderKey,
}: PasswordFormProps) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!current) {
      message.warning(t('profile.emptyCurrentPassword'))
      return
    }
    if (!next) {
      message.warning(t('profile.emptyNewPassword'))
      return
    }
    message.success(t('profile.settingsSaved'))
    setCurrent('')
    setNext('')
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <label className="settings-field">
        <FieldLabel>{t(currentLabelKey)}</FieldLabel>
        <PasswordField
          value={current}
          onChange={setCurrent}
          placeholder={t(currentPlaceholderKey)}
          autoComplete="current-password"
        />
      </label>

      <label className="settings-field">
        <FieldLabel>{t(newLabelKey)}</FieldLabel>
        <PasswordField
          value={next}
          onChange={setNext}
          placeholder={t(newPlaceholderKey)}
          autoComplete="new-password"
        />
      </label>

      <button
        type="button"
        className="settings-forgot"
        onClick={() => message.info(t('profile.placeholder'))}
      >
        {t('auth.forgotPassword')}
      </button>

      <button type="submit" className="settings-submit">
        {t('profile.confirm')}
      </button>
    </form>
  )
}
