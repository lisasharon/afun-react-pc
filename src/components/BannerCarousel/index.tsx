import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { banners } from '@/mock/games'
import { useIsMobile } from '@/hooks'
import './index.css'

export function BannerCarousel() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!isMobile) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % banners.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [isMobile])

  if (isMobile) {
    const banner = banners[active]
    return (
      <section className="banners banners--mobile" aria-label={t('home.banners')}>
        <article
          className="banner banner--hero"
          style={{ background: banner.gradient }}
        >
          <div className="banner-content">
            {banner.tag && <span className="banner-tag">{banner.tag}</span>}
            <h2>{banner.title}</h2>
            <p>{t(`banners.${banner.id}.subtitle`)}</p>
            <button type="button" className="banner-cta">
              {t(`banners.${banner.id}.cta`)}
            </button>
          </div>
          <div className={`banner-art art-${banner.id}`} aria-hidden>
            {banner.id === '1' && <div className="jet" />}
            {banner.id === '2' && <div className="trophy" />}
            {banner.id === '3' && <div className="slot-machine" />}
          </div>
        </article>
        <div className="banner-dots" role="tablist" aria-label={t('home.banners')}>
          {banners.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`banner-dot ${active === index ? 'active' : ''}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="banners" aria-label={t('home.banners')}>
      {banners.map((banner, index) => (
        <article
          key={banner.id}
          className={`banner banner-${index + 1}`}
          style={{ background: banner.gradient }}
        >
          <div className="banner-content">
            {banner.tag && <span className="banner-tag">{banner.tag}</span>}
            <h2>{banner.title}</h2>
            <p>{t(`banners.${banner.id}.subtitle`)}</p>
            <button type="button" className="banner-cta">
              {t(`banners.${banner.id}.cta`)}
            </button>
          </div>
          <div className={`banner-art art-${banner.id}`} aria-hidden>
            {banner.id === '1' && <div className="jet" />}
            {banner.id === '2' && <div className="trophy" />}
            {banner.id === '3' && <div className="slot-machine" />}
          </div>
        </article>
      ))}
    </section>
  )
}
