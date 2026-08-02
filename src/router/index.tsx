import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { CasinoHome } from '@/pages/CasinoHome'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<CasinoHome />} />
        <Route path="casino" element={<CasinoHome />} />
        {/* 后续页面：sports / promotions / vip ... */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
