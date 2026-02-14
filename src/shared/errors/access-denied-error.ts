import { DomainError } from '@/shared/errors/domain-error'

export class AccessDeniedError extends DomainError {
  constructor(message = 'Access denied') {
    super(message)
  }
}
