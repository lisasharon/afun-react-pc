import { useTranslation } from 'react-i18next'
import { banners } from '@/mock/games'
import './index.css'

export function BannerCarousel() {
  const { t } = useTranslation()

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
