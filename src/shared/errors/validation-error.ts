import { DomainError } from '@/shared/errors/domain-error'

export class ValidationError extends DomainError {
  constructor(message = 'Validation failed') {
    super(message)
  }
}
