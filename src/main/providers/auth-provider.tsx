import type { ReactNode } from 'react'

import {
  GetSession,
  SignIn,
  SignUp,
  SignOut
} from '@/application/use-cases/auth'

import { makeAuthRepository } from '@/infrastructure/factories/make-auth-repository'

import { AuthContext } from '@/main/contexts/auth-context'

const repository = makeAuthRepository()

const useCases = {
  getSession: new GetSession(repository),
  signIn: new SignIn(repository),
  signUp: new SignUp(repository),
  signOut: new SignOut(repository)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => (
  <AuthContext value={useCases}>{children}</AuthContext>
)
