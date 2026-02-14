import { DomainError } from '@/shared/errors/domain-error'

export class UnexpectedError extends DomainError {
  constructor(message = 'An unexpected error occurred') {
    super(message)
  }
}
