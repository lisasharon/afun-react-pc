import type { ComponentType } from 'react'
import type { SettingsItemId } from './types'
import { LoginRecordPanel } from './forms/LoginRecordPanel'
import { PasswordForm } from './forms/PasswordForm'
import { TextForm } from './forms/TextForm'
import { VerifyForm } from './forms/VerifyForm'

function LoginPasswordPanel() {
  return (
    <PasswordForm
      currentLabelKey="profile.currentLoginPassword"
      currentPlaceholderKey="profile.oldPasswordPlaceholder"
      newLabelKey="profile.newPassword"
      newPlaceholderKey="profile.newPasswordPlaceholder"
    />
  )
}

function TransactionPasswordPanel() {
  return (
    <PasswordForm
      currentLabelKey="profile.currentTransactionPassword"
      currentPlaceholderKey="profile.oldPasswordPlaceholder"
      newLabelKey="profile.newTransactionPassword"
      newPlaceholderKey="profile.newPasswordPlaceholder"
    />
  )
}

function PhonePanel() {
  return (
    <VerifyForm
      labelKey="profile.phoneNumber"
      placeholderKey="profile.phonePlaceholder"
      emptyTipKey="profile.emptyPhone"
      inputType="tel"
    />
  )
}

function EmailPanel() {
  return (
    <VerifyForm
      labelKey="profile.email"
      placeholderKey="profile.emailPlaceholder"
      emptyTipKey="profile.emptyEmail"
      inputType="email"
    />
  )
}

function BankAccountPanel() {
  return (
    <TextForm
      labelKey="profile.bankAccount"
      placeholderKey="profile.bankPlaceholder"
      emptyTipKey="profile.emptyBank"
    />
  )
}

export const SETTINGS_PANELS: Record<SettingsItemId, ComponentType> = {
  loginPassword: LoginPasswordPanel,
  transactionPassword: TransactionPasswordPanel,
  phoneNumber: PhonePanel,
  email: EmailPanel,
  bankAccount: BankAccountPanel,
  loginRecord: LoginRecordPanel,
}
