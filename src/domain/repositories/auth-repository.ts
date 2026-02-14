import type { User } from '@/domain/entities/user'

import type { Response } from '@/shared/types/response'

export interface AuthRepository {
  signInWithEmail(params: SignInParams): Promise<Response<User>>
  signUp(params: SignUpParams): Promise<Response<User>>
  signOut(): Promise<Response<void>>
  getSession(): Promise<Response<User | null>>
}

export type SignInParams = { email: string; password: string }
export type SignUpParams = { email: string; password: string }
