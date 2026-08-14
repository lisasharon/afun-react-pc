'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProfileSubPage } from '../Home'
import { SETTINGS_PANELS } from './panels'
import { SETTINGS_ITEMS, type SettingsItemId } from './types'
import './index.css'

export function Settings() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<SettingsItemId>('loginPassword')
  const Panel = SETTINGS_PANELS[activeId]

  return (
    <ProfileSubPage title={t('profile.settings')}>
      <section className="profile-panel">
        <div className="settings-grid">
          {SETTINGS_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`profile-panel-button ${activeId === item.id ? 'active' : ''}`}
              onClick={() => setActiveId(item.id)}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>
        <div className="settings-body" key={activeId}>
          <Panel />
        </div>
      </section>
    </ProfileSubPage>
  )
}
