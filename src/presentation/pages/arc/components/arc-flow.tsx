import { useMemo } from 'react'

import { ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useVisibleNodes } from '../hooks/use-visible-nodes'
import { useZoomLevel } from '../hooks/use-zoom-level'
import { mockArcTree } from '../mock-arc-data'

import { ArcHeaderNode } from './arc-header-node'
import { SubjectArticleNode } from './subject-article-node'
import { SubjectCardNode } from './subject-card-node'
import { TopicLabelNode } from './topic-label-node'

const nodeTypes = {
  subjectCard: SubjectCardNode,
  subjectArticle: SubjectArticleNode,
  topicLabel: TopicLabelNode,
  arcHeader: ArcHeaderNode
}

const EMPTY_EDGES: [] = []

function ArcFlowInner() {
  const { visibleRange, onViewportChange } = useZoomLevel()
  const nodes = useVisibleNodes({ tree: mockArcTree, visibleRange })

  // Only fit the header + level-0 cards on initial load
  const fitViewOptions = useMemo(() => {
    const level0Ids = ['arc-header', ...mockArcTree.subjects.map((s) => s.id)]
    return { nodes: level0Ids.map((id) => ({ id })), padding: 0.4 }
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={EMPTY_EDGES}
      nodeTypes={nodeTypes}
      onViewportChange={onViewportChange}
      fitView
      fitViewOptions={fitViewOptions}
      minZoom={0.0001}
      maxZoom={100}
      nodesDraggable={false}
      nodesConnectable={false}
      panOnDrag
      zoomOnScroll
      zoomOnPinch
      proOptions={{ hideAttribution: true }}
    />
  )
}

export function ArcFlow() {
  return (
    <ReactFlowProvider>
      <ArcFlowInner />
    </ReactFlowProvider>
  )
}
