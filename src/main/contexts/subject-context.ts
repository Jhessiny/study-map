import { createContext } from 'react'

import type { GetSubjectTree } from '@/application/use-cases/subject'

export type SubjectUseCases = {
  getSubjectTree: GetSubjectTree
}

export const SubjectContext = createContext<SubjectUseCases | null>(null)
