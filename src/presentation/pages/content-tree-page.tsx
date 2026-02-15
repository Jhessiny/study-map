import { useCallback, useMemo } from 'react'

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type NodeMouseHandler
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { SubjectNode } from '@/presentation/components/features/subject/subject-node'
import { buildTreeLayout } from '@/presentation/components/features/subject/tree-layout'
import type { SubjectNodeData } from '@/presentation/components/features/subject/tree-layout'
import { useSubjectTree } from '@/presentation/hooks/use-subjects'

const nodeTypes = { subject: SubjectNode }

export function ContentTreePage() {
  const { data: subjects, isLoading, error } = useSubjectTree()

  const { nodes, edges } = useMemo(
    () => (subjects ? buildTreeLayout(subjects) : { nodes: [], edges: [] }),
    [subjects]
  )

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    const subject = node.data as SubjectNodeData
    console.log('Node clicked:', subject.id, subject.name)
  }, [])

  if (isLoading) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-muted-foreground'>Loading content tree...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-destructive'>Failed to load content tree.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col'>
      <div className='border-b bg-white px-6 py-4'>
        <h1 className='text-lg font-semibold'>Content Tree</h1>
        <p className='text-sm text-muted-foreground'>
          Visual map of all subjects and their relationships
        </p>
      </div>

      <div className='h-[calc(100vh-8rem)]'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  )
}
