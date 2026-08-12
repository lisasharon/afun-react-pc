'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigate } from '@/components/Navigate'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import { useIsMobile } from '@/hooks'
import { copyText } from '@/utils/copy'
import {
  PROFILE_USER,
  financeMenus,
  mobilePrimary,
  mobileSecondary,
  profilePaths,
} from '../menu'

/** 移动端子页顶栏 */
export function ProfileSubHeader({ title }: { title: string }) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <header className="profile-mobile__nav">
      <button
        type="button"
        className="profile-mobile__nav-btn"
        aria-label={t('common.prev')}
        onClick={() => router.push(profilePaths.home)}
      >
        <Icon name="chevron-left" size={22} />
      </button>
      <h1>{title}</h1>
      <button
        type="button"
        className="profile-mobile__nav-btn"
        aria-label={t('common.onlineSupport')}
      >
        <Icon name="headset" size={22} />
      </button>
    </header>
  )
}

export function ProfileSubPage({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const isMobile = useIsMobile()

  if (!isMobile) return <>{children}</>

  return (
    <div className="profile-mobile profile-mobile--sub">
      <ProfileSubHeader title={title} />
      {children}
    </div>
  )
}

export function ProfileHome() {
  const { t } = useTranslation()
  const router = useRouter()
  const isMobile = useIsMobile()

  const copyAccount = () => {
    void copyText(
      PROFILE_USER.username,
      t('common.copySuccess'),
      t('common.copyFailed'),
    )
  }

  /* 桌面 /profile 默认进交易记录；移动端保留列表首页 */
  if (!isMobile) {
    return <Navigate to={profilePaths.transactions} replace />
  }

  return (
    <div className="profile-mobile">
      <header className="profile-mobile__nav">
        <button
          type="button"
          className="profile-mobile__nav-btn"
          aria-label={t('common.prev')}
          onClick={() => router.back()}
        >
          <Icon name="chevron-left" size={22} />
        </button>
        <h1>{t('profile.title')}</h1>
        <button
          type="button"
          className="profile-mobile__nav-btn"
          aria-label={t('common.onlineSupport')}
        >
          <Icon name="headset" size={22} />
        </button>
      </header>

      <div className="profile-mobile__user">
        <div className="profile-avatar" />
        <div className="profile-mobile__user-meta">
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
        <Link
          href={profilePaths.personalInfo}
          className="profile-mobile__user-more"
          aria-label={t('profile.personalInfo')}
        >
          <Icon name="chevron-right" size={18} />
        </Link>
      </div>

      <section className="profile-mobile__wallet">
        <button type="button" className="profile-mobile__balance">
          <span className="profile-mobile__currency">M$</span>
          <strong>{PROFILE_USER.balance}</strong>
          <span className="profile-mobile__refresh" aria-hidden>
            <Icon name="refresh" size={16} />
          </span>
          <Icon name="chevron-right" size={16} />
        </button>
        <div className="profile-mobile__actions">
          {financeMenus.map((item) => (
            <Link href={item.to} key={item.id} className="profile-mobile__action">
              <span className="profile-mobile__action-icon">
                <Icon name={item.icon} size={22} />
              </span>
              <span>{t(`profile.${item.id}`)}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="profile-mobile__primary">
        {mobilePrimary.map((item) => (
          <Link
            href={item.to}
            key={item.id}
            className="profile-mobile__primary-item"
          >
            <span className="profile-mobile__primary-icon">
              <Icon name={item.icon} size={22} />
            </span>
            <span className="profile-mobile__primary-text">
              <strong>{t(item.titleKey)}</strong>
              <small>{t(item.descKey)}</small>
            </span>
            <Icon name="chevron-right" size={16} />
          </Link>
        ))}
      </div>

      <div className="profile-mobile__banner">
        <div className="profile-mobile__banner-text">
          <strong>{t('profile.promoBannerTitle')}</strong>
          <span>{t('profile.promoBannerDesc')}</span>
        </div>
        <div className="profile-mobile__banner-art" aria-hidden>
          <span className="gift-box" />
        </div>
      </div>

      <div className="profile-mobile__secondary">
        {mobileSecondary.map((item) => (
          <Link
            href={item.to}
            key={item.id}
            className="profile-mobile__secondary-item"
          >
            <Icon name={item.icon} size={20} />
            <span>{t(item.titleKey)}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
