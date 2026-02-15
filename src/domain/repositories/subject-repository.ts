import type { Subject } from '@/domain/entities/subject'

import type { Response } from '@/shared/types/response'

export interface SubjectRepository {
  getTree(): Promise<Response<Subject[]>>
}
