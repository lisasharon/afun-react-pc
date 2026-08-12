import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import { ProfileSubPage } from '../Home'

export function BetHistory() {
  const { t } = useTranslation()

  return (
    <ProfileSubPage title={t('profile.betHistory')}>
      <section className="profile-panel">
        <div className="profile-panel-inner" style={{ marginTop: 16 }}>
          <div className="profile-empty">
            <div className="profile-empty-icon">
              <Icon name="chart" size={48} />
            </div>
            <p>{t('profile.emptyBetHistory')}</p>
          </div>
        </div>
      </section>
    </ProfileSubPage>
  )
}
