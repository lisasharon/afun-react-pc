'use client'

import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'

export function LoginRecordPanel() {
  const { t } = useTranslation()

  return (
    <div className="profile-empty">
      <div className="profile-empty-icon">
        <Icon name="clock" size={48} />
      </div>
      <p>{t('profile.emptyLoginRecord')}</p>
    </div>
  )
}
