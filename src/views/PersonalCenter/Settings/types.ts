export const SETTINGS_ITEMS = [
  { id: 'loginPassword', labelKey: 'profile.loginpassword' },
  { id: 'transactionPassword', labelKey: 'profile.transactionPassword' },
  { id: 'phoneNumber', labelKey: 'profile.phoneNumber' },
  { id: 'email', labelKey: 'profile.email' },
  { id: 'bankAccount', labelKey: 'profile.bankAccount' },
  { id: 'loginRecord', labelKey: 'profile.loginRecord' },
] as const

export type SettingsItemId = (typeof SETTINGS_ITEMS)[number]['id']
