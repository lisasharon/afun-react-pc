import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfigProvider, App as AntdApp, theme } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'
import type { AppLang } from '@/i18n'

type AntdProviderProps = {
  children: React.ReactNode
}

function resolveLang(language: string): AppLang {
  return language === 'en' ? 'en' : 'zh-CN'
}

export function AntdProvider({ children }: AntdProviderProps) {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState<AppLang>(() => resolveLang(i18n.language))

  useEffect(() => {
    const onLanguageChanged = (next: string) => {
      setLang(resolveLang(next))
    }
    i18n.on('languageChanged', onLanguageChanged)
    return () => i18n.off('languageChanged', onLanguageChanged)
  }, [i18n])

  useEffect(() => {
    dayjs.locale(lang === 'en' ? 'en' : 'zh-cn')
  }, [lang])

  return (
    <ConfigProvider
      locale={lang === 'en' ? enUS : zhCN}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#3dca4d',
          colorSuccess: '#3dca4d',
          borderRadius: 8,
          colorBgContainer: '#1a222c',
          colorBgElevated: '#161d24',
          colorBorder: '#243040',
          colorText: '#e8edf2',
          colorTextSecondary: '#8b97a8',
          colorTextPlaceholder: '#5c6b7a',
          controlHeight: 36,
          fontSize: 13,
        },
        components: {
          DatePicker: {
            cellHoverBg: 'rgba(61, 202, 77, 0.12)',
            cellActiveWithRangeBg: 'rgba(61, 202, 77, 0.18)',
            cellRangeBorderColor: '#3dca4d',
          },
        },
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  )
}
