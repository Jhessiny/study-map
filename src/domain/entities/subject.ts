export type Subject = {
  id: string
  name: string
  description: string | null
  parentId: string | null
  level: number
  order: number
  metadata: SubjectMetadata
  createdAt: string
  updatedAt: string
}

export type SubjectMetadata = {
  notesCount: number
  questionsCount: number
  resourcesCount: number
  childrenCount: number
}
