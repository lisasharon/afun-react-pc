import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhCN from './locales/zh-CN/index'
import en from './locales/en/index'

export const LANG_STORAGE_KEY = 'betup-lang'
export const SUPPORTED_LANGS = ['zh-CN', 'en'] as const
export type AppLang = (typeof SUPPORTED_LANGS)[number]

function getInitialLang(): AppLang {
  if (typeof window === 'undefined') return 'zh-CN'
  const saved = localStorage.getItem(LANG_STORAGE_KEY)
  if (saved === 'zh-CN' || saved === 'en') return saved
  return 'zh-CN'
}

void i18n.use(initReactI18next).init({
  resources: {
    'zh-CN': { translation: zhCN },
    en: { translation: en },
  },
  lng: getInitialLang(),
  fallbackLng: 'zh-CN',
  interpolation: {
    escapeValue: false,
  },
})

if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem(LANG_STORAGE_KEY, lng)
    document.documentElement.lang = lng === 'en' ? 'en' : 'zh-CN'
  })
  document.documentElement.lang = i18n.language === 'en' ? 'en' : 'zh-CN'
}

export default i18n
