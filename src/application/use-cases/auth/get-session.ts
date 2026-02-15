import type { User } from '@/domain/entities/user'
import type { AuthRepository } from '@/domain/repositories/auth-repository'

import type { Response } from '@/shared/types/response'

export class GetSession {
  readonly repository: AuthRepository

  constructor(repository: AuthRepository) {
    this.repository = repository
  }

  async execute(): Promise<Response<User | null>> {
    return this.repository.getSession()
  }
}
