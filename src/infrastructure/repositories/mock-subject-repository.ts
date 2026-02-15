import type { Subject } from '@/domain/entities/subject'
import type { SubjectRepository } from '@/domain/repositories/subject-repository'

import type { Response } from '@/shared/types/response'
import { success } from '@/shared/utils/either'

const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    description: 'The study of numbers, quantities, and shapes',
    parentId: null,
    level: 0,
    order: 0,
    metadata: {
      notesCount: 5,
      questionsCount: 10,
      resourcesCount: 3,
      childrenCount: 2
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Computer Science',
    description: 'The study of computation and information',
    parentId: null,
    level: 0,
    order: 1,
    metadata: {
      notesCount: 8,
      questionsCount: 15,
      resourcesCount: 5,
      childrenCount: 2
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Calculus',
    description: 'Branch of mathematics involving derivatives and integrals',
    parentId: '1',
    level: 1,
    order: 0,
    metadata: {
      notesCount: 3,
      questionsCount: 7,
      resourcesCount: 2,
      childrenCount: 2
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Linear Algebra',
    description: 'Study of linear equations and vector spaces',
    parentId: '1',
    level: 1,
    order: 1,
    metadata: {
      notesCount: 4,
      questionsCount: 6,
      resourcesCount: 2,
      childrenCount: 0
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Algorithms',
    description: 'Step-by-step procedures for calculations',
    parentId: '2',
    level: 1,
    order: 0,
    metadata: {
      notesCount: 6,
      questionsCount: 12,
      resourcesCount: 4,
      childrenCount: 2
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Data Structures',
    description: 'Ways to organize and store data',
    parentId: '2',
    level: 1,
    order: 1,
    metadata: {
      notesCount: 5,
      questionsCount: 8,
      resourcesCount: 3,
      childrenCount: 0
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '7',
    name: 'Derivatives',
    description: 'Rate of change of a function',
    parentId: '3',
    level: 2,
    order: 0,
    metadata: {
      notesCount: 2,
      questionsCount: 5,
      resourcesCount: 1,
      childrenCount: 1
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '8',
    name: 'Integrals',
    description: 'Accumulation of quantities',
    parentId: '3',
    level: 2,
    order: 1,
    metadata: {
      notesCount: 3,
      questionsCount: 4,
      resourcesCount: 2,
      childrenCount: 0
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '9',
    name: 'Sorting',
    description: 'Arranging elements in order',
    parentId: '5',
    level: 2,
    order: 0,
    metadata: {
      notesCount: 4,
      questionsCount: 6,
      resourcesCount: 2,
      childrenCount: 0
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '10',
    name: 'Graph Algorithms',
    description: 'Algorithms operating on graph structures',
    parentId: '5',
    level: 2,
    order: 1,
    metadata: {
      notesCount: 3,
      questionsCount: 5,
      resourcesCount: 2,
      childrenCount: 0
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '11',
    name: 'Chain Rule',
    description: 'Derivative of composed functions',
    parentId: '7',
    level: 3,
    order: 0,
    metadata: {
      notesCount: 1,
      questionsCount: 3,
      resourcesCount: 1,
      childrenCount: 1
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '12',
    name: 'Applications',
    description: 'Real-world applications of the chain rule',
    parentId: '11',
    level: 4,
    order: 0,
    metadata: {
      notesCount: 2,
      questionsCount: 2,
      resourcesCount: 1,
      childrenCount: 0
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  }
]

export class MockSubjectRepository implements SubjectRepository {
  async getTree(): Promise<Response<Subject[]>> {
    return success(mockSubjects)
  }
}
