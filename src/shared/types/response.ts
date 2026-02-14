import type { DomainError } from '@/shared/errors'
import type { Either } from '@/shared/utils/either'

export type Response<T = unknown> = Either<DomainError, T>
