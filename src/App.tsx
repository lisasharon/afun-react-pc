import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '@/router'
import { AntdProvider } from '@/providers/AntdProvider'

export default function App() {
  return (
    <AntdProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AntdProvider>
  )
}
