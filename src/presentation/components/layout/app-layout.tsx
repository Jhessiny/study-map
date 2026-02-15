import { Outlet } from 'react-router-dom'

import { Footer } from '@/presentation/components/layout/footer'
import { Navbar } from '@/presentation/components/layout/navbar'

export function AppLayout() {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
