export const profilePaths = {
  home: '/profile',
  deposit: '/profile/deposit',
  withdraw: '/profile/withdraw',
  transfer: '/profile/transfer',
  transactions: '/profile/transactions',
  betHistory: '/profile/bet-history',
  affiliate: '/profile/affiliate',
  interest: '/profile/interest',
  redeem: '/profile/redeem',
  rebate: '/profile/rebate',
  personalInfo: '/profile/personal-info',
  kyc: '/profile/kyc',
  settings: '/profile/settings',
  selfExclusion: '/profile/self-exclusion',
  vip: '/profile/vip',
} as const

export type ProfilePathKey = keyof typeof profilePaths

export const financeMenus = [
  { id: 'deposit' as const, icon: 'wallet', to: profilePaths.deposit },
  { id: 'withdraw' as const, icon: 'bank-card', to: profilePaths.withdraw },
  { id: 'transfer' as const, icon: 'transfer', to: profilePaths.transfer },
] as const

export const recordMenus = [
  { id: 'transactions' as const, icon: 'task', to: profilePaths.transactions },
  { id: 'betHistory' as const, icon: 'ticket', to: profilePaths.betHistory },
] as const

export const promoMenus = [
  { id: 'affiliate' as const, icon: 'affiliate', to: profilePaths.affiliate },
  { id: 'interest' as const, icon: 'interest', to: profilePaths.interest },
  { id: 'redeem' as const, icon: 'redeem', to: profilePaths.redeem },
  { id: 'rebate' as const, icon: 'rebate', to: profilePaths.rebate },
] as const

export const serviceMenus = [
  { id: 'personalInfo' as const, icon: 'user', to: profilePaths.personalInfo },
  { id: 'kycInfo' as const, icon: 'shield', to: profilePaths.kyc },
  { id: 'setting' as const, icon: 'settings', to: profilePaths.settings },
  { id: 'selfExclusion' as const, icon: 'user', to: profilePaths.selfExclusion },
  { id: 'logOut' as const, icon: 'user', to: null },
] as const

export const mobilePrimary = [
  {
    id: 'transactions' as const,
    icon: 'task',
    titleKey: 'profile.transactions',
    descKey: 'profile.transactionsDesc',
    to: profilePaths.transactions,
  },
  {
    id: 'betHistory' as const,
    icon: 'ticket',
    titleKey: 'profile.betHistory',
    descKey: 'profile.betHistoryDesc',
    to: profilePaths.betHistory,
  },
  {
    id: 'affiliate' as const,
    icon: 'affiliate',
    titleKey: 'profile.affiliate',
    descKey: 'profile.affiliateDesc',
    to: profilePaths.affiliate,
  },
] as const

export const mobileSecondary = [
  { id: 'vipClub' as const, icon: 'vip', titleKey: 'profile.vipClub', to: profilePaths.vip },
  { id: 'rebate' as const, icon: 'rebate', titleKey: 'profile.rebate', to: profilePaths.rebate },
  { id: 'interest' as const, icon: 'interest', titleKey: 'profile.interest', to: profilePaths.interest },
  { id: 'redeem' as const, icon: 'redeem', titleKey: 'profile.redeem', to: profilePaths.redeem },
  { id: 'kyc' as const, icon: 'shield', titleKey: 'profile.kyc', to: profilePaths.kyc },
  { id: 'setting' as const, icon: 'settings', titleKey: 'profile.setting', to: profilePaths.settings },
] as const

export const PROFILE_USER = {
  username: 'anna22',
  vipLevel: 'VIP1',
  balance: '2853.00',
} as const
