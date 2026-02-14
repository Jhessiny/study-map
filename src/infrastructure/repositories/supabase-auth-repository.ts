import type { User as SupabaseUser } from '@supabase/supabase-js'

import type { User } from '@/domain/entities/user'
import type {
  AuthRepository,
  SignInParams,
  SignUpParams
} from '@/domain/repositories/auth-repository'

import { mapAuthError } from '@/infrastructure/api/map-auth-error'
import { supabase } from '@/infrastructure/api/supabase-client'

import type { Response } from '@/shared/types/response'
import { error, success } from '@/shared/utils/either'

function mapSupabaseUser(user: SupabaseUser): User {
  return {
    id: user.id,
    email: user.email ?? '',
    displayName:
      user.user_metadata?.display_name ?? user.email?.split('@')[0] ?? '',
    avatarUrl: user.user_metadata?.avatar_url ?? null,
    role: user.user_metadata?.role ?? 'student',
    createdAt: user.created_at
  }
}

export class SupabaseAuthRepository implements AuthRepository {
  async signInWithEmail(params: SignInParams): Promise<Response<User>> {
    const { data, error: err } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password
    })

    if (err) return error(mapAuthError(err))
    return success(mapSupabaseUser(data.user))
  }

  async signUp(params: SignUpParams): Promise<Response<User>> {
    const { data, error: err } = await supabase.auth.signUp({
      email: params.email,
      password: params.password
    })

    if (err) return error(mapAuthError(err))
    if (!data.user)
      return error(
        mapAuthError({
          status: 400,
          message: 'Sign up failed',
          name: 'AuthError'
        } as never)
      )
    return success(mapSupabaseUser(data.user))
  }

  async signOut(): Promise<Response<void>> {
    const { error: err } = await supabase.auth.signOut()

    if (err) return error(mapAuthError(err))
    return success(undefined)
  }

  async getSession(): Promise<Response<User | null>> {
    const { data, error: err } = await supabase.auth.getUser()

    if (err) return success(null)
    return success(mapSupabaseUser(data.user))
  }
}
