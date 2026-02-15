import type { Subject } from '@/domain/entities/subject'
import type { SubjectRepository } from '@/domain/repositories/subject-repository'

import type { Response } from '@/shared/types/response'

export class GetSubjectTree {
  readonly repository: SubjectRepository

  constructor(repository: SubjectRepository) {
    this.repository = repository
  }

  async execute(): Promise<Response<Subject[]>> {
    return this.repository.getTree()
  }
}
