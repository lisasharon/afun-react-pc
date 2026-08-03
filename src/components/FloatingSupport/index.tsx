import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import './index.css'

export function FloatingSupport() {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      className="floating-support"
      aria-label={t('common.onlineSupport')}
    >
      <Icon name="headset" size={26} />
    </button>
  )
}
