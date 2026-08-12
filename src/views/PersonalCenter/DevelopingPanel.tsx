import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import { ProfileSubPage } from './Home'

/** 子页内容区：统一「开发中」占位 */
export function DevelopingPanel() {
  const { t } = useTranslation()

  return (
    <section className="profile-panel profile-panel--placeholder">
      <div className="profile-empty">
        <div className="profile-empty-icon">
          <Icon name="chart" size={48} />
        </div>
        <p>{t('profile.placeholder')}</p>
      </div>
    </section>
  )
}

export function DevelopingPage({ titleKey }: { titleKey: string }) {
  const { t } = useTranslation()

  return (
    <ProfileSubPage title={t(titleKey)}>
      <DevelopingPanel />
    </ProfileSubPage>
  )
}
