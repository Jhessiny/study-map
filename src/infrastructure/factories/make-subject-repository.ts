import type { SubjectRepository } from '@/domain/repositories/subject-repository'

import { MockSubjectRepository } from '@/infrastructure/repositories/mock-subject-repository'

export const makeSubjectRepository = (): SubjectRepository => {
  return new MockSubjectRepository()
}
