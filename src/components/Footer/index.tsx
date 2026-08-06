import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import './index.css'

const socials = [
  { icon: 'facebook', label: 'Facebook', color: '#1877F2' },
  { icon: 'instagram', label: 'Instagram', color: '#E4405F' },
  { icon: 'telegram', label: 'Telegram', color: '#26A5E4' },
  { icon: 'tiktok', label: 'TikTok', color: '#69C9D0' },
  { icon: 'x', label: 'X', color: '#fff' },
  { icon: 'youtube', label: 'YouTube', color: '#FF0000' },
] as const

const columns = [
  {
    titleKey: 'footer.columns.promote',
    links: [
      { labelKey: 'footer.links.offers', href: '/promotion' },
      { labelKey: 'footer.links.affiliate', href: '#affiliate' },
      { labelKey: 'footer.links.vip', href: '#vip' },
    ],
  },
  {
    titleKey: 'footer.columns.sports',
    links: [
      { labelKey: 'footer.links.sportsHome', href: '#sports' },
      { labelKey: 'footer.links.football', href: '#football' },
      { labelKey: 'footer.links.sportsRules', href: '#rules' },
    ],
  },
  {
    titleKey: 'footer.columns.about',
    links: [
      { labelKey: 'footer.links.aboutUs', href: '#about' },
      { labelKey: 'footer.links.help', href: '#help' },
    ],
  },
  {
    titleKey: 'footer.columns.responsibility',
    links: [
      { labelKey: 'footer.links.aml', href: '#aml' },
      { labelKey: 'footer.links.responsible', href: '#responsible' },
      { labelKey: 'footer.links.terms', href: '#terms' },
      { labelKey: 'footer.links.privacy', href: '#privacy' },
      { labelKey: 'footer.links.dataProtection', href: '#data' },
    ],
  },
  {
    titleKey: 'footer.columns.contact',
    links: [{ labelKey: 'footer.links.contactUs', href: '#contact' }],
  },
] as const

export function Footer() {
  const { t } = useTranslation()
  const [oddsOpen, setOddsOpen] = useState(false)
  const [oddsFormat, setOddsFormat] = useState('decimal')

  return (
    <footer className="site-footer">
      <div className="site-footer__community">
        <h2>{t('footer.community')}</h2>
        <div className="site-footer__socials">
          {socials.map((item) => (
            <a
              key={item.icon}
              href={`#${item.icon}`}
              className="site-footer__social"
              aria-label={item.label}
              style={{ color: item.color }}
            >
              <Icon name={item.icon} size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="site-footer__nav">
        {columns.map((col) => (
          <div key={col.titleKey} className="site-footer__col">
            <h3>{t(col.titleKey)}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={link.labelKey}>
                  <a href={link.href}>{t(link.labelKey)}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="site-footer__odds">
        <span>{t('footer.odds')}</span>
        <div className="site-footer__odds-switch">
          <button
            type="button"
            className="site-footer__odds-btn"
            aria-expanded={oddsOpen}
            onClick={() => setOddsOpen((v) => !v)}
          >
            {t('footer.oddsDecimal')}
            <Icon name="chevron-down" size={14} />
          </button>
          {oddsOpen ? (
            <div className="site-footer__odds-menu" role="listbox">
              <button
                type="button"
                role="option"
                aria-selected={oddsFormat === 'decimal'}
                className={oddsFormat === 'decimal' ? 'active' : ''}
                onClick={() => {
                  setOddsFormat('decimal')
                  setOddsOpen(false)
                }}
              >
                {t('footer.oddsDecimal')}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="site-footer__divider" />

      <div className="site-footer__legal">
        <div className="site-footer__brand">
          <div className="site-footer__brand-row">
            <a href="/" className="site-footer__logo" aria-label="betup">
              <span className="logo-bet">bet</span>
              <span className="logo-up">up</span>
            </a>
            <span className="site-footer__age">18+</span>
          </div>
          <p>{t('footer.ageWarning')}</p>
        </div>
        <div className="site-footer__license">
          <div className="site-footer__partner">
            <span className="site-footer__partner-mark" aria-hidden />
            <strong>GORDON MOODY</strong>
          </div>
          <p>{t('footer.license')}</p>
        </div>
      </div>
    </footer>
  )
}
