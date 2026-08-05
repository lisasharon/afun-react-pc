import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { CasinoHome } from '@/pages/CasinoHome'
import { PersonalCenter } from '@/pages/PersonalCenter'
import { Promotion } from '@/pages/Promotion'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<CasinoHome />} />
        <Route path="casino" element={<CasinoHome />} />
        <Route path="profile" element={<PersonalCenter />} />
        <Route path="promotion" element={<Promotion />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
