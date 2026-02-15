import type { Node, Edge } from '@xyflow/react'

import type { Subject } from '@/domain/entities/subject'

const BASE_WIDTH = 2200
const BASE_HEIGHT = 400
const SCALE_FACTOR = 10

export type SubjectNodeData = Subject & {
  nodeWidth: number
  nodeHeight: number
}

function layoutSubtree(
  subject: Subject,
  x: number,
  y: number,
  width: number,
  height: number,
  subjects: Subject[],
  nodes: Node[],
  edges: Edge[]
) {
  nodes.push({
    id: subject.id,
    type: 'subject',
    position: { x, y },
    style: { width, height },
    data: { ...subject, nodeWidth: width, nodeHeight: height }
  })

  if (subject.parentId) {
    edges.push({
      id: `${subject.parentId}-${subject.id}`,
      source: subject.parentId,
      target: subject.id,
      type: 'smoothstep'
    })
  }

  const children = subjects
    .filter((c) => c.parentId === subject.id)
    .sort((a, b) => a.order - b.order)

  if (children.length === 0) return

  const childWidth = width / SCALE_FACTOR
  const childHeight = height / SCALE_FACTOR
  const childGap = childWidth * 0.2
  const totalChildrenWidth =
    children.length * childWidth + (children.length - 1) * childGap
  const startX = x + (width - totalChildrenWidth) / 2
  const childY = y + height + height * 0.1

  children.forEach((child, i) => {
    const childX = startX + i * (childWidth + childGap)
    layoutSubtree(
      child,
      childX,
      childY,
      childWidth,
      childHeight,
      subjects,
      nodes,
      edges
    )
  })
}

export function buildTreeLayout(subjects: Subject[]): {
  nodes: Node[]
  edges: Edge[]
} {
  const nodes: Node[] = []
  const edges: Edge[] = []

  const roots = subjects
    .filter((c) => c.parentId === null)
    .sort((a, b) => a.order - b.order)

  const rootGap = BASE_WIDTH * 0.1
  let rootX = 0

  for (const root of roots) {
    layoutSubtree(
      root,
      rootX,
      0,
      BASE_WIDTH,
      BASE_HEIGHT,
      subjects,
      nodes,
      edges
    )
    rootX += BASE_WIDTH + rootGap
  }

  return { nodes, edges }
}
