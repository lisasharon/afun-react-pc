import { useTranslation } from 'react-i18next'
import './index.css'

export function Sports() {
  const { t } = useTranslation()

  return (
    <section className="sports-page">
      <h1>{t('nav.sports')}</h1>
      <p>{t('common.empty', { name: t('nav.sports') })}</p>
    </section>
  )
}
