import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppLayout } from '@/presentation/components/layout/app-layout'
import { ContentTreePage } from '@/presentation/pages/content-tree-page'
import { LoginPage } from '@/presentation/pages/login-page'
import { OverviewPage } from '@/presentation/pages/overview/overview-page'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/content-tree', element: <ContentTreePage /> },
      { path: '/overview', element: <OverviewPage /> },
      { path: '*', element: <Navigate to='/login' /> }
    ]
  }
])
