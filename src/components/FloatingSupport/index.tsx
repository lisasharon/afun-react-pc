import { Icon } from '@/components/Icon'
import './index.css'

export function FloatingSupport() {
  return (
    <button type="button" className="floating-support" aria-label="在线客服">
      <Icon name="headset" size={26} />
    </button>
  )
}
