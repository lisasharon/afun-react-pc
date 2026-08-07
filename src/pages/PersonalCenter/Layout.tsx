import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import { useIsMobile } from '@/hooks'
import { copyText } from '@/utils/copy'
import {
  PROFILE_USER,
  financeMenus,
  promoMenus,
  recordMenus,
  serviceMenus,
} from './menu'

export function PersonalCenterLayout() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const copyAccount = () => {
    void copyText(
      PROFILE_USER.username,
      t('common.copySuccess'),
      t('common.copyFailed'),
    )
  }

  /* 移动端：子页自己管顶栏，壳不包左栏 */
  if (isMobile) {
    return <Outlet />
  }

  return (
    <div className="profile-page">
      <header className="profile-page-title">
        <Icon name="user" size={20} />
        <h1>{t('profile.title')}</h1>
      </header>

      <div className="profile-body">
        <aside className="profile-aside">
          <div className="profile-user-card">
            <div className="profile-avatar" />
            <div className="profile-user-meta">
              <div className="profile-account-row">
                <span>
                  {t('profile.accountLabel')}: {PROFILE_USER.username}
                </span>
                <button
                  type="button"
                  className="profile-copy"
                  onClick={copyAccount}
                  aria-label={t('common.copySuccess')}
                >
                  <Icon name="copy" size={14} />
                </button>
              </div>
              <p>
                {t('profile.levelLabel')}: {PROFILE_USER.vipLevel}
              </p>
            </div>
          </div>

          <nav className="profile-nav">
            <ul className="profile-nav-group">
              {financeMenus.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `profile-nav-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon name={item.icon} size={18} />
                    {t(`profile.${item.id}`)}
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul className="profile-nav-group">
              {recordMenus.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `profile-nav-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon name={item.icon} size={18} />
                    {t(`profile.${item.id}`)}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="profile-nav-label">{t('profile.promoCenter')}</p>
            <ul className="profile-nav-group">
              {promoMenus.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `profile-nav-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon name={item.icon} size={18} />
                    {t(`profile.${item.id}`)}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="profile-nav-label">{t('profile.serviceCenter')}</p>
            <ul className="profile-nav-group">
              {serviceMenus.map((item) => (
                <li key={item.id}>
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `profile-nav-item ${isActive ? 'active' : ''}`
                      }
                    >
                      <Icon name={item.icon} size={18} />
                      {t(`profile.${item.id}`)}
                    </NavLink>
                  ) : (
                    <button type="button" className="profile-nav-item">
                      <Icon name={item.icon} size={18} />
                      {t(`profile.${item.id}`)}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="profile-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
