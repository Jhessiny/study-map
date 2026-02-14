import type { AuthRepository } from '@/domain/repositories/auth-repository'

import { SupabaseAuthRepository } from '@/infrastructure/repositories/supabase-auth-repository'

export const makeAuthRepository = (): AuthRepository => {
  return new SupabaseAuthRepository()
}
