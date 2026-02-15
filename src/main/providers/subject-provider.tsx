import type { ReactNode } from 'react'

import { GetSubjectTree } from '@/application/use-cases/subject'

import { makeSubjectRepository } from '@/infrastructure/factories/make-subject-repository'

import { SubjectContext } from '@/main/contexts/subject-context'

const repository = makeSubjectRepository()

const useCases = {
  getSubjectTree: new GetSubjectTree(repository)
}

export const SubjectProvider = ({ children }: { children: ReactNode }) => (
  <SubjectContext value={useCases}>{children}</SubjectContext>
)
