import type { AuthRepository } from '@/domain/repositories/auth-repository'

import type { Response } from '@/shared/types/response'

export class SignOut {
  readonly repository: AuthRepository

  constructor(repository: AuthRepository) {
    this.repository = repository
  }

  async execute(): Promise<Response<void>> {
    return this.repository.signOut()
  }
}
