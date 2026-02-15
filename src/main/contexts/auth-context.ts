import { createContext } from 'react'

import type {
  GetSession,
  SignIn,
  SignUp,
  SignOut
} from '@/application/use-cases/auth'

export type AuthUseCases = {
  getSession: GetSession
  signIn: SignIn
  signUp: SignUp
  signOut: SignOut
}

export const AuthContext = createContext<AuthUseCases | null>(null)
