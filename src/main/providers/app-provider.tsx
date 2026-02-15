import type { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from '@/main/providers/auth-provider'
import { SubjectProvider } from '@/main/providers/subject-provider'

const queryClient = new QueryClient()

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SubjectProvider>{children}</SubjectProvider>
    </AuthProvider>
  </QueryClientProvider>
)
