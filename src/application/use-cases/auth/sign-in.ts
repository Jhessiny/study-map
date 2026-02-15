import type { User } from '@/domain/entities/user'
import type {
  AuthRepository,
  SignInParams
} from '@/domain/repositories/auth-repository'

import type { Response } from '@/shared/types/response'

export class SignIn {
  readonly repository: AuthRepository

  constructor(repository: AuthRepository) {
    this.repository = repository
  }

  async execute(params: SignInParams): Promise<Response<User>> {
    return this.repository.signInWithEmail(params)
  }
}
