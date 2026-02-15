import { useContext } from 'react'

import { useQuery } from '@tanstack/react-query'

import { SubjectContext } from '@/main/contexts/subject-context'

import { queryAdapter } from '@/shared/utils/query-adapter'

import { subjectKeys } from '@/presentation/hooks/query-keys'

const useSubjectUseCases = () => {
  const context = useContext(SubjectContext)

  if (!context) {
    throw new Error('useSubjectUseCases must be used within a SubjectProvider')
  }

  return context
}

export const useSubjectTree = () => {
  const { getSubjectTree } = useSubjectUseCases()

  return useQuery({
    queryKey: subjectKeys.tree,
    queryFn: () => queryAdapter(getSubjectTree.execute())
  })
}
