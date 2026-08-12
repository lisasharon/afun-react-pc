import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs, { type Dayjs } from 'dayjs'
import { Icon } from '@/components/Icon'
import { AppDatePicker } from '@/components/AppDatePicker'
import { ProfileSubPage } from '../Home'

type RecordTab = 'deposit' | 'withdraw' | 'other'
type CurrencyTab = 'fiat' | 'crypto'

export function Transactions() {
  const { t } = useTranslation()
  const [recordTab, setRecordTab] = useState<RecordTab>('deposit')
  const [currencyTab, setCurrencyTab] = useState<CurrencyTab>('fiat')
  const [recordDate, setRecordDate] = useState<Dayjs>(() => dayjs('2026-08-05'))

  const emptyText =
    recordTab === 'withdraw'
      ? t('profile.emptyWithdraw')
      : recordTab === 'other'
        ? t('profile.emptyOther')
        : currencyTab === 'fiat'
          ? t('profile.emptyFiatDeposit')
          : t('profile.emptyCryptoDeposit')

  return (
    <ProfileSubPage title={t('profile.transactions')}>
      <section className="profile-panel">
        <div className="profile-panel-header">
          <div className="profile-main-tabs" role="tablist">
            {(['deposit', 'withdraw', 'other'] as RecordTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={recordTab === tab}
                className={`profile-main-tab ${recordTab === tab ? 'active' : ''}`}
                onClick={() => setRecordTab(tab)}
              >
                {t(`profile.${tab}`)}
              </button>
            ))}
          </div>
          <AppDatePicker
            className="profile-date-picker"
            value={recordDate}
            onChange={(date) => date && setRecordDate(date)}
            placeholder={t('common.selectDate')}
            aria-label={t('common.selectDate')}
          />
        </div>

        <div className="profile-panel-inner">
          {recordTab === 'deposit' ? (
            <div className="profile-inner-toolbar">
              <div className="profile-sub-tabs" role="tablist">
                {(['fiat', 'crypto'] as CurrencyTab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={currencyTab === tab}
                    className={`profile-sub-tab ${currencyTab === tab ? 'active' : ''}`}
                    onClick={() => setCurrencyTab(tab)}
                  >
                    {t(`profile.${tab}`)}
                  </button>
                ))}
              </div>
              <button type="button" className="profile-filter">
                {t('common.all')}
                <Icon name="chevron-down" size={14} />
              </button>
            </div>
          ) : (
            <div className="profile-inner-toolbar profile-inner-toolbar--end">
              <button type="button" className="profile-filter">
                {t('common.all')}
                <Icon name="chevron-down" size={14} />
              </button>
            </div>
          )}

          <div className="profile-empty">
            <div className="profile-empty-icon">
              <Icon name="chart" size={48} />
            </div>
            <p>{emptyText}</p>
          </div>
        </div>
      </section>
    </ProfileSubPage>
  )
}
