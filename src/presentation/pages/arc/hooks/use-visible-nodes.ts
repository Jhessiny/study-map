import { useMemo } from 'react'

import type { Node } from '@xyflow/react'

import { buildArticleNode, buildSubjectNode } from '../helpers/build-node'
import { LAYOUTS } from '../helpers/layout'
import type { SubjectTree } from '../types'

type VisibleNodesParams = {
  tree: SubjectTree
  visibleRange: [number, number]
}

export function useVisibleNodes({
  tree,
  visibleRange
}: VisibleNodesParams): Node[] {
  const [minLevel, maxLevel] = visibleRange

  return useMemo(() => {
    const nodes: Node[] = []
    const layout0 = LAYOUTS[0]

    // Header node positioned above the root-level children
    const childCount = tree.subjects.length
    const headerWidth =
      childCount * layout0.size + (childCount - 1) * layout0.gap

    nodes.push({
      id: 'arc-header',
      type: 'arcHeader',
      position: { x: 0, y: -layout0.padding * 12 },
      data: {
        title: tree.title,
        description: tree.subTitle,
        fontSize: layout0.fontSize,
        padding: layout0.padding
      },
      style: { width: headerWidth },
      draggable: false,
      connectable: false
    })

    function traverse(
      subjects: SubjectTree[],
      level: number,
      startX: number,
      parentY: number
    ) {
      if (level > maxLevel) return

      const layout = LAYOUTS[level]

      subjects.forEach((subject, index) => {
        const x = startX + index * (layout.size + layout.gap)
        const y = parentY

        if (level >= minLevel) {
          nodes.push(buildSubjectNode(subject, level, x, y))

          if (level > 0) {
            nodes.push(buildArticleNode(subject, level, x, y))
          }
        }

        if (subject.subjects?.length && level < maxLevel) {
          const childLayout = LAYOUTS[level + 1]
          const childY = y + layout.size + childLayout.padding * 3

          traverse(subject.subjects, level + 1, x, childY)
        }
      })
    }

    // Start traversal from root's children at level 0
    traverse(tree.subjects, 0, 0, 0)
    return nodes
  }, [tree, minLevel, maxLevel])
}
