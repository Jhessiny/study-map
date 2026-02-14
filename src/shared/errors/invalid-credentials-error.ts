import { DomainError } from '@/shared/errors/domain-error'

export class InvalidCredentialsError extends DomainError {
  constructor(message = 'Invalid credentials') {
    super(message)
  }
}
