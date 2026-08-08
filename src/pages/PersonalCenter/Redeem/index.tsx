import { useState } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { ProfileSubPage } from '../Home'
import './index.css'

export function Redeem() {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [code, setCode] = useState('')

  const handleSubmit = () => {
    const value = code.trim()
    if (!value) {
      message.warning(t('profile.redeemEmpty'))
      return
    }
    message.success(t('profile.redeemSuccess'))
    setCode('')
  }

  return (
    <ProfileSubPage title={t('profile.redeem')}>
      <section className="profile-panel redeem-panel">
        <header className="redeem-panel__header">
          <h2>{t('profile.redeem')}</h2>
        </header>

        <div className="redeem-panel__body">
          <input
            type="text"
            className="redeem-panel__input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit()
            }}
            placeholder={t('profile.redeemPlaceholder')}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <footer className="redeem-panel__footer">
          <button
            type="button"
            className="redeem-panel__submit"
            onClick={handleSubmit}
          >
            {t('profile.redeemSubmit')}
          </button>
        </footer>
      </section>
    </ProfileSubPage>
  )
}
