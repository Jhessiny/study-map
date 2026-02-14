import type { AuthError } from '@supabase/supabase-js'

import { InvalidCredentialsError, UnexpectedError } from '@/shared/errors'
import type { DomainError } from '@/shared/errors'

export const mapAuthError = (err: AuthError): DomainError => {
  switch (err.status) {
    case 400:
    case 422:
      return new InvalidCredentialsError(err.message)
    default:
      return new UnexpectedError(err.message)
  }
}
