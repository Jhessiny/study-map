import { DomainError } from '@/shared/errors/domain-error'

export class NotFoundError extends DomainError {
  constructor(message = 'Resource not found') {
    super(message)
  }
}
