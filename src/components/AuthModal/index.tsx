import { useEffect, useState } from 'react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Icon'
import './index.css'

export type AuthMode = 'login' | 'register'

type AuthModalProps = {
  open: boolean
  mode: AuthMode
  onClose: () => void
  onSwitchMode: (mode: AuthMode) => void
}

function GoogleMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.7 7.2l6.3 5.3C37.3 38.3 44 33 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  )
}

export function AuthModal({ open, mode, onClose, onSwitchMode }: AuthModalProps) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const isLogin = mode === 'login'

  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [invite, setInvite] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (!open) return
    setAccount('')
    setPassword('')
    setConfirm('')
    setInvite('')
    setAgreed(false)
    setShowPassword(false)
    setShowConfirm(false)
  }, [open, mode])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const canSubmit = isLogin
    ? account.trim().length > 0 && password.length > 0
    : account.trim().length > 0 && password.length > 0 && confirm.length > 0 && agreed

  const handleSubmit = () => {
    if (!account.trim()) {
      message.warning(t('auth.emptyAccount'))
      return
    }
    if (!password) {
      message.warning(t('auth.emptyPassword'))
      return
    }
    if (!isLogin) {
      if (!confirm) {
        message.warning(t('auth.emptyConfirm'))
        return
      }
      if (password !== confirm) {
        message.warning(t('auth.passwordMismatch'))
        return
      }
      if (!agreed) {
        message.warning(t('auth.needAgree'))
        return
      }
    }
    message.success(isLogin ? t('auth.loginSuccess') : t('auth.registerSuccess'))
    onClose()
  }

  const comingSoon = () => message.info(t('auth.comingSoon'))

  return (
    <div className="auth-modal" role="presentation" onClick={onClose}>
      <div
        className="auth-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="auth-modal__header">
          <h2 id="auth-modal-title">
            {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
          </h2>
          <button
            type="button"
            className="auth-modal__close"
            aria-label={t('common.close')}
            onClick={onClose}
          >
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className="auth-modal__body">
          <input
            className="auth-modal__input"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder={t('auth.accountPlaceholder')}
            autoComplete="username"
          />

          <div className="auth-modal__field">
            <input
              className="auth-modal__input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.passwordPlaceholder')}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isLogin) handleSubmit()
              }}
            />
            <button
              type="button"
              className="auth-modal__eye"
              aria-label={
                showPassword ? t('auth.hidePassword') : t('auth.showPassword')
              }
              onClick={() => setShowPassword((v) => !v)}
            >
              <Icon name={showPassword ? 'eye' : 'eye-off'} size={18} />
            </button>
          </div>

          {isLogin ? (
            <button
              type="button"
              className="auth-modal__forgot"
              onClick={comingSoon}
            >
              {t('auth.forgotPassword')}
            </button>
          ) : (
            <>
              <div className="auth-modal__field">
                <input
                  className="auth-modal__input"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-modal__eye"
                  aria-label={
                    showConfirm ? t('auth.hidePassword') : t('auth.showPassword')
                  }
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  <Icon name={showConfirm ? 'eye' : 'eye-off'} size={18} />
                </button>
              </div>
              <input
                className="auth-modal__input"
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder={t('auth.invitePlaceholder')}
                autoComplete="off"
              />
              <label className="auth-modal__agree">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>
                  {t('auth.agreePrefix')}
                  <button type="button" onClick={comingSoon}>
                    {t('auth.terms')}
                  </button>
                  {t('auth.and')}
                  <button type="button" onClick={comingSoon}>
                    {t('auth.privacy')}
                  </button>
                </span>
              </label>
            </>
          )}

          <button
            type="button"
            className="auth-modal__submit"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {isLogin ? t('auth.submitLogin') : t('auth.submitRegister')}
          </button>

          <div className="auth-modal__links">
            {isLogin ? (
              <>
                <button type="button" onClick={() => onSwitchMode('register')}>
                  {t('auth.newUser')}{' '}
                  <em>{t('auth.createAccount')}</em>
                </button>
                <button type="button" onClick={comingSoon}>
                  {t('auth.unlock')}
                </button>
              </>
            ) : (
              <button type="button" onClick={() => onSwitchMode('login')}>
                {t('auth.hasAccount')} <em>{t('auth.goLogin')}</em>
              </button>
            )}
          </div>

          <div className="auth-modal__divider">
            <span>{t('auth.directLogin')}</span>
          </div>

          <button
            type="button"
            className="auth-modal__google"
            aria-label={t('auth.googleLogin')}
            onClick={comingSoon}
          >
            <GoogleMark />
          </button>
        </div>
      </div>
    </div>
  )
}
