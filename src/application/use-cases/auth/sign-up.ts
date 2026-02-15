import type { User } from '@/domain/entities/user'
import type {
  AuthRepository,
  SignUpParams
} from '@/domain/repositories/auth-repository'

import type { Response } from '@/shared/types/response'

export class SignUp {
  readonly repository: AuthRepository

  constructor(repository: AuthRepository) {
    this.repository = repository
  }

  async execute(params: SignUpParams): Promise<Response<User>> {
    return this.repository.signUp(params)
  }
}
