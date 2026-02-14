import type { PostgrestError } from '@supabase/supabase-js'

import {
  AccessDeniedError,
  NotFoundError,
  ValidationError,
  UnexpectedError
} from '@/shared/errors'
import type { DomainError } from '@/shared/errors'

export const mapPostgrestError = (err: PostgrestError): DomainError => {
  switch (err.code) {
    case 'PGRST116':
      return new NotFoundError(err.message)
    case '42501':
      return new AccessDeniedError(err.message)
    case '23505':
    case '23503':
    case '23514':
      return new ValidationError(err.message)
    default:
      return new UnexpectedError(err.message)
  }
}
