import { banners } from '@/mock/games'
import './index.css'

export function BannerCarousel() {
  return (
    <section className="banners" aria-label="促销横幅">
      {banners.map((banner, index) => (
        <article
          key={banner.id}
          className={`banner banner-${index + 1}`}
          style={{ background: banner.gradient }}
        >
          <div className="banner-content">
            {banner.tag && <span className="banner-tag">{banner.tag}</span>}
            <h2>{banner.title}</h2>
            <p>{banner.subtitle}</p>
            <button type="button" className="banner-cta">
              {banner.cta}
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
