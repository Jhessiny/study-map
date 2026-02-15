import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppLayout } from '@/presentation/components/layout/app-layout'
import { ArcPage } from '@/presentation/pages/arc/arc-page'
import { LoginPage } from '@/presentation/pages/login-page'
import { OverviewPage } from '@/presentation/pages/overview/overview-page'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/content-tree', element: <ArcPage /> },
      { path: '/overview', element: <OverviewPage /> },
      { path: '*', element: <Navigate to='/login' /> }
    ]
  }
])
