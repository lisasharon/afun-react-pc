import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { Browse } from '@/pages/Browse'
import { Home } from '@/pages/Home'
import {
  Affiliate,
  BetHistory,
  Deposit,
  Interest,
  Kyc,
  PersonalCenterLayout,
  PersonalInfo,
  ProfileHome,
  Rebate,
  Redeem,
  SelfExclusion,
  Settings,
  Transactions,
  Transfer,
  Vip,
  Withdraw,
} from '@/pages/PersonalCenter'
import { Promotion } from '@/pages/Promotion'
import { Sports } from '@/pages/Sports'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="casino" element={<Home />} />
        <Route path="sports" element={<Sports />} />
        <Route path="profile" element={<PersonalCenterLayout />}>
          <Route index element={<ProfileHome />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="bet-history" element={<BetHistory />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="affiliate" element={<Affiliate />} />
          <Route path="interest" element={<Interest />} />
          <Route path="redeem" element={<Redeem />} />
          <Route path="rebate" element={<Rebate />} />
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="kyc" element={<Kyc />} />
          <Route path="settings" element={<Settings />} />
          <Route path="self-exclusion" element={<SelfExclusion />} />
          <Route path="vip" element={<Vip />} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Route>
        <Route path="promotion" element={<Promotion />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
